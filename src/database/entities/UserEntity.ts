import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/BaseEntity';
import { PostEntity } from './PostEntity';

@Entity({
    name: 'users',
})
export class UserEntity extends BaseEntity {
    @Column()
    fullName: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({
        nullable: true,
    })
    avatar: string;

    @Column({
        nullable: true,
    })
    email: string;

    @Column({
        nullable: true,
    })
    address: string;

    @Column({
        nullable: true,
    })
    phoneNumber: string;

    @Column({ nullable: true })
    imgId: string;

    @ManyToOne(() => PostEntity, (post: PostEntity) => post.user, {
        onDelete: 'CASCADE',
    })
    posts: PostEntity[];
}
