'use strict'
var gShootInterval;
var gSuperAttackInterval;

var gIsBlowNegs;

var gSuperAttackCount;

var gHero;

function createHero(board) {
    gHero = {
        pos: {
            i: 13,
            j: 7
        },
        isShoot: false
    }
    board[gHero.pos.i][gHero.pos.j].gameObject = HERO
}
function moveTo(i, j) {
    console.log('move');
    if (!gGame.isOn) return
    var targetCell = gBoard[i][j]
    if (!targetCell) return

    const iAbsDiff = Math.abs(i - gHero.pos.i)
    const jAbsDiff = Math.abs(j - gHero.pos.j)

    if (jAbsDiff === 1 && iAbsDiff === 0) {

        updateCell(gHero.pos, '')

        gHero.pos.i = i
        gHero.pos.j = j

        updateCell(gHero.pos, HERO)

    }
}
function onHandleKey(event) {

    const i = gHero.pos.i
    const j = gHero.pos.j

    switch (event.key) {
        case 'ArrowLeft':
            moveTo(i, j - 1)
            console.log('left');
            break
        case 'ArrowRight':
            moveTo(i, j + 1)
            console.log('rigth');
            break
        case ' ':
            shoot({ i, j })
            console.log('shoot!');
            break
        case 'n':
            shoot({ i, j })
            gIsBlowNegs = true
            console.log('blow negs');
            break
        case 'x':
            shootSuperAttack({ i, j })
            console.log('super attacks');
            break;
    }

}

function blinkLazer(pos) {
    if (pos.i <= 2) {
        clearInterval(gShootInterval)
        return
    }

    var laserPos = { i: pos.i - 1, j: pos.j }
    console.log(laserPos);

    if (gBoard[laserPos.i][laserPos.j].gameObject === ALIEN) {
        if (gIsBlowNegs) {
            blowUpNegs(laserPos)
        }
        gGame.alienCount--
        if (gGame.alienCount === 0) {
            isWin()
            return
        }
        updateScore(10)
        updateCell(laserPos)
        console.log(laserPos);
        clearInterval(gShootInterval)
        return
    }
    updateCell(laserPos, LASER)
    console.log(pos);

    setTimeout(() => {
        updateCell(laserPos, '')
        console.log(laserPos);
    }, LASER_SPEED)

    pos.i--

}

function shoot(pos) {
    gShootInterval = setInterval(blinkLazer, 1500, pos)

}
function shootSuperAttack(pos) {

    if (gSuperAttackCount === 0) return
    gSuperAttackCount--
    gSuperAttackInterval = setInterval(superAttack, 800, pos)
   // document.querySelector('p1 span').innerHTML = gSuperAttackCount
}
function superAttack(pos) {
    if (pos.i <= 0) {
        clearInterval(gSuperAttackInterval)
        return
    }
    var laserPos = { i: pos.i - 1, j: pos.j }
    updateCell(laserPos, SUPER_ATTACK)
    setTimeout(() => {
        updateCell(laserPos, '')
        //console.log(laserPos);
    }, 100)
    pos.i--
}

function blowUpNegs(pos) {
    var negsCount = 0
    for (var i = pos.i - 1; i <= pos.i + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            if (i === pos.i && j === pos.j) continue
            if (j < 0 || j >= gBoard[i].length) continue
            var currCell = gBoard[i][j]

            if (currCell.gameObject === ALIEN) {
                var alienPos = { i, j }
                updateCell(alienPos, '')
                gGame.alienCount--
                negsCount++
            }
        }
    }
    updateScore(10 * negsCount)
}

function getEmptyPos() {
    const emptyPoss = []
    for (var i = 2; i < 5; i++) {
        for (var j = 3; j < 11; j++) {
            var cell = gBoard[i][j]
            if (cell.gameObject !== ALIEN) {
                emptyPoss.push({ i, j })
            }
        }
    } if (emptyPos.length === 0) return null
    const randIdx = getRandomInt(0, emptyPoss.length)
    const emptyPos = emptyPoss[randIdx]
    return emptyPos
}

// addCandy()
// function addCandy() {
//     var pos = getEmptyPos()
//     console.log(pos);
//     if (!pos) return
//     updateCell(pos, SPACE_CANDY)
// }