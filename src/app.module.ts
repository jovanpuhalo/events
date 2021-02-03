import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataBaseConfiguration } from 'config/database';
import { AppController } from './controllers/app.controller';
import { AppService } from './app.service';
import { Administrator } from './entities/administrator';
import { AdministratorService } from './services/administrator/administrator.service';
import { AdministratorControler } from './controllers/api/administrator.controller';

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
    AdministratorControler
  ],
  providers: [
    AdministratorService

  ],
})
export class AppModule { }
