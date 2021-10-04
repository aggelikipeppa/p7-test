const express = require('express');
const router = express.Router();

const { Posts, Likes,Comments,Users } = require("../models");

const { validateToken } = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");

// recuperer tous les posts
router.get("/", validateToken, async (req, res) => {
  const listOfPosts = await Posts.findAll({ 
    attributes:['id','content','picture','createdAt'],
    include: [
      {
        model: Users,
        as:'author',
        attributes: ['id','username','profile_picture']
      },
      {
          model: Comments,
          as: 'comments',
          attributes: ['id','content',"user_id"],
          include:[
            {
              model: Users,
              as:'author',
              attributes: ['id','username','profile_picture']
            }
          ]
      },
      {
          model: Likes,
          as: 'likes',
          attributes: ['id','user_id','post_id']
      },

    ],
    order:[
      ['createdAt','DESC']
    ],

  });  //function qui go through the tables and generate the sql
  
  res.json({ posts: listOfPosts});
});

// recherche d'un post
router.get('/byId/:id', async (req, res) => {
   const id = req.params.id 
   const post = await Posts.findByPk(id,{
    include: [
      {
        model: Users,
        as:'author',
        attributes: ['id','username','profile_picture']
      },
      {
          model: Comments,
          as: 'comments',
          attributes: ['id','content',"user_id"],
          include:[
            {
              model: Users,
              as:'author',
              attributes: ['id','username','profile_picture']
            }
          ]
      },
      {
          model: Likes,
          as: 'likes',
          attributes: ['id','user_id','post_id']
      },

    ] 
   })  //(findByPk)=Pour dire a sequelize qu'on veut select un item specific, Pk=Primary key qu'on le trouve dans MySQL Table qu'on a créé
   res.json(post);
});  

// recherche des posts d'un utilisateur
router.get('/byuserId/:id', async (req, res) => {
  const id = req.params.id 
  const listOfPosts = await Posts.findAll({ 
    where: {user_id: id },
    include: [
      {
        model: Users,
        as:'author',
        attributes: ['id','username','profile_picture']
      },
      {
          model: Comments,
          as: 'comments',
          attributes: ['id','content',"user_id"],
          include:[
            {
              model: Users,
              as:'author',
              attributes: ['id','username','profile_picture']
            }
          ]
      },
      {
          model: Likes,
          as: 'likes',
          attributes: ['id','user_id','post_id']
      },

    ],
    order:[
      ['createdAt','DESC']
    ],
  });
  res.json(listOfPosts);
}); 

// creation d'un post
router.post("/", [validateToken,multer], async (req, res) => { //on met async/await pour etre sure que c'est entrer dans le database
    const post = req.body;
    post.user_id = req.user.id;
    post.picture = `images/${req.file.filename}`;
    try{
      let post_save = await Posts.create(post);
      // je renvoie le post integrale avec les dependances
      const postDetail = await Posts.findByPk(post_save.id,{
        include: [
          {
            model: Users,
            as:'author',
            attributes: ['id','username','profile_picture']
          },
          {
              model: Comments,
              as: 'comments',
              attributes: ['id','content',"user_id"],
              include:[
                {
                  model: Users,
                  as:'author',
                  attributes: ['id','username','profile_picture']
                }
              ]
          },
          {
              model: Likes,
              as: 'likes',
              attributes: ['id','user_id','post_id']
          },
    
        ] 
      })  //(findByPk)=Pour dire a sequelize qu'on veut select un item specific, Pk=Primary key qu'on le trouve dans MySQL Table qu'on a créé
      res.status(201).json({message:"post publier avec succes",post:postDetail});
    }catch(error){
      res.status(500).json({message:"use erreur est survenue essayez plus tard"})
    }
}); 


router.delete("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({
    where: {
      id: postId,
    },
  });

  res.json({message:"post supprimer avec succes"});
});




module.exports = router;