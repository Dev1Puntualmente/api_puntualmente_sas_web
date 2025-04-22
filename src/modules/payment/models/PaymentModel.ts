import { Expose } from "class-transformer";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('payments')
export default class PaymentModel {
    
    @Expose()
    @PrimaryGeneratedColumn()
    id: number;
    
    @Expose()
    @Column({ type: "varchar", length: 255 })
    name: string;
    
    @Expose()
    @Column()
    email: string;

    @Expose()
    @Column()
    phone: string;

    @Expose()
    @Column()
    documentNumber: string;

    @Expose()
    @Column({ type: "decimal" })
    amount: number;

    @Expose()
    @Column()
    paymentReference: string;

    @Column({ type: "boolean", default: false })
    hasDeleted: boolean;
    
    @Column({ type: "boolean", nullable: false})
    terms: boolean;

    @Expose()
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Expose()
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;


    
    constructor(
        id: number, 
        name: string, 
        email: string, 
        phone: string, 
        documentNumber: string, 
        amount: number, 
        paymentReference: string, 
        createdAt: Date = new Date(),
        hasDeleted: boolean = false
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.documentNumber = documentNumber;
        this.amount = amount;
        this.paymentReference = paymentReference;
        this.createdAt = createdAt;
        this.hasDeleted = hasDeleted;
    }
}