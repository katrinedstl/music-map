import { playSample } from './audio_context.js';

let selectedColor, selectedSound;

export function getInfo() {
	return [selectedColor, selectedSound];
}

function getColor() {
	var activeElements = document.getElementsByClassName("active");

	if (activeElements.length > 0) {
		activeElements[0].classList.remove("active");
	}

	this.classList.add("active");

	selectedColor = this.getAttribute("hex");
}

function getSound() {
	var activeElements = document.getElementsByClassName("selected");

	if (activeElements.length > 0) {
		activeElements[0].classList.remove("selected");
	}

	this.classList.add("selected");

	selectedSound = this.classList[1];

	playSample(selectedSound);
}

function setListener(nameOfClass, classFunction) {
	let variables = document.getElementsByClassName(nameOfClass);

	Array.from(variables).map(function(a) {
		a.addEventListener("click", classFunction);
	})	
}

export function setListeners() {
	setListener("color", getColor);
	setListener("sound", getSound);
}