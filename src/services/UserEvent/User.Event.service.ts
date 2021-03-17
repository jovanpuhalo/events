import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { UserSubscribedDto } from "src/dtos/user-event/UserSubscribedDto";
import { UserEvent } from "src/entities/user_event.entity";
import { ApiResponse } from "src/misc/apiResponse";
import { Repository } from "typeorm";

@Injectable()
export class UserEventService extends TypeOrmCrudService<UserEvent>{
    constructor(
        @InjectRepository(UserEvent)
        private readonly userEvent: Repository<UserEvent>,
        @InjectRepository(UserEvent)
        private readonly userEventService: Repository<UserEvent>
    ) {
        super(userEvent);
    }

    async deleteById(id: number) {
        return await this.userEvent.delete(id)
    }

    async subscribe(data: UserSubscribedDto) {
        let newUserEvent: UserEvent = new UserEvent();
        newUserEvent.userId = data.userId;
        newUserEvent.eventId = data.eventId;

        let savedUserEvent = await this.userEventService.save(newUserEvent)

        return this.userEventService.findOne(savedUserEvent.userEventId)

    }

    getUserEventsById(id: number): Promise<UserEvent[] | ApiResponse> {
        return new Promise(async (resolve) => {
            let userEvent = await this.userEvent.find({
                where: {
                    userId: id
                }
            })

            if (userEvent == undefined) {
                resolve(new ApiResponse("error", -2002, "Can't find user with that id"))
            }
            resolve(userEvent);
        })

    }
}