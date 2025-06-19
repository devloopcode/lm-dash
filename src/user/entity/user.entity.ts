import { Activity } from "src/activities/entity/activity.entity";
import { Lead } from "src/lead/entity/lead.entity";
import { PipelineStage } from "src/pipelineStages/entity/pipeline-stage.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";


@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, type: "text" })
  username!: string;

  @Column({ type: "text", select: false })
  password!: string;

  @Column({ unique: true, type: "text", nullable: true })
  email: string;

  @Column({ type: "text" })
  name!: string;

  @Column({ nullable: true, type: "text" })
  position!: string;

  @Column({ name: "avatar_url", nullable: true, type: "text" })
  avatarUrl!: string;

  @OneToMany(() => Lead, (lead) => lead.assignedTo)
  leads!: Lead[];

  @OneToMany(() => PipelineStage, stage => stage.createdBy)
  createdStages: PipelineStage[];

  @OneToMany(() => Activity, (activity) => activity.lead)
  activities: Activity[];

  @Column({ nullable: true, type: 'text' })
  refreshToken: string | null;
}
