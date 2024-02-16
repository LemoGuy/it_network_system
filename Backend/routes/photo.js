const User = require('../models/User.js'); // db table
const express = require('express'); // e
const router = express.Router();
const bcrypt = require('bcryptjs')
const Photo = require('../models/Photo.js')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const upload = multer();
const crypto = require('crypto')

const deletePhoto = async (photo) => {
    let photoPath = `photos/${photo.randomToken}-${photo.photoHash}.${photo.photoFileType}`
    await Photo.deleteOne({ _id: photo._id })

    try {
        fs.unlinkSync(photoPath);
    }
    catch (error) { }
}

router.get('/', async (req, res) => {
    let pipeline = [
        {
            $lookup: {
                from: "users",
                localField: "uploadedBy",
                foreignField: "_id",
                as: "uploadedBy"
            }
        },
        {
            $unwind: {
                path: "$uploadedBy"
            }
        }
    ]
    if (req.query.own) {
        pipeline.unshift({
            $match: {
                uploadedBy: req.user._id
            }
        })
    }

    let photos = await Photo.aggregate(pipeline);
    res.set('Cache-Control', 'no-store')
    res.json(photos);
})

// data that user did post, inside req.body 
router.post('/', upload.any(), async (req, res) => {
    const { name } = req.body;
    // add checks for the book and name
    if (!name || !req.files || req.files.length == 0) {
        res.status(400).json({
            message: 'Photo Name and File must be provided!'
        });
        return;
    }

    if (name.length < 1 || name.length > 100) {
        res.status(400).json({
            message: 'Photo name must be between 1 to 100 charecters!'
        })
        return
    }

    const photoData = req.files[0]
    if (!photoData.originalname.endsWith('.jpg') || !photoData.originalname.endsWith('.png')){
        res.status(400).json({
            message: 'Uploaded file is not valid photo format!'
        })
        return
    }

    let randomToken = crypto.randomBytes(4).toString('hex');
    let hash = crypto.createHash('sha256').update(photoData.buffer).digest('hex')
    // for 2 photos with same name,
    let fileType = /\.(.{1,5})$/.exec(photoData.originalname)
    if (fileType) fileType = fileType[1]
    let newName = `${hash}.${fileType}`
    fs.writeFileSync(path.join('photos', `${randomToken}-${newName}`), photoData.buffer)

    await Photo.create({
        name: name,
        uploadedBy: req.user._id,
        photoHash: hash,
        photoFileType: fileType,
        randomToken: randomToken
    })
    res.sendStatus(201)
});

router.delete('/:id', async (req, res) => {
    let oldPhoto = await Photo.findOne({
        _id: req.params.id
    })

    if (!oldPhoto || (req.user.__t !== 'Admin' && !oldPhoto.uploadedBy.equals(req.user._id))) {
        res.sendStatus(400)
        return
    }
    await deletePhoto(oldPhoto);
    res.sendStatus(200)
})

module.exports = router; 
module.exports.deletePhoto = deletePhoto;