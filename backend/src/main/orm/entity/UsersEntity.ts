import {
    Entity,
    Column,
    PrimaryGeneratedColumn
} from "typeorm";

@Entity({ name: 'general_users' })
export default class UsersEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
    uuid: string;

    @Column({ name: 'user_email', unique: true })
    email: string;

    @Column({ name: 'user_password' })
    password: string;

    @Column({ name: 'is_active', default: false })
    isActive: boolean;
  
    @Column({ name: 'available_profiles_count', default: 1 })
    availableProfilesCount: number;
}