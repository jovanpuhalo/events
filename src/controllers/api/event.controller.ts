import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { AddEventDto } from "src/dtos/event/add.event.dto";
import { Event } from "src/entities/event.entity";
import { AllowToRoles } from "src/misc/alow.to.roles.desriptor";
import { RoleCheckGuard } from "src/misc/role.check.guard";
import { EventService } from "src/services/event/event.service";

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
        public service: EventService
    ) { }

    @Post('/createEvent')
    @UseGuards(RoleCheckGuard)
    @AllowToRoles('administrator')
    createEvent(@Body() data: AddEventDto) {
        return this.service.createEvent(data);
    }

}