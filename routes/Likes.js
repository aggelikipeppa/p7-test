const express = require("express");
const router = express.Router();
const { Likes } = require("../models");
const { validateToken } = require("../middlewares/auth");

router.post("/", validateToken, async (req, res) => {
  const { PostId } = req.body;
  const UserId = req.user.id;

  const found = await Likes.findOne({   //On cherche si l'utilisateur a fait le Like déjà
    where: { PostId: PostId, UserId: UserId },
  });
  if (!found) {     //Si il n'a pas fait on lui permet de faire le Like
    await Likes.create({ PostId: PostId, UserId: UserId });
    res.json({liked: true});
  } else {      //Si il a déjà fait il peut pas le refaire, juste il l'enleve
    await Likes.destroy({
      where: { PostId: PostId, UserId: UserId },
    });
    res.json({liked: false});
  }
});

module.exports = router;