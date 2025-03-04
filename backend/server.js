const http = require('http');
const app= require('./app');
const { log } = require('console');
const { initializeSocket } = require('./socket');

const server= http.createServer(app);
initializeSocket(server);
const PORT = process.env.PORT || 3000;
server.listen(PORT,()=>{
    log(`Backend Server is running on ${PORT}`);
})