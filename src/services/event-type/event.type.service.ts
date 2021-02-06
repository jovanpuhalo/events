import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { EventType } from "src/entities/event-type.entity";
import { Repository } from "typeorm";

@Injectable()
export class EventTypeService extends TypeOrmCrudService<EventType>{


    constructor(
        @InjectRepository(EventType)
        private readonly eventType: Repository<EventType>
    ) {
        super(eventType);
    }

    // getAll(): Promise<EventType[]> {
    //     return this.eventTypeService.find();
    // }


}