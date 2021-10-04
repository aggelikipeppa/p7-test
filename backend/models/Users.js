module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true // email doit etre unique
    },
    profile_picture: {
      type: DataTypes.STRING,
      allowNull: true,
      default:null
    },
  });

//On associe les users avec les likes et les Posts
  Users.associate = (models) => {
    Users.hasMany(models.Likes, {
      onDelete: "cascade",
    });

    // Users.hasMany(models.Posts, {
    //   onDelete: "cascade",
    // });
  };

  return Users;
};