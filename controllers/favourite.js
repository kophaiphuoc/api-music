const { favoruties } = require("../models/favourite");

const favoruties_controller = {
  add_favoruties: async (req, res) => {
    try {
      const new_favorutie = new favoruties({
        id_song: req.body.id_song,
        name_song: req.body.name_song,
        name_art: req.body.name_art,
        img_song: req.body.img_song,
        link_song: req.body.link_song
      });
      if (
        req.body.id_song == null,
        req.body.name_song == null,
        req.body.name_art == null,
        req.body.img_song == null,
        req.body.link_song == null
      ) {
        res.status(201).json("missing information");
      } else {
        await new_favorutie.save();
        res.status(200).json({
          code: 0,
          message: "successfully",
        });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({
        code: 1,
        message: "successful failed",
      });
    }
  },
};

module.exports = favoruties_controller;
