import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Administrator } from "./administrator.entity";
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
    start: string;

    @Column({ type: "datetime" })
    end: string;

    @Column({ type: "varchar", length: 64 })
    location: string;

    @Column({
        type: "enum",
        enum: ["Scheduled", "In progress", "Closed"],
        default: () => "'Scheduled'",
    })
    status: "Scheduled" | "In progress" | "Closed";

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

    @ManyToMany(type => Administrator, administrator => administrator.events)
    @JoinTable({
        name: "administrator_events",
        joinColumn: { name: "event_id", referencedColumnName: "eventId" },
        inverseJoinColumn: { name: "administrator_id", referencedColumnName: "administratorId" }
    })
    administrators: Administrator[];

}
