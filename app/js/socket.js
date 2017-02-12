import { initAudioContext } from './audio_context.js';
import { updateMap, removeGlobalUser } from './global_user.js';

import io from 'socket.io-client';

// connect to socket
const socket = io.connect(window.location.host, { reconnect: true });

socket.on('audio', (data) => {
    initAudioContext(data);
})

socket.on('userlist', (userlist) => {
    updateMap(userlist);
})

socket.on('removeuser', (userId) => {
    removeGlobalUser(userId);
})

export { socket }