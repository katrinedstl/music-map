const AudioInfoGenerator = require('./audio_info');
const socketIo = require('socket.io');

const people = {};

module.exports.listen = server => {
    const io = socketIo.listen(server);

    const audiofiles = AudioInfoGenerator.generateInfo();

    io.on('connection', (client) => {
        let userId;

        client.emit('audio', audiofiles);

        client.on('joinserver', (user) => {
            people[user.id] = user;
            userId = user.id;

            io.emit('userlist', people);
        })

        client.on('update', (user) => {
            people[userId] = user;

            io.emit('userlist', people);
        })

        client.on('disconnect', () => {
            if(people[userId]) {
                delete people[userId];

                io.emit('removeuser', userId);   
            }
        })
    });

    return io;
};