module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postText: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      /*imgUrl:{
        type: DataTypes.STRING,
        allowNull: true,
    },*/
    });
  
    //Pour faire la liaison entre les posts et les comments
    Posts.associate = (models) => {
      Posts.hasMany(models.Comments, {
          //Si je supprime un post les comments aussi seront supprimer
        onDelete: "cascade",
      });
    
    //Pour faire la liaison entre les posts et les Likes
    Posts.hasMany(models.Likes, {
        onDelete: "cascade",
      });
    };
    return Posts;
    };
  