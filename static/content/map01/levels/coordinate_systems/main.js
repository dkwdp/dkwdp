// simple example code

let sound;

function preload() {
	soundFormats('mp3', 'ogg');
	sound = loadSound('sound.mp3');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(100);
	sound.play();
}

function draw() {
	fill(50, 65, 100);
	circle(mouseX, mouseY, 20);
}
