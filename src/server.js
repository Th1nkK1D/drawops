import http from 'http';
import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
const io = require('socket.io');

import ColorsPool from './helpers/ColorsPool';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const server = http.createServer();

const colorsPool = new ColorsPool()

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
	console.log(`Assigned color: ${colorsPool.assign(socket.id)}`);

	socket.emit('assignColor', colorsPool.getColor(socket.id));
	
	socket.on('draw', drawParams => {
		socket.broadcast.emit('draw', drawParams);
	})

	socket.on('disconnect', () => {
    console.log(`Client ${socket.id} disconnected`);
  });
});