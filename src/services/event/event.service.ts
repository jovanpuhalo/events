import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { AddEventDto } from "src/dtos/event/add.event.dto";
import { AdministratorEvent } from "src/entities/administrator_event.entity";
import { Event } from "src/entities/event.entity";
import { UserEvent } from "src/entities/user_event.entity";
import { Repository } from "typeorm";

@Injectable()
export class EventService extends TypeOrmCrudService<Event>{
    constructor(
        @InjectRepository(Event)
        private readonly eventService: Repository<Event>,
        @InjectRepository(UserEvent)
        private readonly userEventService: Repository<UserEvent>,
        @InjectRepository(AdministratorEvent)
        private readonly administratorEventService: Repository<AdministratorEvent>

    ) {
        super(eventService)
    }

    async deleteEvent(id: number) {
        // da bismo obrisali event moramo prvo da obrisemo sva subscribovanja ovog eventa pa onda sam event,
        //jer smo u bazi stavili restrict

        // prvo briseno sve dogadjaje sa ovim id u tabeli user_event tj ovaj dogadjaj koji su subscribeovali useri

        const userEvents: UserEvent[] = await this.userEventService.find({
            where: {
                eventId: id
            }
        })

        for (let event of userEvents) {
            await this.userEventService.delete(event.userEventId);
        }
        //zatim briseno sve dogadjaje sa ovim id u tabeli administrator_event tj ovaj dogadjaj koji su subscribeovali useri

        const administratorEvents: AdministratorEvent[] = await this.administratorEventService.find({
            where: {
                eventId: id
            }
        })

        for (let event of administratorEvents) {
            await this.administratorEventService.delete(event.administratorEventId);
        }


        // sada mozemo da pristupimo brisanju samog eventa
        const event: Event = await this.eventService.findOne(id)

        await this.eventService.delete(event.eventId);



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