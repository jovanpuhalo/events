import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { AdministratorEvent } from "src/entities/administrator_event.entity";
import { EventType } from "src/entities/event-type.entity";
import { Event } from "src/entities/event.entity";
import { UserEvent } from "src/entities/user_event.entity";
import { Repository } from "typeorm";

@Injectable()
export class EventTypeService extends TypeOrmCrudService<EventType>{


    constructor(
        @InjectRepository(EventType)
        private readonly eventType: Repository<EventType>,
        @InjectRepository(Event)
        private readonly eventService: Repository<Event>,
        @InjectRepository(UserEvent)
        private readonly userEventService: Repository<UserEvent>,
        @InjectRepository(AdministratorEvent)
        private readonly administratorEventService: Repository<AdministratorEvent>

    ) {
        super(eventType);
    }

    // getAll(): Promise<EventType[]> {
    //     return this.eventTypeService.find();
    // }

    async createEventType(data: { name: string }): Promise<EventType> {
        let eventType: EventType = new EventType();

        eventType.name = data.name;
        let savedEventType = await this.eventType.save(eventType)

        return this.eventType.findOne(savedEventType.eventTypeId);

    }
    async getEvents(id: number): Promise<EventType> {
        const event = await this.eventType.findOne(id, {
            relations: [
                "events"
            ]
        });


        return this.eventType.findOne(id, {
            relations: [
                "events"
            ]
        });



    }

    async deleteEventType(eventTypeId: number) {
        // da bismo obrisali event moramo prvo da obrisemo sva subscribovanja ovog svih eventa ovog typa ,
        //jer smo u bazi stavili restrict

        // prvo brisemo sva subskrajbovanja svih eventa sa ovim typom eventa u tabeli user_event tj ovaj dogadjaj koji su subscribovali useri
        const events: Event[] = await this.eventService.find({
            where: {
                eventTypeId: eventTypeId
            }
        })

        for (let event of events) {
            const userEvents: UserEvent[] = await this.userEventService.find({
                where: {
                    eventId: event.eventId
                }
            });

            for (let userEvent of userEvents) {
                await this.userEventService.delete(userEvent.userEventId);
            }


        }


        //     //zatim briseno sve dogadjaje sa ovim id u tabeli administrator_event tj ovaj dogadjaj koji su subscribeovali administratori

        for (let event of events) {
            const administratorEvents: AdministratorEvent[] = await this.administratorEventService.find({
                where: {
                    eventId: event.eventId
                }
            });

            for (let administratorEvent of administratorEvents) {
                await this.administratorEventService.delete(administratorEvent.administratorEventId);
            }


        }

        // sada brisemo sve evente

        for (let event of events) {
            await this.eventService.delete(event.eventId);
        }

        // // i na kraju pristupamo brisanju samog eventType

        await this.eventType.delete(eventTypeId);
    }
}
