var http = require('http'),
	fs = require('fs'),
	url = require('url'),
	port = 8080;

var listingData, server;

function send404(response){
	response.writeHead(404, {'Content-type': 'text/html'});
	response.write('Bad gateway error');
	response.end();
}


var requestHandler = function(request, response){
	var parsedUrl = url.parse(request.url);

	if(parsedUrl.pathname == '/listings' && request.method == 'GET'){
		response.end(listingData);
	}

	else{
		send404(response);
	}
};

fs.readFile('listings.json', 'utf8', function(err,data){
	
	if(err){
		throw err;
	}
	
	listingData = data;

	server = http.createServer(requestHandler).listen(port);
});
