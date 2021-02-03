import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { Administrator } from './entities/administrator';
import { AdministratorService } from './services/administrator/administrator.service';
import { AdministratorController } from './controllers/api/administrator.controller';
import { AppService } from './app.service';
import { DataBaseConfiguration } from './config/database.configuration';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DataBaseConfiguration.hostname,
      port: 3306,
      username: DataBaseConfiguration.username,
      password: DataBaseConfiguration.password,
      database: DataBaseConfiguration.database,
      entities: [
        Administrator
      ]
    }),
    TypeOrmModule.forFeature([
      Administrator

    ])

  ],
  controllers: [
    AppController,
    AdministratorController
  ],
  providers: [
    AppService,
    AdministratorService
  ],
})
export class AppModule { }
