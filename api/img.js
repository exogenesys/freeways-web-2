const express = require('express')
const Router = express.Router()
const sharp = require('sharp')

console.log("hello from img");

Router.get('/echo/:word', (req, res) => {
	const str = req.params.word
	res.send(str.split('').reverse().join(''))
})

Router.get('/img/:quality/:filename', (req, res) => {
	const name = req.params.filename
	const quality = Number(req.params.quality)
	console.log(name);
	sharp('static/img/' + name + '.jpg')
	.jpeg({
		quality : quality,
		progressive : true
	})
	.toBuffer()
	.then(data => {
		res.writeHead(200, {'Content-Type': 'image/jpeg'});
		res.end(data, 'binary');
	});
})

Router.get('/img/:filename', (req, res) => {
	const name = req.params.filename
	console.log(name);
	sharp('static/img/' + name + '.jpg')
	.jpeg({
		progressive : true
	})
	.toBuffer()
	.then(data => {
		res.writeHead(200, {'Content-Type': 'image/jpeg'});
		res.end(data, 'binary');
	});
})


Router.get('/img/:width/:height/:quality/:filename', (req, res) => {
	const name = req.params.filename
	const quality = Number(req.params.quality)
	const width = Number(req.params.width)
	const height = Number(req.params.height)
	console.log(name);
	sharp('static/img/' + name + '.jpg')
	.jpeg({
		quality : quality,
		progressive : true
	})
	.resize(width, height)
	.toBuffer()
	.then(data => {
		res.writeHead(200, {'Content-Type': 'image/jpeg'});
		res.end(data, 'binary');
	});
})

Router.get('/img/crop/:width/:height/:quality/:filename', (req, res) => {
	const name = req.params.filename
	const quality = Number(req.params.quality)
	const width = Number(req.params.width)
	const height = Number(req.params.height)
	console.log(name);
	sharp('static/img/' + name + '.jpg')
	.jpeg({
		quality : quality,
		progressive : true
	})
	.resize(width, height)
	.crop(sharp.strategy.attention)
	.toBuffer()
	.then(data => {
		res.writeHead(200, {'Content-Type': 'image/jpeg'});
		res.end(data, 'binary');
	});
})


module.exports = Router
