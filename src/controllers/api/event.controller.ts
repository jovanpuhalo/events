import { Body, Controller, Delete, Param, Post, UseGuards } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { AddEventDto } from "src/dtos/event/add.event.dto";
import { SubscribedDto } from "src/dtos/user-event/SubscribedDto";
import { Event } from "src/entities/event.entity";
import { AllowToRoles } from "src/misc/alow.to.roles.desriptor";
import { ApiResponse } from "src/misc/apiResponse";
import { RoleCheckGuard } from "src/misc/role.check.guard";
import { EventService } from "src/services/event/event.service";
import { UserEventService } from "src/services/UserEvent/User.Event.service";

@Controller('api/event')
@Crud({
    model: {
        type: Event
    },
    params: {
        id: {
            field: 'eventId',
            type: 'number',
            primary: true

        }
    },
    query: {
        join: {
            users: {
                eager: true,
                exclude: ['passwordHash']
            },
            administrators: {
                eager: true,
                exclude: ['passwordHash']
            },
            eventType: {
                eager: true
            }
        }
    },
    routes: {
        only: [
            'getOneBase',
            'getManyBase',
            "updateOneBase",
            "deleteOneBase"
        ],
        getOneBase: {
            decorators: [
                UseGuards(RoleCheckGuard),
                AllowToRoles('administrator', 'user')
            ]

        },
        getManyBase: {
            decorators: [
                UseGuards(RoleCheckGuard),
                AllowToRoles('administrator', 'user')
            ]
        },
        updateOneBase: {
            decorators: [
                UseGuards(RoleCheckGuard),
                AllowToRoles('administrator')
            ]
        },
        deleteOneBase: {
            decorators: [
                UseGuards(RoleCheckGuard),
                AllowToRoles('administrator')
            ]
        }
    }

})


export class EventController {
    constructor(
        public service: EventService,
        public userEventService: UserEventService
    ) { }

    @Post('/createEvent')
    @UseGuards(RoleCheckGuard)
    @AllowToRoles('administrator')
    createEvent(@Body() data: AddEventDto) {
        return this.service.createEvent(data);
    }

    @Post('/subscribe')
    subscribeEvent(@Body() data: SubscribedDto) {
        return this.userEventService.subscribe(data);
    }

    @Delete('unsubscribe/:userId/:eventId')
    async unsubscribe(
        @Param('userId') userId: number,
        @Param('eventId') eventId: number) {

        const eventUser = await this.userEventService.findOne({
            userId: userId,
            eventId: eventId
        });

        if (!eventUser) {
            return new ApiResponse('error', -4004, 'Subscrubed event not found')
        }

        return await this.userEventService.deleteById(eventUser.userEventId);
    }

}