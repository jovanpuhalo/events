import { Body, Controller, Post } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { AddEventDto } from "src/dtos/event/add.event.dto";
import { Event } from "src/entities/event.entity";
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
                eager: true
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
    }
})


export class EventController {
    constructor(
        public service: EventService
    ) { }

    @Post('/createEvent')
    createEvent(@Body() data: AddEventDto) {
        return this.service.createEvent(data);
    }

}