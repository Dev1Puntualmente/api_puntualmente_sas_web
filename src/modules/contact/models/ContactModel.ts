import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity('contacts')
export default class ContactModel {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    subject: string;

    @Column({ type: 'varchar', length: 255 })
    message: string;

    @Column({ type: "boolean", nullable: false})
    terms: boolean;

    @CreateDateColumn( { type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' },)
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column({ type: "boolean", default: false })
    hasDeleted: boolean

    constructor(
        id: number,
        name: string,
        email: string,
        subject: string,
        message: string,
        createdAt: Date,
        updatedAt: Date
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.subject = subject;
        this.message = message;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}