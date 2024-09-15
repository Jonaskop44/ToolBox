import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUserDataFromTokenDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('token/data/:token')
  async getUserDataFromToken(@Param() dto: GetUserDataFromTokenDto) {
    return this.userService.getUserDataFromToken(dto.token);
  }
}
