'use strict'
var gAliens = []

var gAliensTopRowIdx
var gAliensBottomRowIdx

var gIsAlienFreeze = true

var gAliensInterval;
var gAlienRockInterval

var gAliensRightInterval

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


function moveAliens(gBoard) {
    for (var i = 0; i < gAliens.length; i++) {
        var alien = gAliens[i]
        
        // var alienRight = shiftBoardRight(gBoard, alien.pos.j, alien.pos.j + 1, gAliens[i])
        // setTimeout(() => {
        //     alienRight
        // }, 30)
        //if (gBoard) return
        //console.log(gBoard[alien.pos.i][alien.pos.i].gameObject = ALIEN);

        // var shift = gIsRight ?
        //     
        //     : 

        // var gIsRight = false
        // var getRight = shiftBoardRight(gBoard, alien.pos.j, alien.pos.j + 1, alien)
        // gAliensRightInterval = setInterval(getRight, 500)

        //shiftBoardLeft(gBoard, alien.pos.j, alien.pos.j - 1, alien)
        // shiftBoardRight(gBoard, alien.pos.j, alien.pos.j + 1, alien)
        //shiftBoardDown(gBoard, alien.pos.i, alien.pos.i + 1, alien)

        //shiftBoardDown(gBoard, alien.pos.i, alien.pos.i - 1, alien)
        // if (!gIsRight) {
        //     shiftBoardDown(gBoard, alien.pos.i, alien.pos.i, alien)
        // }
        // shiftBoardDown(gBoard, alien.pos.i, alien.pos.i - 1, gAliens[i])
        //shiftBoardLeft(gBoard, alien.pos.j, alien.pos.j - 1, gAliens[i])
        // var alienDown = shiftBoardDown(gBoard, alien.pos.i, alien.pos.i - 1, gAliens[i])
        // setTimeout(() => {
        //     alienDown
        // }, 50)

        // var alienLeft = shiftBoardLeft(gBoard, alien.pos.j, alien.pos.j - 1, gAliens[i])
        // setTimeout(() => {
        //     alienLeft
        // }, 50)
    }
}

function shiftBoardRight(board, fromJ, toJ, alien) {
    // if (gIsRight) {

    var fromJ = {
        i: alien.pos.i,
        j: alien.pos.j - 1
    }
    console.log('fromj', fromJ);

    updateCell(fromJ)

    //console.log(gBoard[alienPos.i][alienPos.j]);
    // var board = []
    var toJ = {
        i: alien.pos.i,
        j: alien.pos.j++
    }
    console.log('toj.j', toJ.j);
    console.log(gBoard[0].length);
    if (toJ.j === gBoard[0].length) {
        gIsRight = false
        gIsDown = true
        return
    }
    // board.push(toJ)
    setTimeout(() => {
        updateCell(toJ, ALIEN)
        console.log('toj', toJ);
    }, 10)

    //console.log('toj.j', toJ.j);

    //alien.pos.j++
    //}

}

function shiftBoardDown(board, fromI, toI, alien) {
    // if (gIsDown) {
    var fromI = {
        i: alien.pos.i++,
        j: alien.pos.j
    }
    console.log('fromidown', fromI);
    updateCell(fromI)
    // if (fromI.i > 12) return
    //console.log(gBoard[alienPos.i][alienPos.j]);
    // var board = []
    var toI = {
        i: alien.pos.i + 1,
        j: alien.pos.j
    }

    console.log('toidown', toI);
    // board.push(toI)
    setTimeout(() => {
        updateCell(toI, ALIEN)
        console.log('nextalienpos', toI);
    }, 10)

    // fromI.i + 1
    //shiftBoardLeft(board, alien.pos.j, alien.pos.j - 1, alien)
    // }
    //  pos.i++
}

function shiftBoardLeft(board, fromJ, toJ, alien) {
    var fromJ = {
        i: alien.pos.i,
        j: alien.pos.j + 1
    }
    updateCell(fromJ)
    if (fromJ.j > 12) return
    //console.log(gBoard[alienPos.i][alienPos.j]);
    // var board = []
    var toJ = {
        i: alien.pos.i,
        j: alien.pos.j--
    }
    // board.push(toJ)
    if (toJ.j === 0) {
        // gIsRight = false
        // gIsDown = true
        return
    }
    setTimeout(() => {
        updateCell(toJ, ALIEN)
        console.log('nextalienpos', toJ);
    }, 10)
    //gIsDown = false
    // gIsRight = true
}
//}

function getAlienPos() {
    const alienPoss = []
    for (var i = 4; i < 5; i++) {
        for (var j = 3; j < 11; j++) {
            var cell = gBoard[i][j]
            if (cell.gameObject === ALIEN) {
                alienPoss.push({ i, j })
            }
        }
    } if (alienPoss.length === 0) return null
    const randIdx = getRandomInt(0, alienPoss.length)
    const alienPos = alienPoss[randIdx]
    console.log('alien pos: ', alienPos);
    alienShoot(alienPos)
}

function handleAlienHit(pos) {

    if (pos.i > 13) {
        clearInterval(gAlienRockInterval)
        //clearInterval(gAlienPosInterval)
        return
    }
    var rockPos = { i: pos.i + 1, j: pos.j }
    console.log(rockPos);
    //gBoard[rockPos.i][rockPos.j].gameObject = ROCK

    //console.log('gbord rock pos: ', gBoard[rockPos.i + 1][rockPos.j]);

    if (gBoard[rockPos.i + 1][rockPos.j].gameObject === HERO) {
        gameOver()
        updateCell(rockPos)
        clearInterval(gAlienRockInterval)
        clearInterval(gAlienPosInterval)
        return
    }

    updateCell(rockPos, ROCK)
    console.log('rockPos: ', rockPos);
    setTimeout(() => {
        updateCell(rockPos)
        console.log('rockpos', rockPos);
    }, 50)

    pos.i++
}
function alienShoot(pos) {
    gAlienRockInterval = setInterval(handleAlienHit, 150, pos)
}
