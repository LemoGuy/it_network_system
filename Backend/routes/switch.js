const mongoose = require("mongoose");
const User = require("../models/User.js"); // db table
const express = require("express"); // e
const router = express.Router();
const switchValidater = require("../validator/switchValidater.js")

const Switch = require("../models/Switch.js");

// get switches
router.get("/", async (req, res) => {
  let pipeline = [
    {
      $lookup: {
        from: "users",
        localField: "uploadedBy",
        foreignField: "_id",
        as: "uploadedBy",
      },
    },
    {
      $unwind: {
        path: "$uploadedBy",
      },
    },
  ];
  if (req.query.own) {
    pipeline.unshift({
      $match: {
        uploadedBy: req.user._id,
      },
    });
  }

  let switches = await Switch.aggregate(pipeline);
  res.set("Cache-Control", "no-store");
  res.json(switches);
});

// get data from db
router.get("/:id", async (req, res) => {
  let switches = await Switch.findOne({ _id: req.params.id });
  res.json(switches);
});

// Todo put auth for all

// data that user did post, inside req.body
router.post("/", async (req, res) => {
  //todo: check that the entire body is complete

  if (!req.user) {
    res.sendStatus(400);
    return;
  }

  let data = { ...req.body, uploadedBy: req.user._id }; // get the post data

  console.log(req.body);
  let result = switchValidater.safeParse(data)
  if (!result.success) {
    let messages = result.error.issues.map(i => i.message)
    console.log(result.error.issues.map(i => i.path))
    res.status(400).json({messages});
    // console.log("reaching!!!!")
    return;
  }
  data.uploadDate = new Date();
  data.uploadedBy = req.user._id;
  data.ports = [];

  for (let i = 0; i < data.portType; i++) {
    data.ports.push({
      portNumber: i + 1,
      patchPanelPortNumber: `${i + 1}`,
      roomNumber: " ",
      batchNumberOnWall: " ",
    });
  }
  console.log(data);

  // return res.sendStatus(400)
  try {
    await Switch.create(data); // instert into db
    console.log("creating!!");
    res.sendStatus(201); // give OK status
  } catch (e) {
    console.log(e);

    let msg = "Error occured";

    res.status(400).json({
      message: msg,
    });
    return;
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
    //todo: check that the entire body is complete
  
    if (!req.user) {
      res.sendStatus(400);
      return;
    }
  
    let data = { ...req.body, uploadedBy: req.user._id }; // get the post data
  
    console.log(req.body);
    if (
      !data.building ||
      !data.floor ||
      !data.room ||
      !data.shelfNumber ||
      !data.name ||
      !data.model ||
      !data.brand ||
      !data.macAddress ||
      !data.serialNumber ||
      !data.ipAddress ||
      !data.subnet ||
      !data.vlan ||
      !data.firmwareVersion ||
      !data.portType
    ) {
      res.status(400).json({
        message: "Form is not compelete!",
      });
      return;
    }
    data.uploadDate = new Date();
    data.uploadedBy = req.user._id;
    data.ports = [];
  
    for (let i = 0; i < data.portType; i++) {
      data.ports.push({
        portNumber: i + 1,
        patchPanelPortNumber: `${i + 1}`,
        roomNumber: " ",
        batchNumberOnWall: " ",
      });
    }
    console.log(data);
  
    // return res.sendStatus(400)
    try {
      
      let update = await Switch.updateOne({_id:req.params.id}, data); // instert into db
      
      console.log("updating!!");
      res.sendStatus(201); // give OK status
    } catch (e) {
      console.log(e);
  
      let msg = "Error Occured";
  
      res.status(400).json({
        message: msg,
      });
      
      return;
    }
  });




  //update ports 
  router.put("/:switchId/ports", async (req, res) => {
    if (!req.user) {
      res.sendStatus(400);
      return;
    }

    try {

   await Switch.updateOne(
      { _id: req.params.switchId },
      { $set:
         {
          ports: req.body
         }
      }
   )
   return res.sendStatus(200)
  } catch (e) {

    let msg = "Error Occured";

    res.status(400).json({
      message: msg,
    });
    
    return;
  }

  })

// DELETE
router.delete("/:id", async (req, res) => {
  if (req.user.type !== "Admin") {
    res.sendStatus(400);
    return;
  }
  await Switch.deleteOne({ _id: req.params.id });

  res.sendStatus(200);
});

module.exports = router;
