import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { EventType } from "src/entities/event-type.entity";
import { Event } from "src/entities/event.entity";
import { AllowToRoles } from "src/misc/alow.to.roles.desriptor";
import { ApiResponse } from "src/misc/apiResponse";
import { RoleCheckGuard } from "src/misc/role.check.guard";
import { EventTypeService } from "src/services/event-type/event.type.service";


@Controller('api/eventType/')
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
                eager: true
            }
        }
    },
    routes: {
        only: [
            // 'getOneBase',
            'getManyBase',
            // "createOneBase",
            "deleteOneBase",
            "updateOneBase"
        ],
        // getOneBase: {
        //     decorators: [
        //         UseGuards(RoleCheckGuard),
        //         AllowToRoles('administrator', 'user')
        //     ]
        // },
        getManyBase: {
            decorators: [
                // UseGuards(RoleCheckGuard),
                // AllowToRoles('administrator', 'user')
            ]
        },
        // createOneBase: {
        //     decorators: [
        //         UseGuards(RoleCheckGuard),
        //         AllowToRoles('administrator')
        //     ]
        // },
        // deleteOneBase: {
        //     decorators: [
        //         UseGuards(RoleCheckGuard),
        //         AllowToRoles('administrator')
        //     ]
        // },
        updateOneBase: {
            decorators: [
                UseGuards(RoleCheckGuard),
                AllowToRoles('administrator')
            ]
        },
    }
})


export class EventTypeController {

    constructor(
        private service: EventTypeService
    ) { }


    // @Get()
    // getAll(): Promise<EventType[]> {
    //     return this.eventTypeService.getAll();
    // }

    @Post('add')
    @UseGuards(RoleCheckGuard)
    @AllowToRoles('administrator')
    createEvent(@Body() data: { name: string }): Promise<EventType | ApiResponse> {


        return this.service.createEventType(data);
    }

    @Delete(':eventTypeId')
    @UseGuards(RoleCheckGuard)
    @AllowToRoles('administrator')
    deleteEvent(
        @Param('eventTypeId') eventTypeId: number,) {
        return this.service.deleteEventType(eventTypeId);
    }

    @Get(':eventTypeId')

    getEvents(
        @Param('eventTypeId') eventTypeId: number): Promise<EventType> {
        return this.service.getEvents(eventTypeId);
    }

}