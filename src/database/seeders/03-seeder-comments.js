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
            'Comments',
            [
                {
                    content: 'bài này ý nói gì ???',
                    userId: 1,
                    postId: 1,

                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    content: 'Không hiểu luôn ???',
                    userId: 2,
                    postId: 1,

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
        await queryInterface.bulkDelete('Comments', null, {});
    },
};
