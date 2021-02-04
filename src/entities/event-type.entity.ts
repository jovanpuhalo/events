import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "./event.entity";

@Entity("event_type")
export class EventType {
    @PrimaryGeneratedColumn({ type: "int", name: "event_type_id", unsigned: true })
    eventTypeId: number;

    @Column({ type: "varchar", length: 45 })
    name: string;

    @OneToMany(() => Event, (event) => event.eventType)
    events: Event[];
}
