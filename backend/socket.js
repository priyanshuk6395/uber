const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');
const rideModel = require('./models/ride.model'); // Assuming a Ride model exists

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on('join', async (data) => {
            try {
                const { userId, userType } = data;
                console.log('join', userId, userType);

                if (!userId || !userType) {
                    return socket.emit('error', { message: 'Missing userId or userType' });
                }

                if (userType === 'user') {
                    await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
                } else if (userType === 'captain') {
                    await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
                }
            } catch (error) {
                console.error('Error in join event:', error);
                socket.emit('error', { message: 'Internal server error' });
            }
        });

        socket.on('update-location-captain', async (data) => {
            try {
                const { userId, location } = data;

                if (!userId || !location || !location.ltd || !location.lng) {
                    return socket.emit('error', { message: 'Invalid location data' });
                }

                await captainModel.findByIdAndUpdate(userId, {
                    location: {
                        ltd: location.ltd,
                        lng: location.lng
                    }
                });

                console.log(`Updated location for captain: ${userId}`);
            } catch (error) {
                console.error('Error updating location:', error);
                socket.emit('error', { message: 'Could not update location' });
            }
        }); 

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

const sendMessageToSocketId = (socketId, messageObject) => {
    if (io) {
        console.log(`Sending message to : {socketId}`, messageObject);
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.error('Socket.io not initialized.');
    }
};

module.exports = { initializeSocket, sendMessageToSocketId };
