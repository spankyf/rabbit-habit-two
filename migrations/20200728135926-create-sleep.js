"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Sleep", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.DATEONLY,
      },
      bedtime: {
        type: Sequelize.DATE,
        //allowNull: false,
      },
      sleeptime: {
        type: Sequelize.DATE,
        //allowNull: false,
      },
      waketime: {
        type: Sequelize.DATE,
        //allowNull: false,
      },
      dreams_from_three: {
        type: Sequelize.INTEGER,
        //allowNull: false,
        validate: {
          min: 0,
          max: 3,
        },
      },
      interruptions: {
        type: Sequelize.INTEGER,
      },
      pee: {
        type: Sequelize.INTEGER,
      },
      rating_from_five: {
        type: Sequelize.INTEGER,
        //allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
      // duration: {
      //   type: Sequelize.VIRTUAL,
      //   get() {
      //     const lostTime = this.pee * 10 + this.interruptions * 20;
      //     const duration = this.waketime - this.sleeptime;
      //     return (duration - lostTime) / 60000;
      //   },
      // },

      interruptions: {
        type: Sequelize.INTEGER,
      },
      pee: {
        type: Sequelize.INTEGER,
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
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Sleep");
  },
};
