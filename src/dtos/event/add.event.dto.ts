export class AddEventDto {

    eventTypeId: number;
    name: string;
    description: string;
    start: string;
    end: string;
    location: string;
    status?: "Scheduled" | "In progress" | "Closed"


}