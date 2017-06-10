const express = require('express');
const mongoose = require("mongoose");

const places = require("../models/places.js");
const trips = require('../models/trip.js');
const experiences = require("../models/experience.js");
const destinations = require("../models/destination.js");
const languages = require("../models/languages.js");
const mustCarry = require("../models/mustcarry.js");

const Router = express.Router();

mongoose.connect("mongodb://saulgoodman:hackerman@ds163561.mlab.com:63561/freeways-memory");

console.log("hello from api");

Router.get("/trips/:slug", (req, res) => {
	console.log("hello from ttrips");
	trips.find({
		slug: req.params.slug
	}, (err, data) => {
		if (err) {
			console.error("error looking up trip data");
		} else {
			res.send(data);
		}
	});
});

Router.get("/destination/:slug", (req, res) => {
	destinations.find({
		slug: req.params.slug
	}, (err, data) => {
		if (err) {
			console.error("error looking up destination data " + err.stack);
		} else {
			res.send(data);
		}
	});
});

Router.get("/places/:slug", (req, res) => {
	places.find({
		slug: req.params.slug
	}, (err, data) => {
		if (err) {
			console.error("error took place while looking up places");
		} else {
			res.send(data);
		}
	});
});

Router.get("/experiences/:slug", (req, res) => {
	experiences.find({
		slug: req.params.slug
	}, (err, data) => {
		if (err) {
			console.error("error took place while looking up experiences");
		} else {
			res.send(data);
		}
	});
});

Router.get("/mustCarry/:slug", (req, res) => {
	mustCarry.find({
		slug: req.params.slug
	}, (err, data) => {
		if (err) {
			console.error("error took place while looking up mustCarry");
		} else {
			res.send(data);
		}
	});
});

Router.get("/langauges/:slug", (req, res) => {
	langauges.find({
		slug: req.params.slug
	}, (err, data) => {
		if (err) {
			console.error("error took place while looking up langauges");
		} else {
			res.send(data);
		}
	});
});

module.exports = Router
