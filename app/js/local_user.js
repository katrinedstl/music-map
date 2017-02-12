import uuid from 'node-uuid';

import Map from './map.js';
import { socket } from './socket.js';
import { pinSymbol } from './utilities.js';

// users
let localUser;

// map
const map = new Map();

class User {
    constructor(id, color, sound, latitude, longitude) {
        this.id = id;
        this.color = color;
        this.sound = sound;
        this.latitude = latitude;
        this.longitude = longitude;
        this.marker = this.setMarker();
 	}

    update(lat, lng) {
        this.latitude = lat;
        this.longitude = lng;

        this.marker.setPosition({ lat: lat, lng: lng });

        socket.emit('update', this.makeSendableObject());
    }

    setMarker() {
        return new google.maps.Marker({ 
            position: { lat: this.latitude, lng: this.longitude }, 
            map: map.map,
            icon: pinSymbol(this.color) 
        });
    }

    // This is all we need to send to server
    makeSendableObject() {
        return {
            id: this.id,
            color: this.color,
            sound: this.sound,
            latitude: this.latitude,
            longitude: this.longitude,
        }
    }
}

export function createLocalUser(info) {
    localUser = new User(uuid.v4(), info[0], info[1], map.coords.lat, map.coords.long);

    socket.emit('joinserver', localUser.makeSendableObject());
}

export { localUser, map }