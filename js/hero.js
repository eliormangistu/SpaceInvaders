'use strict'
const LASER_SPEED = 80

var gShootInterval;
var gSuperAttackInterval;

var gIsBlowNegs;
var gIsHeroShield;
var gIsShoot = false
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

    if (!gGame.isOn) return

    var targetCell = gBoard[i][j]
    if (!targetCell) return

    const iAbsDiff = Math.abs(i - gHero.pos.i)
    const jAbsDiff = Math.abs(j - gHero.pos.j)

    if (jAbsDiff === 1 && iAbsDiff === 0) {
        if (targetCell.gameObject === SPACE_CANDY) {
            updateCell(gHero.pos, HERO)
            updateScore(50)
        }

        updateCell(gHero.pos)

        gHero.pos.i = i
        gHero.pos.j = j

        updateCell(gHero.pos, HERO)

        var gHeroShield = (gIsHeroShield) ? HERO_SHIELD : HERO
        updateCell(gHero.pos, gHeroShield)
    }
}

function onHandleKey(event) {

    const i = gHero.pos.i
    const j = gHero.pos.j

    switch (event.key) {
        case 'ArrowLeft':
            moveTo(i, j - 1)
            break
        case 'ArrowRight':
            moveTo(i, j + 1)
            break
        case ' ':
            shoot({ i, j })
            break
        case 'n':
            gIsBlowNegs = true
            shoot({ i, j })
            break
        case 'x':
            shootSuperAttack({ i, j })
            break;
        case 'z':
            getShield(gHero.pos)
            break
    }
}

function blinkLazer(pos) {
    if (!gIsShoot) return
    if (pos.i <= 0) {
        clearInterval(gShootInterval)
        return
    }
    var laserPos = { i: pos.i - 1, j: pos.j }
    if (gBoard[laserPos.i][laserPos.j].gameObject === ALIEN) {
        if (gIsBlowNegs) {
            blowUpNegs(laserPos)
            gIsShoot = false
            setTimeout(() => {
                gIsShoot = true
                gIsBlowNegs = false
            }, 1000)
        }
        handleAlienHit(laserPos)
        clearInterval(gShootInterval)
        return
    } if (gBoard[laserPos.i][laserPos.j].gameObject === BUNKER) {
        updateCell(laserPos, BUNKER)
        return
    }
    updateCell(laserPos, LASER)
    gIsShoot = false
    setTimeout(() => {
        gIsShoot = true
        updateCell(laserPos)
    }, LASER_SPEED)
    pos.i--
}
function shoot(pos) {
    if (!gIsShoot) return
    playSound('lazer')
    gShootInterval = setInterval(blinkLazer, 100, pos)
}
function shootSuperAttack(pos) {
    if (!gIsShoot) return
    playSound('super')
    if (gSuperAttackCount === 0) return
    gSuperAttackCount--
    gSuperAttackInterval = setInterval(superAttack, 20, pos)
}
function superAttack(pos) {
    if (!gIsShoot) return
    if (pos.i <= 0) {
        clearInterval(gSuperAttackInterval)
        return
    }
    var laserPos = { i: pos.i - 1, j: pos.j }
    if (gBoard[laserPos.i][laserPos.j].gameObject === BUNKER) {
        clearInterval(gSuperAttackInterval)
        return
    } else if (gBoard[laserPos.i][laserPos.j].gameObject === ALIEN) {
        handleAlienHit(laserPos)
        clearInterval(gSuperAttackInterval)
        return
    }
    updateCell(laserPos, SUPER_ATTACK)
    gIsShoot = false
    setTimeout(() => {
        gIsShoot = true
        updateCell(laserPos)
    }, SUPER_ATTACK_SPEED)
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
                updateCell(alienPos)
                gGame.alienCount--
                negsCount++
            }
        }
    }
    updateScore(10 * negsCount)
}
function getShield(pos) {
    gIsHeroShield = true
    setTimeout(() => {
        updateCell(pos, HERO_SHIELD)
        gIsHeroShield = false
    }, 5000)
}

