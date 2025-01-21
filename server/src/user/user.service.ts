import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, ResetPasswordDto } from './dto/user.dto';
import { hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { TokenType } from '@prisma/client';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (user)
      throw new ConflictException('There is already a user with this email');

    const newUser = await this.prisma.user.create({
      data: {
        ...dto,
        password: await hash(dto.password, 12),
      },
    });

    const { password, ...result } = newUser;

    const token = await this.createVerificationToken(
      newUser,
      TokenType.ACTIVATE,
    );
    await this.mailService.sendUserConfirmation(newUser, token.token);

    return result;
  }

  async findUserByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async findUserById(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async getUserDataFromToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      const userEmail = decoded.email;

      const user = await this.findUserByEmail(userEmail);

      if (!user) throw new ConflictException('User not found');

      const { password, ...result } = user;

      return result;
    } catch (error) {
      throw new ConflictException('Invalid token');
    }
  }

  async activateUser(token: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        verificationToken: {
          some: {
            AND: [
              {
                activatedAt: null,
              },
              {
                type: TokenType.ACTIVATE,
              },
              {
                createdAt: {
                  gt: new Date(Date.now() - 15 * 60 * 1000),
                },
              },
              {
                token: token,
              },
            ],
          },
        },
      },
    });

    if (!user) {
      this.prisma.verificationToken.delete({
        where: {
          token: token,
        },
      });
      throw new ConflictException('The token is invalid or expired');
    }

    //Activate User
    const newUser = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        activated: true,
      },
    });

    //Mark the token as activated
    await this.prisma.verificationToken.update({
      where: {
        token: token,
      },
      data: {
        activatedAt: new Date(),
      },
    });

    const { password, ...result } = newUser;

    return result;
  }

  async checkPasswordRestToken(token: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        verificationToken: {
          some: {
            AND: [
              {
                activatedAt: null,
              },
              {
                type: TokenType.RESET_PASSWORD,
              },
              {
                createdAt: {
                  gt: new Date(Date.now() - 15 * 60 * 1000),
                },
              },
              {
                token: token,
              },
            ],
          },
        },
      },
    });

    if (!user) {
      this.prisma.verificationToken.delete({
        where: {
          token: token,
        },
      });
      throw new ConflictException('The token is invalid or expired');
    }

    return true;
  }

  async resendActivationEmail(email: string) {
    const user = await this.findUserByEmail(email);

    if (!user) throw new ConflictException('User not found');

    if (user.activated)
      throw new ConflictException('User is already activated');

    const token = await this.createVerificationToken(user, TokenType.ACTIVATE);
    await this.mailService.sendUserConfirmation(user, token.token);

    return;
  }

  async sendPasswordResetEmail(email: string) {
    const user = await this.findUserByEmail(email);

    if (!user) throw new ConflictException('User not found');

    const token = await this.createVerificationToken(
      user,
      TokenType.RESET_PASSWORD,
    );
    await this.mailService.sendPasswordReset(user, token.token);

    return;
  }

  async resetPassword(dto: ResetPasswordDto) {
    const user = await this.findUserByEmail(dto.email);

    if (!user) throw new ConflictException('User not found');

    const token = await this.prisma.verificationToken.findFirst({
      where: {
        token: dto.token,
        userId: user.id,
        activatedAt: null,
        createdAt: {
          gt: new Date(Date.now() - 15 * 60 * 1000),
        },
      },
    });

    if (!token) {
      this.prisma.verificationToken.delete({
        where: {
          token: dto.token,
        },
      });
      throw new ConflictException('The token is invalid or expired');
    }

    const newUser = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: await hash(dto.password, 12),
      },
    });

    await this.prisma.verificationToken.update({
      where: {
        token: dto.token,
      },
      data: {
        activatedAt: new Date(),
      },
    });

    const { password, ...result } = newUser;

    return result;
  }

  async createVerificationToken(user: User, tokenType: TokenType) {
    return this.prisma.verificationToken.create({
      data: {
        token: Math.floor(100000 + Math.random() * 900000).toString(),
        userId: user.id,
        type: tokenType,
      },
    });
  }
}
