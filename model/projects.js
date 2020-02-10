const mongoose = require('mongoose');

// use mongoose to generate schema
const Schema = mongoose.Schema;

// create a projects schema
const ProjectsSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: false,
    },
    desc: {
        type: String,
        required: false,
        unique: false,
    },
    link: {
        type: String,
        required: true,
        unique: true,
    },
    githubLink: {
        type: String,
        required: true,
        unique: true,
    },
});

// set Projects as collection and export the model
const Projects = mongoose.model('Projects', ProjectsSchema);

module.exports = Projects;