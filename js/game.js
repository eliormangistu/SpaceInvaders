'use strict'

const BOARD_SIZE = 14
const ALIEN_ROW_LENGTH = 8
const ALIEN_ROW_COUNT = 3

const SUPER_ATTACK_SPEED = 30

const ALIEN = '👽'
const LASER = '🔥'
const HERO = '👸🏾'
const SUPER_ATTACK = '⚡'
const SPACE_CANDY = '🍕'
const ROCK = '🌑'
const HERO_SHIELD = '🤖'
const BUNKER = '🌈'
var EMPTY = ' '
var SKY = 'SKY'
var gBoard;

var gCandyInterval;
var gAlienPosInterval;

const gGame = {
    isOn: false,
    score: 0,
    alienCount: 24,
    // lives: 3
}
var sound = new Audio('ארתור - שיר פתיחה.mp3')

function inIt() {
    removeHidden('button')

    addHidden('.win')
    addHidden('p')
    //addHidden('p1')
}
function startGame() {
    gIsShoot = true
    gIsBlowNegs = false;
    gIsHeroShield = false;
    gGame.isOn = true;
    gGame.score = 0;
    // gGame.lives = 3;
    gSuperAttackCount = 3;

    gBoard = buildBoard()
    createAliens(gBoard)
    createHero(gBoard)
    renderBoard(gBoard)
    //aliensRocks()
    addHidden('.modal')
    addHidden('button')
    addHidden('.win')
    
    removeHidden('p')
    //removeHidden('p1')
    
    innerText('p span', 0)
    innerText('button', 'Restart')
    gIntervalAliens = setInterval(moveAliens, 3000, gBoard)
    gCandyInterval = setInterval(addCandy, 10000, getEmptyPos(gBoard))
    //innerText('p1 span', gGame.lives)
    //gAlienPosInterval = setInterval(getAlienPos, 5000,gBoard)
}

function buildBoard(board) {
    var board = []
    for (var i = 0; i < BOARD_SIZE; i++) {
        board.push([])
        for (var j = 0; j < BOARD_SIZE; j++) {
            board[i][j] = createCell()
        }
    }
    board[12][2].gameObject = BUNKER
    board[12][10].gameObject = BUNKER

    return board
}
function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>\n`
        for (var j = 0; j < board[i].length; j++) {
            const currCell = board[i][j]

            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="cell ${className}"  onclick="moveTo(${i},${j})"data-i="${i}" data-j="${j}">\n`

            if (currCell.gameObject === HERO) {
                strHTML += HERO
            } if (currCell.gameObject === ALIEN) {
                strHTML += ALIEN
            } if (currCell.gameObject === BUNKER) {
                strHTML += BUNKER
            } if (currCell.gameObject === HERO_SHIELD) {
                strHTML += HERO_SHIELD
            } if (currCell.gameObject === ROCK) {
                strHTML += ROCK
            } else if (currCell.gameObject === EMPTY) {
                strHTML += EMPTY
            }

            strHTML += `</td>`
        }
        strHTML += `</tr>\n`
    }
    const elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}

function updateCell(pos, gameObject = null) {
    gBoard[pos.i][pos.j].gameObject = gameObject
    var elCell = getElCell(pos)
    elCell.innerHTML = gameObject || ''
}

function updateScore(diff) {
    gGame.score += diff
    innerText('p span', gGame.score)
}

function getEmptyPos() {
    const emptyPoss = []
    for (var j = 0; j <= 13; j++) {
        var cell = gBoard[13][j]
        if (cell.gameObject !== HERO) {
            emptyPoss.push({ i: 13, j: j })
        }
    } if (emptyPoss.length === 0) return null
    const randIdx = getRandomInt(0, emptyPoss.length)
    const emptyPos = emptyPoss[randIdx]
    return emptyPos
}

function addCandy() {
    var pos = getEmptyPos()
    if (gBoard[pos.i][pos.j].gameObject === HERO) return
    updateCell(pos, SPACE_CANDY)
    setTimeout(() => {
        updateCell(pos)
    }, 5000)
}
function gameOver() {
    gGame.isOn = false
    gIsShoot = false
    gIsHeroShield = false
    clearInterval(gCandyInterval)
    clearInterval(gIntervalAliens)
    innerText('button', 'Resrart')
    removeHidden('button')
    addHidden('p')
    //addHidden('p1')
}
function isWin() {
    gGame.isOn = false
    gIsShoot = false
    gIsHeroShield = false
    clearInterval(gCandyInterval)
    clearInterval(gIntervalAliens)
    removeHidden('.win')
    removeHidden('button')
    innerText('button', 'Resrart')
}

function addHidden(htmlName) {
    document.querySelector(`${htmlName}`).classList.add('hidden')
}
function removeHidden(htmlName) {
    document.querySelector(`${htmlName}`).classList.remove('hidden')
}
function innerText(htmlName, txt) {
    document.querySelector(`${htmlName}`).innerText = txt
}