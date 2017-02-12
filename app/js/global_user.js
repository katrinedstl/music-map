import { AudioGenerator } from './audio_user.js';
import { initAudioContext, initSound } from './audio_context.js';
import { pinSymbol } from './utilities.js';
import { map, localUser } from './local_user.js';

let globalUserList = {};

function newGlobalUser(userId, user) {
    globalUserList[userId] = {};

    globalUserList[userId].marker = new google.maps.Marker({ 
            position: { lat: user.latitude, lng: user.longitude }, 
            map: map.map,
            icon: pinSymbol(user.color) 
        });

    globalUserList[userId].soundstream = new AudioGenerator(
            user.id,
            user.sound, 
            { lat: user.latitude, lng: user.longitude },
            { lat: localUser.latitude, lng: localUser.longitude }
        );

    globalUserList[userId].soundstream.play();
}

function updateGlobalUser(userId, user) {
    globalUserList[userId].marker.setPosition({ lat: user.latitude, 
                                                lng: user.longitude });
    
    globalUserList[userId].soundstream.updateSound( 
                                    { lat: user.latitude, lng: user.longitude },
                                    { lat: localUser.latitude, lng: localUser.longitude }
                                );
}

export function removeGlobalUser(userId) {
    globalUserList[userId].soundstream.stop();
    globalUserList[userId].marker.setMap(null);

    delete globalUserList[userId];
}

export function updateMap(users) {
    for(let user in users) {
        if(localUser && user !== localUser.id) {
            if(!globalUserList[user]) {
                newGlobalUser(user, users[user]);
            } else {
                updateGlobalUser(user, users[user]);
            }
        }
    }
}