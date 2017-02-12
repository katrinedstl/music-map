import { socket } from './socket.js';
import { localUser } from './local_user.js';

export default class Map {
    constructor() {
        this.map = this.mapInitialize();
        this.id = this.listen(this);
        this.coords = {
            long: 0,
            lat: 0,
        };
    }
    
    //Initialize map
    mapInitialize() {
        return new google.maps.Map(document.getElementById("map-canvas"), { 
            center: new google.maps.LatLng(59.9200,10.7500),
            zoom: 13,
            styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#e3e3e3"}]},{"featureType":"landscape.natural","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry.fill","stylers":[{"color":"#808285"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"color":"#cccccc"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"transit.station.airport","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"transit.station.airport","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#FFFFFF"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]}],
            disableDefaultUI:true,
        });
    }

    //Use geolocation to update when the device changes postion
    listen() {
        return navigator.geolocation.watchPosition(this.success.bind(this), this.error.bind(this), { enableHighAccuracy: true }); 
    }

    // Device is moving
    success(position) {
        // Center map at position
        this.map.setCenter(new google.maps.LatLng(position.coords.latitude,position.coords.longitude));

        // Save position for later use
        this.coords.lat = position.coords.latitude;
        this.coords.long = position.coords.longitude;

        // Emit changes to server
        if(localUser) {
            localUser.update(this.coords.lat, this.coords.long);
        }
    }

    error() {
        // no geolocation
        alert("The current position could not be found!");
    }
}