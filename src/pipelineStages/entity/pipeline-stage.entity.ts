import { Lead } from "src/lead/entity/lead.entity";
import { User } from "src/user/entity/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";


@Entity("pipelineStages")
export class PipelineStage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ default: true })
    isDefault: boolean;

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: false })
    isTemplate: boolean;

    @Column({ type: 'text', nullable: true })
    templateCategory: string;

    @Column({ default: false })
    isPrivate: boolean;

    @ManyToOne(() => User, { eager: true, nullable: false })
    createdBy: User;

    @OneToOne(() => Lead, lead => lead.pipelineStage)
    lead: Lead;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
