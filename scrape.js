'use strict';

var request = require('request'),
cheerio = require('cheerio'),
list = [];

request('http://www.thisiswhyimbroke.com/new/', function(err, res, body){
	if(!err && res.statusCode === 200){
		var $ = cheerio.load(body);
		$('div.item a img').each(function(){
			//console.log(this.attribs.src);
			list.push(this.attribs.src);
		});
	}
	console.log(list);
});
