import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("user_event")
export class UserEvent {
    @PrimaryGeneratedColumn({ type: "int", name: "user_event_id", unsigned: true })
    userEventId: number;

    @Column({ type: "int", name: "event_id", unsigned: true })
    eventId: number;

    @Column({ type: "int", name: "user_id", unsigned: true })
    userId: number;



}
