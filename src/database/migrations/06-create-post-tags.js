/* eslint-disable no-undef */
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('PostTags', {});

        await queryInterface.addColumn('PostTags', 'postId', {
            type: Sequelize.BIGINT,
            references: {
                model: 'Posts',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });

        await queryInterface.addColumn('PostTags', 'tagId', {
            type: Sequelize.BIGINT,
            references: {
                model: 'Tags',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable('PostTags');
    },
};
