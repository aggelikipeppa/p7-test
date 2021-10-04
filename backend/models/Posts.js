module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts", {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      picture:{
        type: DataTypes.STRING,
        allowNull: true,
      },
    });
  
    //Pour faire la liaison entre les posts et les comments
    Posts.associate = (models) => {
      //Pour faire la liaison entre les posts et les Users
      Posts.belongsTo(models.Users,{
        onDelete:"cascade",
        foreignKey:"user_id",
        as:"author"
      }) ;
      Posts.hasMany(models.Comments, {
        onDelete: "cascade",  //Si je supprime un post les comments aussi seront supprimer
        as:"comments"
      });
      // //Pour faire la liaison entre les posts et les Likes
      Posts.hasMany(models.Likes, {
          onDelete: "cascade",
          as:"likes"
      });
  };

  return Posts;
};
  