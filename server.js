import express from 'express';
import swig from 'swig';
import path from 'path';
import React from 'react';
import Router from 'react-router';
import routes from './app/routes';

var app = express();

app.set('port', process.env.PORT || 3001); 

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res) {
	Router.run(routes, req.path, function(Handler) {
		var html = React.renderToString(React.createElement(Handler));
		var page = swig.renderFile('views/index.html', {html: html, key:process.env.BBY_API_KEY});
		res.send(page);
	});
});

app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port')); 
});