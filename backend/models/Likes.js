module.exports = (sequelize, DataTypes) => {
    const Likes = sequelize.define("Likes",{
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    });
  
    return Likes;
};