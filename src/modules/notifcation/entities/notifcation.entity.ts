import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class notifcation {
  @PrimaryGeneratedColumn()
  id: number;

}
