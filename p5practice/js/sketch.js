let canvas;
let xPos = 0;
let yPos = 0;
let easing = 0.1;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style("position", "fixed");
    canvas.style("z-index", "0");
    canvas.style("pointer-events", "none");

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

}

function draw() {
    clear();
    xPos = xPos + ((mouseX - xPos) * easing);
    yPos = yPos + ((mouseY - yPos) * easing);
    drawThing(xPos, yPos);
    // drawThing(mouseX - 50, mouseY + 75);
    //  background(100);

}

function drawThing(_x, _y) {
    strokeWeight(0);
    fill(random(180, 255), random(60, 150), random(140, 255));
    ellipse(_x, _y, 30, 30);
}