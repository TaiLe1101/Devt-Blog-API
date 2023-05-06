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
                allowNull: true,
                type: Sequelize.STRING,
            },
            content: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            thumbnail: {
                allowNull: true,
                type: Sequelize.STRING,
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
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
