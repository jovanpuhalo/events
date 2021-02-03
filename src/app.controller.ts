import { Controller, Get } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { Administrator } from 'src/entities/administrator';
import { AdministratorService } from 'src/services/administrator/administrator.service';


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly administratorService: AdministratorService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  // @Get()
  // getWorld(): string {
  //   return this.appService.getWorld();
  // }

  // @Get('api/administrator')
  // getAll(): Promise<Administrator[]> {
  //   return this.administratorService.getAll();
  // }
}
