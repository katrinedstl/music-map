import './scss/style.scss';

import { getInfo, setListeners } from './js/getinfo.js';
import { createLocalUser } from './js/local_user.js';

setListeners();

function start() {
    const info = getInfo();

    if(info[0] && info[1]) {
    	document.getElementById("option-box").style.display="none";

        createLocalUser(info);
    } else {
    	alert('Please select audio and pin color');
    }
}

document.getElementById("start-button").addEventListener("click", start);