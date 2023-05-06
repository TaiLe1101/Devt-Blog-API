/* eslint-disable no-undef */
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('CategoryPosts', {});

        await queryInterface.addColumn('CategoryPosts', 'categoryId', {
            type: Sequelize.BIGINT,
            references: {
                model: 'Categories',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });

        await queryInterface.addColumn('CategoryPosts', 'postId', {
            type: Sequelize.BIGINT,
            references: {
                model: 'Posts',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable('CategoryPosts');
    },
};
