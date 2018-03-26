/* TYPER */
const TYPER = function () {
  if (TYPER.instance_) {
    return TYPER.instance_
  }
  TYPER.instance_ = this

  this.WIDTH = window.innerWidth
  this.HEIGHT = window.innerHeight
  this.canvas = null
  this.ctx = null

  this.words = []
  this.word = null
  this.wordMinLength = 5
  this.guessedWords = 0
  this.score = 0
  this.scoretime = 2500

  this.init()
}

let name
window.TYPER = TYPER

TYPER.prototype = {
  init: function () {
    this.canvas = document.getElementsByTagName('canvas')[0]
    this.ctx = this.canvas.getContext('2d')

    this.canvas.style.width = this.WIDTH + 'px'
    this.canvas.style.height = this.HEIGHT + 'px'

    this.canvas.width = this.WIDTH * 2
    this.canvas.height = this.HEIGHT * 2

    this.loadWords()
  },

  loadWords: function () {
    const xmlhttp = new XMLHttpRequest()

    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4 && (xmlhttp.status === 200 || xmlhttp.status === 0)) {
        const response = xmlhttp.responseText
        const wordsFromFile = response.replace(/\r\n/g, '\n').split('\n')
        console.log(234)
        typer.words = structureArrayByWordLength(wordsFromFile)

        typer.start()
      }
    }

    xmlhttp.open('GET', './lemmad2013.txt', true)
    xmlhttp.send()
  },

  start: function () {
    this.generateWord()
    this.word.Draw()
    this.timestart = +new Date()
    window.addEventListener('keypress', this.keyPressed.bind(this))
  },

  scoreupdate: function () {
    this.timeend = +new Date()
    let scoretmp = this.timeend - this.timestart
    console.log(scoretmp)
    console.log(this.scoretime)
    if (scoretmp < this.scoretime) {
      this.score += this.scoretime - scoretmp
    }
  },

  generateWord: function () {
    const generatedWordLength = this.wordMinLength + parseInt(this.guessedWords / 5)
    const randomIndex = (Math.random() * (this.words[generatedWordLength].length - 1)).toFixed()
    const wordFromArray = this.words[generatedWordLength][randomIndex]
    console.log(generatedWordLength)
    console.log(this.words)

    this.word = new Word(wordFromArray, this.canvas, this.ctx, this.score)
  },

  gameOver: function () {
    let scores = JSON.parse(localStorage.getItem('leaderboard'))
    scores[10] = [this.score, name]
    scores.sort(sortNumber)
    localStorage.setItem('leaderboard', JSON.stringify(scores))

    let gg = confirm('Game Over!\nScore:' + parseInt(this.score) + '\nWant to try again?')
    if (gg === true) {
      alert("Ha-haa! You can't!\nYou need to start from the beginning and write you name again.\nSuffer :)")
      window.location.href = ''
    } else {
      window.location.href = ''
    }
  },

  keyPressed: function (event) {
    const letter = String.fromCharCode(event.which)

    if (letter === this.word.left.charAt(0)) {
      this.word.removeFirstLetter()

      if (this.word.left.length === 0) {
        this.guessedWords += 1
        this.scoretime += this.guessedWords % 5 === 0 ? 200 : 0
        this.scoreupdate()
        this.generateWord()
        this.timestart = +new Date()
      }
      this.word.Draw()
    } else {
      this.gameOver()
    }
  }
}

/* WORD */
const Word = function (word, canvas, ctx, score) {
  this.word = word
  this.score = score
  this.left = this.word
  this.canvas = canvas
  this.ctx = ctx
}

Word.prototype = {
  Draw: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.ctx.textAlign = 'center'
    this.ctx.font = '140px Courier'
    this.ctx.fillText(this.left, this.canvas.width / 2, this.canvas.height / 2)

    this.ctx.textAlign = 'center'
    this.ctx.font = '140px Courier'
    this.ctx.fillText('score: ' + this.score, this.canvas.width / 4, this.canvas.height / 4)
  },

  removeFirstLetter: function () {
    this.left = this.left.slice(1)
  }
}

/* HELPERS */
function structureArrayByWordLength (words) {
  let tempArray = []

  for (let i = 0; i < words.length; i++) {
    const wordLength = words[i].length
    if (tempArray[wordLength] === undefined)tempArray[wordLength] = []

    tempArray[wordLength].push(words[i])
  }

  return tempArray
}

function checkNameInput () {
  name = document.getElementById('nameText').value
  if (document.getElementById('nameText').value !== '') {
    startGame()
  } else {
    alert('Name field is empty!')
  }
}

function startGame () {
  document.getElementById('gameStartDiv').innerHTML = '<canvas></canvas>'
  switchView('gameMenu')
  switchView('topBar')
  const typer = new TYPER()
  window.typer = typer
}

function sortNumber (a, b) {
  return b[0] - a[0]
}

function scoreboardInit () {
  if (localStorage.getItem('leaderboard') === null) {
    const emptyLeaderboard = [
      [0, '-'],
      [0, '-'],
      [0, '-'],
      [0, '-'],
      [0, '-'],
      [0, '-'],
      [0, '-'],
      [0, '-'],
      [0, '-'],
      [0, '-'],
      [0, '-']
    ]
    localStorage.setItem('leaderboard', JSON.stringify(emptyLeaderboard))
    console.log('empty now')
  }
}

function showScores () {
  let leaderboard = JSON.parse(localStorage.getItem('leaderboard'))
  for (let i = 0; i < 10; i++) {
    document.getElementById(i + 1 + '.').innerHTML = leaderboard[i][1] + ' : ' + leaderboard[i][0]
  }
}

window.onload = function () {
  switchView('topBar')
  scoreboardInit()
  showScores()
}

function switchView (menuType) {
  var x = document.getElementById(menuType)
  if (x.style.display === 'none') {
    x.style.display = 'block'
  } else {
    x.style.display = 'none'
  }
}
