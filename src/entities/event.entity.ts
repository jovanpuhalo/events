import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EventType } from "./event-type.entity";
import { User } from "./user.entity";

@Index("fk_event_event_type_id", ["eventTypeId"], {})
@Entity("event")
export class Event {
    @PrimaryGeneratedColumn({ type: "int", name: "event_id", unsigned: true })
    eventId: number;

    @Column({ type: "int", name: "event_type_id", unsigned: true })
    eventTypeId: number;

    @Column({ type: "varchar", length: 45 })
    name: string;

    @Column({ type: "text" })
    description: string;

    @Column({ type: "datetime" })
    start: Date;

    @Column({ type: "datetime" })
    end: Date;

    @Column({ type: "varchar", length: 64 })
    location: string;

    @Column({ type: "varchar", length: 64 })
    status: string;

    @ManyToOne(() => EventType, (eventType) => eventType.events, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    })
    @JoinColumn([{ name: "event_type_id", referencedColumnName: "eventTypeId" }])
    eventType: EventType;

    @ManyToMany(type => User, user => user.events)
    @JoinTable({
        name: "user_events",
        joinColumn: { name: "event_id", referencedColumnName: "eventId" },
        inverseJoinColumn: { name: "user_id", referencedColumnName: "userId" }
    })
    users: User[];

}
