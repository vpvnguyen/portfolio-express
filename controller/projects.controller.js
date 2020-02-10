const express = require('express');
const router = express.Router();
const db = require('../model');
const upload = require('../services/uploadImageS3');
var singleUpload = upload.single('image');

// get all projects from mongoDB

router.get('/api/TEST', (req, res) => {
    console.log(`\n GET > /api/TEST`);

    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: '/api/TEST',
                authData
            });
        }
    });
    
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

router.get('/api/projects', (req, res) => {
    console.log(`\n GET > /api/projects`);

    db.Projects.find({})
        .then(result => res.send(result))
        .catch(err => console.log(err));
});

// create project
router.post('/api/projects/create', (req, res) => {
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
router.put('/api/projects/update/:id', (req, res) => {
    console.log('\nPUT /api/projects/delete/:id');
    console.log(req.body);

    db.Projects.findByIdAndUpdate(req.params.id, req.body)
        .then(result => res.send(result))
        .catch(err => `\n db.Projects: ${err}`);

    res.status(200);
});

// delete project by id
router.delete('/api/projects/delete/:id', (req, res) => {
    console.log(req.params.id);

    db.Projects.remove({ _id: req.params.id })
        .then(result => console.log(result))
        .catch(err => console.log(`\n db.projects: ${err}`));
});

// upload file to aws s3
router.post('/api/image/upload', (req, res) => {
    singleUpload(req, res, err => {
        return res.json({ 'imageUrl': req.file.location });
    });
});

module.exports = router;