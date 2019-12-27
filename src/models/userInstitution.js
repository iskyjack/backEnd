const userInstitution = (sequelize, DataTypes) => {
    const Userinstitution = sequelize.define("userinstitution", {
      user_id: {
        type: DataTypes.INTEGER,
        unique: false,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      companyname: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      address: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      image: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
        validate: {
          notEmpty: false,
        }
      },
      document: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
        validate: {
          notEmpty: false,
        }
      },
      video: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
        validate: {
          notEmpty: false,
        }
      }
    });
    Userinstitution.associate = models => {
        Userinstitution.belongsTo(models.User);
      };
    return Userinstitution;
  };
  export default userInstitution;
  