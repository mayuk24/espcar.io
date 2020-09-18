const
	{host,port} = require('../config'),
	express			= require('express'),
	app					= express(),
	server			= require('http').createServer(app),
	io					= require('socket.io')(server),
	Move				= require('./src/move'),
	pbl			= './public',
	msg					= () =>{
		console.log(`Server running at http://${host}:${port}/`);
	};

server.listen(port,host,msg);

app.use(express.static(pbl));

let
	log 			= true,
	conexions	= 0,
	clients		= { 
		joysticks:[],
		esps: []
	};

const uEsps = (io,socketId = false) =>{
	if(socketId)io.to(socketId).emit('uEsps',{clientId:socketId,esps:clients.esps});
	else clients.joysticks.forEach(clientid => {
		io.to(clientid).emit('uEsps',{clientId:clientid,esps:clients.esps});
	});
	if(log)console.log(clients);
};

io.on('connection', (socket) => {

	conexions++;
	if(log)console.log(`conexions = ${conexions}`);

	socket.on('identify', data =>{
		if(data == 'joystick'){
			clients.joysticks.push(socket.id);
			uEsps(io,socket.id);	
		}
		else if(data == 'esp'){
			clients.esps.push({id:socket.id,useBy:'none'});
			uEsps(io);
		}
	});

	socket.on('selectEsp',data =>{
		if(clients.esps[data].useBy == 'none'){
			clients.esps[data].useBy = socket.id;
			uEsps(io);
		}
	});

	socket.on('unselectEsp',data =>{
		if(clients.esps[data].useBy == socket.id){
			clients.esps[data].useBy = 'none';
			uEsps(io);
		}
	});

	socket.on('move', data =>{
		esp = new Move(data,socket,{
			eventName:'moving',
			debug:log
		});
		esp.init(clients.esps,socket.id);
	});
	
	socket.on('disconnect',()=>
	{
		conexions--;

		let joystick = clients.joysticks.indexOf(socket.id);
		if (joystick  > -1){
			clients.joysticks.splice(joystick ,1);
			clients.esps.forEach(element => {
				if (element.useBy == socket.id ){ 
					element.useBy = 'none';
					uEsps(io);
				}
			});
		}
		else{
			clients.esps = clients.esps.filter( item =>{ 
				if(item.id == socket.id ) io.to(item.useBy).emit('dEsp');
				return item.id !== socket.id;
			});
			uEsps(io);
		} 
	});
});
