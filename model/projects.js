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
    link: {
        type: String,
        required: true,
        unique: true,
    },
});

const Projects = mongoose.model('Projects', ProjectsSchema);

module.exports = Projects;