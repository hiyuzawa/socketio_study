var app = require("http").createServer(handler),
	io = require("socket.io").listen(app),
	fs = require("fs")
io.set( "log level", 1 );
app.listen(8080)
function handler(req, res) {
	fs.readFile(__dirname + '/index.html', function(err, data) {
		if(err) {
			res.writeHead(500)
			return res.end("error")
		}
		res.writeHead(200)
		res.write(data)
		res.end()
	})
}

io.sockets.on("connection", function(socket){
	socket.on("emit_from_client", function(data){
		console.log(data)
		//socket.emit("emit_from_server", "hello from server: " + data)
		//socket.broadcast.emit("emit_from_server", "hello from server: " + data)
		socket.client_name = data.name
		io.sockets.emit("emit_from_server", "[" + socket.client_name + "]:" + data.msg)
	})
})