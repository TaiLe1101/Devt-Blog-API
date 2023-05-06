/* eslint-disable no-undef */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */

        await queryInterface.bulkInsert(
            'Users',
            [
                {
                    username: 'taile110103',
                    password: '123456',
                    fullName: 'Lê Trần Tấn Tài',

                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    username: 'nguyen080905',
                    password: '123456',
                    fullName: 'Lê Trần Thanh Nguyên',

                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('Users', null, {});
    },
};
