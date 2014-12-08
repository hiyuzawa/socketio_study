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

var chat = io.of("/chat").on("connection", function(socket){
	console.log("connection : /chat")
	socket.on("emit_from_client", function(data){
		console.log(data)
		socket.join(data.room)
		socket.emit("emit_from_server", "you are in " + data.room)
		socket.broadcast.to(data.room).emit("emit_from_server", data.msg)
	})
})

var news = io.of("/news").on("connection", function(socket){
	console.log("connection : /news")
	socket.emit("emit_from_server", "Today: " + new Date())
})

