import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ValueTransformer,
  OneToOne,
  OneToMany,
} from "typeorm";
import { User } from "src/user/entity/user.entity";
import { LeadFinancingStatus, LeadPriority, LeadSector, LeadStatus } from "src/enums";
import { PipelineStage } from "src/pipelineStages/entity/pipeline-stage.entity";
import { Pipeline } from "src/pipelines/entity/pipeline.entity";
import { Activity } from "src/activities/entity/activity.entity";


@Entity("leads")
export class Lead {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: true })
  fullName: string;

  @Column({ type: "text" })
  email: string;

  @Column({ type: "text" })
  phone: string;

  @Column({ type: "text", nullable: true })
  stage: string;

  @Column({ nullable: true, type: "float", default: 0 })
  score: number;

  @Column({
    type: "enum",
    enum: LeadSector,
    default: LeadSector.COMMERCIAL_RENT,
  })
  sector: string;


  @Column({
    type: "enum",
    enum: LeadStatus,
    default: LeadStatus.ACTIVE,
  })
  status: string;


  @Column({ type: "text", nullable: true })
  propertyType: string;


  @Column({ type: "text", nullable: true })
  requirement: string;

  @Column({
    type: "decimal",
    precision: 15,
    scale: 2,
    default: () => "0",
    transformer: {
      to: (value: number) => value,
      from: (value: string | null): number | null =>
        value === null ? null : parseFloat(value),
    },
    nullable: true,
  })
  budget: number;


  // @Column({ type: "text", nullable: true })
  @Column({
    type: "enum",
    enum: LeadFinancingStatus,
    default: LeadFinancingStatus.CASH_BUYER,
  })
  financingStatus: string;

  @Column({ type: "text", nullable: true })
  financing: string;

  @Column({ type: "text" })
  source: string;

  @Column({ type: "text", nullable: true })
  note: string;

  // @Column({ nullable: true, type: "decimal" })
  // pipelineId: number;


  @Column({ type: "timestamptz", nullable: true })
  lastActivity: Date;

  @Column({ type: "timestamptz", nullable: true })
  lastContacted: Date;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt: Date;

  @Column({
    type: "enum",
    enum: LeadPriority,
    default: LeadPriority.MEDIUM,
  })
  priority: string;

  @Column({ nullable: true, type: "float", default: 0 })
  aiScore: number;

  @Column({ nullable: true, type: "float", default: 0 })
  engagementScore: number;

  @Column({ nullable: true, type: "float", default: 0 })
  behaviorScore: number;

  @Column({ nullable: true, type: "float", default: 0 })
  demographicScore: number;

  @Column({ type: "timestamptz", nullable: true })
  lastScoredAt: Date;

  @Column({ type: "text", nullable: true })
  scoringInsights: string;

  @ManyToOne(() => User, (user) => user.leads, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "assigned_to" })
  assignedTo: User;

  @ManyToOne(() => PipelineStage, {
    cascade: true,
  })
  @JoinColumn()
  pipelineStage: PipelineStage;

  @ManyToOne(() => Pipeline, { cascade: true, })
  @JoinColumn()
  pipeline: Pipeline;

  @OneToMany(() => Activity, (activity) => activity.lead)
  @JoinColumn({ name: "activity" })
  activities: Activity[];
}




