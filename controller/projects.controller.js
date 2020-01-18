const express = require('express');
const router = express.Router();
const db = require('../model');

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

router.delete('/api/projects/delete/:id', (req, res) => {
    console.log(req.params.id);

    db.Projects.remove({_id: req.params.id})
    .then(result => console.log(result))
    .catch(err => console.log(`\n db.projects: ${err}`));

});

module.exports = router;