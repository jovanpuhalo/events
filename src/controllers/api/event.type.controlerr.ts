import { Controller, Get } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { EventType } from "src/entities/event-type.entity";
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