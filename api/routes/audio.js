const express = require("express");
const router = express.Router();
const Audio = require('../models/Audio')
const multer = require('multer')
const baseUrl = "http://localhost:8080/audio/";
const mongoose = require('mongoose');



const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    console.log('filename')
    cb(null, file.originalname)
  },
  destination: function (req, file, cb) {
    console.log('storage')
    cb(null, __basedir + "/uploads/audio/");
  },
})
const upload = multer({ storage })


router.get('/', async (req, res) => {


  const audios = await Audio.find();
  res.status(200).send({
    success: true,
    data: audios,
    message: 'Audio retrived successfully'
  })
});



router.get('/:id', function(req, res, next) {
 
  Audio.Item.findOne().where({ _id: item.id }).exec((err, i) =>  {
 if (err) return console.error(err)
      try {
          console.log(results)            
      } catch (error) {
          console.log("errror getting results")
          console.log(error)
      } 
      res.send({
        success: true,
        data: results,
        message: 'Audio retrived successfully'
      })
  
    })

  });
 


const CounterSchema={
  id: { type: String }, seq: {type: Number}
}
const countermodel = module.exports = mongoose.model('counter', CounterSchema);


router.post('/', upload.fields([{ name: 'thumbnail' }, { name: 'audioFile' },]), async (req, res) => {

  countermodel.findOneAndUpdate(
    { id: "autoval" },
    { "$inc": { "seq": 1 } },
    { new: true }, (err, cd) => {
      if (cd == null) {
        const newval = new countermodel({ id: "autoval", seq: 1 })
        newval.save()
        seqId = 1
      } else {
        seqId = cd.seq
      }
      const audio = new Audio ({
        id: seqId,
        title: req.body.title,
        artistName: req.body.artistName,
        owner: req.body.owner,
//        thumbnail:  req.files? `${baseUrl}${req.files['thumbnail'][0]}` : null, 
//        audioFile:  req.files? `${baseUrl}${req.files['audioFile'][0]}` : null
        thumbnail:  baseUrl + req.files['thumbnail'][0].filename,
        audioFile: baseUrl + req.files['audioFile'][0].filename
  
// 

    });
      try {
        const savedAudio = audio.save();
        res.json(audio);
      } catch (err) {
        res.json({ message: err });
      }
    })
});

module.exports = router;
