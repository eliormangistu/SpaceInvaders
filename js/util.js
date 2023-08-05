
function createCell(gameObject = null) {
    return {
        type: SKY,
        gameObject: gameObject
    }
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
function getElCell(pos) {
    return document.querySelector(`[data-i='${pos.i}'][data-j='${pos.j}']`)
}
function playSound(sound) {
    var sound = new Audio(`${sound}.mp3`);
    sound.play();
}