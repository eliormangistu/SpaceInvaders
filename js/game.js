'use strict'

const BOARD_SIZE = 14
// const ALIEN_ROW_LENGTH = 8
// const ALIEN_ROW_COUNT = 3
const LASER_SPEED = 80
const ALIEN = '👽'
const LASER = '🔥'
const HERO = '♆'
const SUPER_ATTACK = '⚡'
const SPACE_CANDY = '🍕'
const ROCK = '🌑'

var EMPTY = ' '
var SKY = 'SKY'
var gBoard;

var gCandyInterval;
var gAlienPosInterval;
const gGame = {
    isOn: false,
    score: 0,
    alienCount: 24
}

function inIt() {
    document.querySelector('.modal').classList.remove('hidden')
    document.querySelector('button').classList.remove('hidden')
    document.querySelector('.win').classList.add('hidden')
    document.querySelector('p1').classList.add('hidden')
}
function startGame() {
    playSound('ארתור - שיר פתיחה')
    gGame.isOn = true;
    gIsBlowNegs = false;

    gGame.score = 0
    gSuperAttackCount = 3;

    gBoard = buildBoard()
    console.log(gBoard)
    createAliens(gBoard)
    createHero(gBoard)
    renderBoard(gBoard)
    console.log(gAliens);

    document.querySelector('.modal').classList.add('hidden')
    document.querySelector('button').classList.add('hidden')
    document.querySelector('p1').classList.remove('hidden')
    document.querySelector('p1 span').innerText = gSuperAttackCount

    gAlienPosInterval = setInterval(getAlienPos, 10000)

}

function buildBoard() {
    var board = []
    for (var i = 0; i < BOARD_SIZE; i++) {
        board.push([])
        for (var j = 0; j < BOARD_SIZE; j++) {
            board[i][j] = createCell()
        }
    }
    return board
}
function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>\n`
        for (var j = 0; j < board[i].length; j++) {
            const currCell = board[i][j]

            //var cellClass = getClassName({ i: i, j: j })
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="cell ${className}"  onclick="moveTo(${i},${j})"data-i="${i}" data-j="${j}">\n`

            if (currCell.gameObject === HERO) {
                strHTML += HERO
            } if (currCell.gameObject === ALIEN) {
                strHTML += ALIEN
            } else if (currCell.gameObject === EMPTY) {
                strHTML += EMPTY
            }

            strHTML += `</td>`
        }
        strHTML += `</tr>\n`
    }
    const elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
    console.table(board)
}

function updateCell(pos, gameObject = null) {
    console.log(pos, gameObject);
    gBoard[pos.i][pos.j].gameObject = gameObject
    console.log(gBoard[pos.i][pos.j]);
    var elCell = getElCell(pos)
    console.log(elCell);
    elCell.innerHTML = gameObject || ''
}

function updateScore(diff) {
    gGame.score += diff

    document.querySelector('p span').innerText = gGame.score

}
function gameOver() {
    gGame.isOn = false
    document.querySelector('button').innerText = 'Restart'
    document.querySelector('button').classList.remove('hidden')
    document.querySelector('p1').classList.add('hidden')
}
function isWin() {
    gGame.isOn = false
    document.querySelector('.win').classList.remove('hidden')
    document.querySelector('button').innerText = 'Restart'
    document.querySelector('button').classList.remove('hidden')

}
