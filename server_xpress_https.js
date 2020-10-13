// https://jessjam.dyndnss.net/
// https://92.169.9.208:9001

var HTTPS = false;
HTTPS = true;

//const express = require('express');
const https   = require('https');
const http    = require('http');
const fs      = require('fs');
const port    = 9001;
const url 	  = require('url');
const path    = require('path');

var options = {
  key:  fs.readFileSync('keys/jcr-key.pem'),
  cert: fs.readFileSync('keys/jcr-cert.pem')
};

//=================================

function serverHandler(request, response) {
    var uri = url.parse(request.url).pathname,
        filename = path.join(process.cwd(), uri);
		
	console.log("reçu: \trequest.url= ",  request.url,"\turi= ", uri,"\turl= ", filename);

    fs.exists(filename, function(exists) {
		
//		console.log("Server got", filename);
			
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            response.write('404 Not Found: ' + filename + '\n');
            response.end();
            return;
        }

        if (filename.indexOf('favicon.ico') !== -1) {
            return;
        }

        var isWin = !!process.platform.match(/^win/);

		if (fs.statSync(filename).isDirectory() && !isWin) {
            filename += '/index.html'; 
        } else if (fs.statSync(filename).isDirectory() && !!isWin) {
            filename += '\\index.html';
        }
		
        fs.readFile(filename, 'binary', function(err, file) {
            if (err) {
                response.writeHead(500, {
                    'Content-Type': 'text/plain'
                });
                response.write(err + '\n');
                response.end();
                return;
            }

            var contentType;

            if (filename.indexOf('.html') !== -1) {
                contentType = 'text/html';
            }

            if (filename.indexOf('.js') !== -1) {
                contentType = 'application/javascript';
            }

            if (contentType) {
                response.writeHead(200, {
                    'Content-Type': contentType
                });
            } else response.writeHead(200);

            response.write(file, 'binary');
            response.end();
        });
    });
}

if (HTTPS) {
	var server = https.createServer(options, serverHandler);
	server.listen(process.env.PORT || port, process.env.IP || "192.168.1.20", function() {
	 	var addr = server.address();
	 	console.log("https server listening at", addr.address + ":" + addr.port);	
	});		
}
else {
	var server = http.createServer(serverHandler);	
	server.listen(process.env.PORT || port, process.env.IP || "192.168.1.20", function() {
	 	var addr = server.address();
	 	console.log("http server listening at", addr.address + ":" + addr.port);	
	});	
};
