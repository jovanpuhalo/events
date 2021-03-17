import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { EventTypeService } from './services/event-type/event.type.service';
import { EventTypeController } from './controllers/api/event.type.controlerr';
import { EventController } from './controllers/api/event.controller';
import { EventService } from './services/event/event.service';
import { AuthController } from './controllers/api/auth.controller';
import { AuthMiddleware } from './middleware/auth.middleware';
import { UserService } from './services/user/user.service';
import { UserController } from './controllers/api/user.controller';
import { UserEventService } from './services/UserEvent/User.Event.service';
import { AdministratorEvent } from './entities/administrator_event.entity';
import { AdministratorEventService } from './services/AdministratorEvent/AdministratorEvent.service';

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
        AdministratorEvent,
        EventType,
        Event,
        UserEvent,
        User,
        UserToken
      ]
    }),
    TypeOrmModule.forFeature([
      Administrator,
      AdministratorEvent,
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
    AdministratorController,
    EventTypeController,
    EventController,
    AuthController,
    UserController
  ],
  providers: [
    AppService,
    AdministratorService,
    EventTypeService,
    EventService,
    UserService,
    UserEventService,
    AdministratorEventService

  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('auth/*', 'api/eventType')
      .forRoutes('api/*')
  }


}
