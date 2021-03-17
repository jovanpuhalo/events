import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { AdminSubscribedDto } from "src/dtos/administrator-event/AdminSubscribedDto";
import { AdministratorEvent } from "src/entities/administrator_event.entity";
import { ApiResponse } from "src/misc/apiResponse";
import { Repository } from "typeorm";

@Injectable()
export class AdministratorEventService extends TypeOrmCrudService<AdministratorEvent>{
    constructor(
        @InjectRepository(AdministratorEvent)
        private readonly administratorEvent: Repository<AdministratorEvent>,
        // @InjectRepository(AdministratorEvent)
        // private readonly administratorEventService: Repository<AdministratorEvent>
    ) {
        super(administratorEvent);
    }

    async deleteById(id: number) {

        return await this.administratorEvent.delete(id)
    }

    async subscribe(data: AdminSubscribedDto) {


        let newAdministratorEvent: AdministratorEvent = new AdministratorEvent();
        newAdministratorEvent.administratorId = data.administratorId;
        newAdministratorEvent.eventId = data.eventId;

        let savedAdministratorEvent = await this.administratorEvent.save(newAdministratorEvent)

        return this.administratorEvent.findOne(savedAdministratorEvent.administratorEventId)

    }

    getAdministratorEventsById(id: number): Promise<AdministratorEvent[] | ApiResponse> {
        return new Promise(async (resolve) => {
            let administratorEvent = await this.administratorEvent.find({
                where: {
                    administratorId: id
                }
            })

            if (administratorEvent == undefined) {
                resolve(new ApiResponse("error", -2002, "Can't find administrator with that id"))
            }
            resolve(administratorEvent);
        })

    }
}