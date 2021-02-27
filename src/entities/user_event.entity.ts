import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "src/entities/event.entity";
import { User } from "./user.entity";


@Index("uq_user_event_event_id_user_id", ["eventId", "userId"], {
    unique: true,
})
@Index("fk_user_event_event_id", ["eventId"], {})
@Index("fk_user_event_user_id", ["userId"], {})
@Entity("user_events")
export class UserEvent {
    @PrimaryGeneratedColumn({ type: "int", name: "user_event_id", unsigned: true })
    userEventId: number;

    @Column({ type: "int", name: "event_id", unsigned: true })
    eventId: number;

    @Column({ type: "int", name: "user_id", unsigned: true })
    userId: number;






    // @ManyToOne(() => Event, (event) => event.userEvents, {
    //     onDelete: "NO ACTION",
    //     onUpdate: "CASCADE",
    // })
    // @JoinColumn([{ name: "event_id", referencedColumnName: "eventId" }])
    // event: Event;




    @ManyToOne(() => User, (user) => user.userEvents, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    })
    @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
    user: User;





}
