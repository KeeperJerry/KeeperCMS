import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    PrimaryGeneratedColumn
} from "typeorm";

import UsersEntity from "./UsersEntity";

@Entity({ name: 'minecraft_players' })
export default class MCPlayersEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'mc_uuid' })
    id: string;

    @ManyToOne(() => UsersEntity, user => user.uuid)
    @JoinColumn({ name: 'user_id' })
    user: UsersEntity;

    @Column({ name: 'mc_nickname' })
    nickname: string;

    @Column({ name: 'mc_selected' })
    selected: boolean;

    @Column({ name: 'mc_skin_type' })
    typeSkin: boolean;

    @Column({ name: 'mc_skin_hash', nullable: true })
    hashSkin: string;

    @Column({ name: 'mc_cloak_hash', nullable: true })
    hashCloak: string;
}