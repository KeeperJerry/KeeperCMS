import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    PrimaryGeneratedColumn
} from "typeorm";

import MCPlayersEntity from "./MCPlayersEntity";

@Entity({ name: "minecraft_sessions" })
export default class MCSessionsEntity {
    @PrimaryGeneratedColumn("uuid", { name: "access_token" })
    accessToken: string;

    @Column({ name: "client_token", nullable: false, unique: true })
    clientToken: string;

    @ManyToOne(() => MCPlayersEntity, player => player.id)
    @JoinColumn({ name: "player_uuid" })
    playerUuid: MCPlayersEntity;

    @Column({ name: "server_id", nullable: true })
    serverId: string;

    @Column({ name: "ip_addres", nullable: false })
    ipClient: string;

    @Column({ name: "token_create", nullable: false })
    createdAt: Date;

    @Column({ name: "token_ttl", nullable: false })
    endedAt: Date;
}