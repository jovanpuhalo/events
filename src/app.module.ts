import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './controllers/app.controller';
import { Administrator } from './entities/administrator.entity';
import { AdministratorService } from './services/administrator/administrator.service';
import { AdministratorController } from './controllers/api/administrator.controller';
import { AppService } from './app.service';
import { DataBaseConfiguration } from './config/database.configuration';
import { AdministratorToken } from './entities/administrator-token.entity';
import { EventType } from './entities/event-type.entity';
import { Event } from './entities/event.entity';
import { UserEvent } from './entities/user_event.entity';
import { User } from './entities/user.entity';
import { UserToken } from './entities/user-token.entity';

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
        Administrator,
        AdministratorToken,
        EventType,
        Event,
        UserEvent,
        User,
        UserToken
      ]
    }),
    TypeOrmModule.forFeature([
      Administrator,
      Administrator,
      AdministratorToken,
      EventType,
      Event,
      UserEvent,
      User,
      UserToken

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
