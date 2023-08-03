/* eslint-disable no-undef */
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },

            username: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: true,
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            fullName: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            avatar: {
                type: Sequelize.STRING,
                defaultValue: null,
            },
            email: {
                type: Sequelize.STRING,
                defaultValue: null,
            },
            address: {
                type: Sequelize.STRING,
                defaultValue: null,
            },
            phoneNumber: {
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
    },
    async down(queryInterface) {
        await queryInterface.dropTable('Users');
    },
};
