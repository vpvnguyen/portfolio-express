const express = require('express');
const router = express.Router();
const db = require('../model');
const upload = require('../services/uploadImageS3');
var singleUpload = upload.single('image');

// get all projects from mongoDB
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
    .then(result => console.log(result))
    .catch(err => console.log(`\n db.Projects: ${err}`));
});

router.put('/api/projects/update/:id', (req, res) => {
    console.log('\nPUT /api/projects/delete/:id');
    console.log(req.params.id);
    console.log(req.body.title);
    console.log(req.body.desc);
    console.log(req.body.link);
    console.log(req.body);

    db.Projects.findByIdAndUpdate(req.params.id, req.body)
    .then(result => res.send(result))
    // .then(result => console.log(result))
    .catch(err => `\n db.Projects: ${err}`);

    res.status(200);

    // findOneAndUpdate({ _id: id }, ...)
});

router.delete('/api/projects/delete/:id', (req, res) => {
    console.log(req.params.id);

    db.Projects.remove({_id: req.params.id})
    .then(result => console.log(result))
    .catch(err => console.log(`\n db.projects: ${err}`));

});

router.post('/api/image/upload', (req, res) => {
    singleUpload(req, res, err => {
        return res.json({'imageUrl': req.file.location});
    });
});

module.exports = router;