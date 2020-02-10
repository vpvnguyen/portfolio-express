const express = require('express');
const router = express.Router();
const db = require('../model');
const jwt = require('jsonwebtoken');
const upload = require('../services/uploadImageS3');
var singleUpload = upload.single('image');

// get all projects from mongoDB

router.get('/api/TEST', (req, res) => {
    console.log(`\n GET > /api/TEST`);

    const projects = [
        {
            title: 'title',
            link: 'link',
            desc: 'something here',
        },
        {
            title: 'title2',
            link: 'link2',
            desc: 'something here2',
        }
    ];

    res.json(projects);
});

router.get('/api/projects', verifyToken, (req, res) => {
    console.log(`\n GET > /api/projects`);

    db.Projects.find({})
        .then(result => res.send(result))
        .catch(err => console.log(err));
});

// create project
router.post('/api/projects/create', verifyToken, (req, res) => {
    console.log(`\n POST > /api/projects/create`);

    console.log(req.body);

    db.Projects.create({
        title: '1st projecto',
        desc: 'desc',
        link: 'link',
        date: Date
    })
        .then(result => res.send(result))
        .catch(err => console.log(`\n db.Projects: ${err}`));
});

// update project by id
router.put('/api/projects/update/:id', verifyToken, (req, res) => {
    console.log('\nPUT /api/projects/delete/:id');
    console.log(req.body);

    db.Projects.findByIdAndUpdate(req.params.id, req.body)
        .then(result => res.send(result))
        .catch(err => `\n db.Projects: ${err}`);

    res.status(200);
});

// delete project by id
router.delete('/api/projects/delete/:id', verifyToken, (req, res) => {
    console.log(req.params.id);

    db.Projects.remove({ _id: req.params.id })
        .then(result => console.log(result))
        .catch(err => console.log(`\n db.projects: ${err}`));
});

// upload file to aws s3
router.post('/api/image/upload', verifyToken, (req, res) => {
    singleUpload(req, res, err => {
        return res.json({ 'imageUrl': req.file.location });
    });
});

// format of token
// authorization: bearer <access_token>

// verify token
function verifyToken(req, res, next) {
    // get auth header value
    const bearerHeader = req.headers['authorization'];

    // check if bearer is undefined
    if (typeof bearerHeader !== undefined) {
        console.log('defined!')
    } else {
        // forbidden
        res.status(403);
    }
};

module.exports = router;