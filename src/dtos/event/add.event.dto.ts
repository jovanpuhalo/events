import * as Validator from "class-validator"

export class AddEventDto {
    @Validator.IsNotEmpty()
    eventTypeId: number;
    @Validator.IsNotEmpty()
    name: string;
    @Validator.IsNotEmpty()
    description: string;
    @Validator.IsNotEmpty()
    start: string;
    @Validator.IsNotEmpty()
    end: string;
    @Validator.IsNotEmpty()
    location: string;
    status?: "Scheduled" | "In progress" | "Closed"


}