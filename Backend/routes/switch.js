const mongoose = require('mongoose')
const User = require('../models/User.js'); // db table
const express = require('express'); // e
const router = express.Router();

const Switch = require('../models/Switch.js');


// get switches
router.get('/', async (req, res) => {
     let switches = await Switch.find({})
    res.set('Cache-Control', 'no-store')
    res.json(switches)
});

// get data from db
router.get('/:id', async (req, res) => {
    let switches = await Switch.findOne({ _id: req.params.id })
    res.json(switches)
})


// update data and remove old one directly
router.put('/:user_id', async (req, res) => {
 
    let data = { ...req.body }; // get the post data
    if (!data.name || !data.username || !data.email || !data.password || !data.password2 || !data.type) {
        res.status(400).json({
            message: 'Form is not compelete!'
        })
        return
    }

    try {
        await User.updateOne({ _id: req.params.user_id }, data); // instert into db
        res.sendStatus(201); // give OK status
    } catch (e) {
        if (e.code == 11000) {
            let msg = 'Error'
            if ('email' in e.keyPattern) msg = 'Entered Email already exists!'
            else if ('username' in e.keyPattern) msg = 'Entered Username already exists!'
            res.status(400).json({
                message: msg
            })
            returns
        }
    }
})



// Todo put auth for all 

// data that user did post, inside req.body 
router.post('/', async (req, res) => {
    //todo: check that the entire body is complete


    if (!req.user || req.user.type !== 'Admin') {
        res.sendStatus(400)
        return
    }


    let data = { ...req.body, uploadedBy: req.user._id }; // get the post data

    console.log(req.body)
    if (!data.building
        || !data.floor
        || !data.room
        || !data.shelfNumber
        || !data.name
        || !data.model
        || !data.brand
        || !data.macAddress
        || !data.serialNumber
        || !data.ipAddress
        || !data.subnet
        || !data.vlan
        || !data.firmwareVersion
        || !data.portType) {

        res.status(400).json({
            message: 'Form is not compelete!'
        })
        return
    }
    data.uploadDate = new Date();
    data.uploadedBy = req.user._id;
    data.ports = [];

    for (let i = 0; i < data.portType; i++) {
        data.ports.push({
            portNumber: i+1,
            patchPanelPortNumber: `${i+1}`,
            roomNumber: " ",
            batchNumberOnWall: " ",
        });
    }
    console.log(data);

    // return res.sendStatus(400)
    try {
        await Switch.create(data); // instert into db
        console.log("creating!!")
        res.sendStatus(201); // give OK status
    } catch (e) {
        console.log(e)

        let msg = 'Error Occured'

        res.status(400).json({
            message: msg
        })
        return
    }

});



// DELETE
router.delete('/:id', async (req, res) => {
    if (req.user.type !== 'Admin') {
        res.sendStatus(400)
        return
    }
    await Switch.deleteOne({ _id: req.params.id });

    res.sendStatus(200)
})

module.exports = router; 