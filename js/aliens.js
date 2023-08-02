'use strict'
var gAliens = []

var gAliensInterval;
//var gIsAlienFreeze;
var gAlienRockInterval

function createAliens(board) {
    gAliens = []
    for (var i = 2; i < 5; i++) {
        for (var j = 3; j < 11; j++) {

            const alien = {
                pos: {
                    i: i,
                    j: j,
                },
                isShoot: false
            }
            board[alien.pos.i][alien.pos.j].gameObject = ALIEN
            gAliens.push(alien)
            // moveAliens()

        }
    }
}

function getAlienPos() {
    const alienPoss = []
    for (var i = 4; i < 5; i++) {
        for (var j = 3; j < 11; j++) {
            var cell = gBoard[i][j]
            if (cell.gameObject === ALIEN) {
                alienPoss.push({ i, j })
            }
        }
    }
    const randIdx = getRandomInt(0, alienPoss.length)
    const alienPos = alienPoss[randIdx]
    console.log('alien pos: ', alienPos);
    alienShoot(alienPos)
}

function alienRocks(pos) {

    if (pos.i > 13) {
        clearInterval(gAlienRockInterval)
        clearInterval(gAlienPosInterval)
        return
    }
    var alienPos = { i: pos.i + 1, j: pos.j }
    //console.log(gBoard[alienPos.i][alienPos.j]);
    if (gBoard[alienPos.i][alienPos.j].gameObject === HERO) {
        gameOver()
        updateCell(alienPos, '')
        clearInterval(gAlienRockInterval)
        clearInterval(gAlienPosInterval)
        return
    }
    updateCell(alienPos, ROCK)

    setTimeout(() => {
        updateCell(alienPos, '')
        console.log(alienPos);
    }, 1000)

    pos.i++
}
function alienShoot(pos) {
    gAlienRockInterval = setInterval(alienRocks, 1500, pos)
}
function moveAliens() {
    for (var i = 0; i < gAliens.length; i++) {
        const alien = gAliens[i]
        // console.log(alien)
        // shiftBoardDown()
        // shiftBoardLeft()
        // shiftBoardRight()
    }
}

function shiftBoardRight(board, fromI, toI) {
    console.log('hi');
}
function shiftBoardLeft(board, fromI, toI) {
    console.log('hi');
}
function shiftBoardDown(board, fromI, toI) {
    console.log('hi');
}

