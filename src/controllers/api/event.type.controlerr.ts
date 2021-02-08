import { Controller, Get, UseGuards } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { EventType } from "src/entities/event-type.entity";
import { AllowToRoles } from "src/misc/alow.to.roles.desriptor";
import { RoleCheckGuard } from "src/misc/role.check.guard";
import { EventTypeService } from "src/services/event-type/event.type.service";

@Crud({
    model: {
        type: EventType
    },
    params: {
        id: {
            field: 'eventTypeId',
            type: 'number',
            primary: true
        }
    },
    query: {
        join: {
            events: {
                eager: false
            }
        }
    },
    routes: {
        only: [
            'getOneBase',
            'getManyBase',
            "createOneBase",
            "deleteOneBase",
            "updateOneBase"
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
        createOneBase: {
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
        },
        updateOneBase: {
            decorators: [
                UseGuards(RoleCheckGuard),
                AllowToRoles('administrator')
            ]
        },
    }
})


@Controller('api/eventType')
export class EventTypeController {

    constructor(
        private service: EventTypeService
    ) { }


    // @Get()
    // getAll(): Promise<EventType[]> {
    //     return this.eventTypeService.getAll();
    // }

}