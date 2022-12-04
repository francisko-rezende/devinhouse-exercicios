import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 50 })
  user: string;

  @Column({ length: 50 })
  email: string;

  @Column()
  photoUrl: string;
}
