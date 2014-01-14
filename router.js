function route (pathname,request, response) {
  handle = {};
  handle["/"] = index;
  // handle["/start"] = requestHandlers.start;
  // handle["/upload"] = requestHandlers.upload;

  if(typeof handle[pathname] === 'function') {
    handle[pathname](response);
  } else {
    console.log("404 not found");
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.write("Content not found");
    response.end();
  }
}

function index(response) {
  fs.readFile('/public/index.html', function (err, data) {
    if (err) throw err;
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
  });
}

exports.route = route;