'use strict'
const ALIEN_SPEED = 500
var gIsAlienFreeze = true
var gIntervalAliens;
var gAlienRockInterval;

var bunkerHitCount = 2;

function createAliens(board) {
    var gAliens = []
    for (var i = 0; i < ALIEN_ROW_COUNT; i++) {
        for (var j = 2; j < ALIEN_ROW_LENGTH + 2; j++) {

            const alien = {
                pos: {
                    i: i,
                    j: j,
                },
                isShoot: false
            }
            board[alien.pos.i][alien.pos.j].gameObject = ALIEN
            gAliens.push(alien)
        }
    }
}
function handleAlienHit(pos) {
    gGame.alienCount--
    updateScore(10)
    updateCell(pos)
    if (gGame.alienCount === 0) isWin()
}
// function getAlienPos() {
//     const alienPoss = []
//     for (var i = 0; i < gBoard.length; i++) {
//         for (var j = 0; j < gBoard[i].length; j++) {
//             var cell = gBoard[i][j]
//             if (cell.gameObject === ALIEN) {
//                 alienPoss.push({ i, j })
//             }
//         }
//     } if (alienPoss.length === 0) return null
//     const randIdx = getRandomInt(0, alienPoss.length)
//     const alienPos = alienPoss[randIdx]
//     //alienShoot(alienPos)
//     return alienPos
//     // aliensRocks(alienPos)
// }
// function aliensRocks(alienPos) {
//     //console.log('alienpos', alienPos);
//     var alienPos = getAlienPos()
//     if (alienPos === null) return
//     if (gBoard[alienPos.i + 1][alienPos.j].gameObject === ALIEN) return
//     var rockPos = {
//         i: alienPos.i + 1,
//         j: alienPos.j
//     }
//     console.log('rockpos', rockPos);
//     //if (gBoard[rockPos.i][rockPos.j].gameObject === ALIEN) return
//     // if (rockPos.i > gBoard.length) return
//     // setInterval(moveRocks,100)
//     updateCell(rockPos, ROCK)

//     setTimeout(() => {
//         updateCell(rockPos.i)
//     }, 300)

//     //  rockPos = {
//     //     i: alienPos.i + 1,
//     //     j: alienPos.j
//     // }
//     alienPos.i + 1
//     console.log('i++', alienPos.i + 1);
//     // alienShoot(rockPosxn )
// }

// function alienShoot(rockPos) {
//     gAlienRockInterval = setInterval(aliensRocks, 100, rockPos)


//     //gAlienRockInterval = setInterval(aliensRocks, 300, pos)
// }
// function handleRockHit(pos) {
//     playSound('hit')
//     gGame.lives--
//     updateCell(pos)
//     innerText('p1 span', gGame.lives)
//     if (gGame.lives === 0) {
//         gameOver()
//         clearInterval(gAlienRockInterval)
//         clearInterval(gAlienPosInterval)
//     }
// }

function moveAliens(board) {
    if (!gGame.isOn) return
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var cell = board[i][j]
            if (cell.gameObject === ALIEN) {
                var alien = { i, j }
                if (gGame.alienCount === 0) {
                    isWin()
                    clearInterval(gAlienPosInterval)
                    clearInterval(gCandyInterval)
                }
                shiftBoardDown(board, alien.i, alien)
            }
        }

    }

}

function shiftBoardDown(board, fromI, alien) {
    if (fromI === board.length - 2) {
        clearInterval(gIntervalAliens)
        gameOver()
        return
    }
    updateCell({ i: fromI, j: alien.j })
    var toI = {
        i: fromI + 1,
        j: alien.j
    }
    setTimeout(() => {
        updateCell(toI, ALIEN)
    }, 10)
}






function shiftBoardRight(board, fromJ, alien) {

    // if (fromJ === board[0].length - 1) {
    //     shiftBoardDown(board, alien.i, alien)
    //     clearInterval(gIntervalAliens)
    //     gIntervalAliens = setInterval(() => {
    //         if (!gGame.isOn) return
    //         shiftBoardLeft(board, alien.j, alien)
    //     }, ALIEN_SPEED)
    // }
    updateCell({ i: alien.i, j: fromJ })
    var toJ = {
        i: alien.i,
        j: fromJ + 1
    }
    console.log(toJ);
    setTimeout(() => {
        updateCell(toJ, ALIEN)
    }, 10)

}

function shiftBoardLeft(board, fromJ, alien) {

    // if (fromJ === 0) {
    //     shiftBoardDown(board, alien.i, alien)
    //     clearInterval(gIntervalAliens)
    //     gIntervalAliens = setInterval(() => {
    //         if (!gGame.isOn) return
    //         shiftBoardRight(board, alien.j, alien)
    //     }, ALIEN_SPEED)
    // }
    updateCell({ i: alien.i, j: fromJ })
    var toJ = {
        i: alien.i,
        j: fromJ - 1
    }
    setTimeout(() => {
        updateCell(toJ, ALIEN)
    }, 10)

}
