import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("administrator_event")
export class AdministratorEvent {
    @PrimaryGeneratedColumn({ type: "int", name: "administrator_event_id", unsigned: true })
    administratorEventId: number;

    @Column({ type: "int", name: "event_id", unsigned: true })
    eventId: number;

    @Column({ type: "int", name: "administrator_id", unsigned: true })
    administratorId: number;



}
