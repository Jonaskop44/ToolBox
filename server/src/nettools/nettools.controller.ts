import { Controller } from '@nestjs/common';
import { NettoolsService } from './nettools.service';

@Controller('nettools')
export class NettoolsController {
  constructor(private readonly nettoolsService: NettoolsService) {}
}
