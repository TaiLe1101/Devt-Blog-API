import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/BaseEntity';
import { UserEntity } from './UserEntity';

@Entity('posts')
export class PostEntity extends BaseEntity {
    @Column()
    title: string;

    @Column({
        nullable: true,
    })
    desc: string;

    @Column({
        nullable: true,
    })
    imgId: string;

    @Column({
        nullable: true,
    })
    content: string;

    @Column({
        nullable: true,
    })
    thumbnail: string;

    @ManyToOne(() => UserEntity, (user: UserEntity) => user.posts)
    user: UserEntity;
}
