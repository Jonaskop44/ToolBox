import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { LoginDto, VerifyTokenDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { RefreshJwtGuard } from 'src/guard/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async registerUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Post('login')
  async loginUser(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refreshToken')
  async refreshToken(@Request() request) {
    return this.authService.refreshToken(request.user);
  }

  @Post('verify')
  async verifyUser(@Body() dto: VerifyTokenDto) {
    return this.authService.verifyToken(dto.token);
  }
}
