import {hashPassword,hashCompare} from "../../helper/crypt";

const user = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    fname: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    lname: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    mobileno: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });
  User.associate = models => {
    User.hasMany(models.userInstitution, { onDelete: "CASCADE" });
  };
  User.beforeCreate(async user => {
    user.dataValues.password = await hashPassword(user.dataValues.password);
  });
  User.findByLogin = async login => {
    let user = await User.findOne({
      where: { email: login }
    });
    if (!user) {
      user = await User.findOne({
        where: { email: login }
      });
    }
    return user;
  };
  User.prototype.validatePassword = async function(password) {
    let value = await hashCompare( password,this.password);
    return value;
  };
  return User;
};

export default user;
