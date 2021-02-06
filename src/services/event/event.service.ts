import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { AddEventDto } from "src/dtos/event/add.event.dto";
import { Event } from "src/entities/event.entity";
import { Repository } from "typeorm";

@Injectable()
export class EventService extends TypeOrmCrudService<Event>{
    constructor(
        @InjectRepository(Event)
        private readonly eventService: Repository<Event>

    ) {
        super(eventService)
    }

    async createEvent(data: AddEventDto): Promise<Event> {
        let newEvent: Event = new Event();

        newEvent.eventTypeId = data.eventTypeId;
        newEvent.name = data.name;
        newEvent.description = data.description;
        newEvent.start = data.start;
        newEvent.end = data.end;
        newEvent.location = data.location;
        newEvent.status = data.status;


        let savedEvent = await this.eventService.save(newEvent)

        return this.eventService.findOne(savedEvent.eventId);

    }


}