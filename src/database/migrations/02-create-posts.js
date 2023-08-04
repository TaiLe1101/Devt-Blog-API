/* eslint-disable no-undef */
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Posts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },

            title: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            desc: {
                type: Sequelize.STRING,
                defaultValue: null,
            },
            imgId: {
                type: Sequelize.STRING,
                defaultValue: null,
            },
            content: {
                type: Sequelize.TEXT('long'),
            },
            thumbnail: {
                type: Sequelize.STRING,
                defaultValue: null,
            },

            createdAt: {
                type: Sequelize.DATE,
                defaultValue: new Date(),
            },
            updatedAt: {
                type: Sequelize.DATE,
                defaultValue: new Date(),
            },
        });

        await queryInterface.addColumn('Posts', 'userId', {
            type: Sequelize.BIGINT,
            references: {
                model: 'Users',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable('Posts');
    },
};
