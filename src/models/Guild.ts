import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity()
export default class Guild {
    @PrimaryColumn({ type: 'numeric', unique: true })
    id: number

    @Column('varchar')
    name: string

    @Column({ type: 'varchar', default: '$' })
    prefix: string

    @Column({ type: 'integer', default: 1 })
    prefixLength: number

    @Column({ type: 'simple-array', array: true, default: '' })
    channels_command: []

    @Column({ type: 'simple-array', array: true, default: '' })
    channels_chat: []

    @Column({ type: 'simple-array', array: true, default: '' })
    prefix_redirect: []

    @Column('numeric')
    memberCount: number

    @Column('varchar')
    region: string

    @Column('varchar')
    ownerID: string

    @Column('boolean')
    deleted: boolean

    @Column('varchar')
    joined: number
}