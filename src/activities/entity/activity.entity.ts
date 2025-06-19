import { Lead } from 'src/lead/entity/lead.entity';
import { User } from 'src/user/entity/user.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';


@Entity('activities')
export class Activity {
    @PrimaryGeneratedColumn()
    id: number;

    //   @Column()
    //   leadId: number;

    //   @Column()
    //   userId: number;

    @Column({ type: 'varchar' })
    type: string;

    @Column({ type: 'text' })
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Lead, (lead) => lead.activities, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'leadId' })
    lead: Lead;

    @ManyToOne(() => User, (user) => user.activities, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'userId' })
    user: User;
}
