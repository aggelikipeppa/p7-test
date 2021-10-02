const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/auth");

const { sign } = require("jsonwebtoken"); //pour generer le TOKEN

//SIGNUP //Inserer les éléments dans le table Users pour faire l'inscription
router.post("/", async (req, res) => {
  const { username, password, email } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
      email: email,
    });
    res.json("SUCCESS");
  });
});


//LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) res.json({ error: "User Doesn't Exist" });

  bcrypt.compare(password, user.password).then(async (match) => {
    if (!match) res.json({ error: "Wrong Username And Password Combination" });

    const accessToken = sign(
      { username: user.username, id: user.id },
      "importantsecret"
    );
    res.json({token: accessToken, username: username, id: user.id});
  });
});

//Chaque fois qu'on fait ce requete on recupére des infos pour le user
router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

//Pour recuperer les infos du profile
router.get("/basicinfo/:id", async (req, res) => {
  const id = req.params.id;

  const basicInfo = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },  //Je exclue le password par les info que je veux recevoir
  });

  res.json(basicInfo);
});

//Pour changer le mot de passe 
router.put('/changepassword', validateToken, async (req, res) => { 
  const {oldPassword, newPassword} = req.body;
  const user = await Users.findOne({ where: { username: req.user.username } });
  
  //On compare l'ancien password avec le table dans la Table de Base de donneés
  bcrypt.compare(oldPassword, user.password).then(async (match) => {
    if (!match) res.json({ error: "Wrong password Entered!" });

    bcrypt.hash(newPassword, 10).then((hash) => {
      Users.update({password: hash}, { where: { username: req.user.username } }), 
      res.json("SUCCESS");
    });
  }); 
  });




module.exports = router;