import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUserDataFromTokenDto } from './dto/user.dto';
import { JwtGuard } from 'src/guard/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('token/data/:token')
  async getUserDataFromToken(@Param() dto: GetUserDataFromTokenDto) {
    return this.userService.getUserDataFromToken(dto.token);
  }
}
