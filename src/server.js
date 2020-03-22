import http from 'http';
import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
const io = require('socket.io');

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const server = http.createServer();

polka({ server }) // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
	
io.listen(server);

io(server).on('connection', socket => {
	console.log(`New socket connection: ${socket.id}`);
	
	socket.on('draw', drawParams => {
		socket.broadcast.emit('draw', drawParams);
	})
});