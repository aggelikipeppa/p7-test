const express = require('express');
const router = express.Router();
const { Posts, Likes } = require("../models");

const { validateToken } = require("../middlewares/auth");

router.get("/", validateToken, async (req, res) => {
  const listOfPosts = await Posts.findAll({ include: [Likes] });  //function qui go through the tables and generate the sql
   const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
  res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
});

router.get('/byId/:id', async (req, res) => {
   const id = req.params.id 
   const post = await Posts.findByPk(id)  //(findByPk)=Pour dire a sequelize qu'on veut select un item specific, Pk=Primary key qu'on le trouve dans MySQL Table qu'on a créé
   res.json(post);
});  

router.get('/byuserId/:id', async (req, res) => {
  const id = req.params.id 
  const listOfPosts = await Posts.findAll({ 
    where: {UserId: id },
    include: [Likes],
  });
  res.json(listOfPosts);
}); 


router.post("/", validateToken, async (req, res) => { //on met async/await pour etre sure que c'est entrer dans le database
    const post = req.body;
    post.username = req.user.username;
    post.UserId = req.user.id;
    await Posts.create(post);      //Je crée un post comme le model que j'ai crée dans le dossier models/Posts
    res.json(post);
});
//imageUrl: `/images/${req.file.filename}`,//

//pour faire des modifications sur le titre du text
router.put("/title", validateToken, async (req, res) => { 
  const { newTitle, id } = req.body;
  await Posts.update({title: newTitle}, {where: { id: id }})     
  res.json(newTitle);
});

//pour faire des modifications sur le text du post
router.put("/postText", validateToken, async (req, res) => { 
  const { newText, id } = req.body;
  await Posts.update({postText: newText}, {where: { id: id }})     
  res.json(newText);
});

//pour supprimer un post
router.delete("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({
    where: {
      id: postId,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});




module.exports = router;