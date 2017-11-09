/* HOW CAN MIRRORS BE REAL IF OUR EYES AREN'T REAL */

$(document).ready(function(){

  // Initializing some vars
  let gameStarted = false
  let orbs
  let currentSpell
  let countdown = 3000
  let timer
  let progressTimer
  let startTime
  // Hide game row initially
  $('#game-row').css('display' , 'none')
  $('#pre-game-row h4').html('')

  // Main keypress listener
  $(window).on('keypress' , (e) => {
    if(!gameStarted){
      if(e.which === 32){
        startTime = Date.now()
        orbs  =   ['quas' , 'wex' , 'exort']
        $('#pre-game-row').css('display', 'none')
        $('#game-row').css('display', 'block')
        countdown = 2000
        startGame()
      }
    }
    else {
      if(e.key.toString().toLowerCase() === 'r'){
        spellify( orbs )
      }
      else{
        orbs = changeOrbs (e.key , orbs)
        setOrbs ( orbs )
      }
    }
  })



  function startGame () {
    console.log(countdown)
    gameStarted = true;
    $('#timer-bar').css('width', '100%')
    $('#timer-bar').addClass('trans')
    progress(countdown,countdown)
    setOrbs (orbs)
    timer = window.setTimeout(stopGame , countdown)
    spellify ()
  }

  function stopGame(){
    let timeLasted = (Date.now() - startTime)/1000
    $('#pre-game-row').css('display', 'block')
    $('#pre-game-row h4').html(`GAME OVER!<br><br> <p class="caption">You lasted ${timeLasted.toString().slice(0,-2)} seconds!<p><br>`)
    $('#game-row').css('display', 'none')
    gameStarted = false
  }

  function setOrbs (arr) {
    $('#game-row ul').html('')
    arr.forEach((v) => {
      $('#game-row ul').append(`<li><img src="/images/${v}.png" alt="" class="img-circle"></li>`)
    })
  }

  function spellify (invokedOrbs) {
    if(invokedOrbs === undefined){
      currentSpell = generateSpell ()
      displaySpell ()
      console.log(currentSpell)
    }
    else {
      compareSpells (currentSpell.combination , invokedOrbs) ?  resetSpell () : reddify()

    }
  }


  function progress(timeleft, timetotal) {
    let progressBarWidth = timeleft * $('#timer-bar').width() / timetotal
    let updateInterval = timetotal * (0.1)
    $('#timer-bar').css("width",progressBarWidth)
    if(timeleft > 0) {
        progressTimer = window.setTimeout(function() {
            progress(timeleft - updateInterval, timetotal);
        }, updateInterval);
    }
  };



  function resetSpell () {
    countdown -= 25
    window.clearTimeout(timer)
    window.clearTimeout(progressTimer)
    greenify()
    $('#timer-bar').removeClass('trans')
    $('#timer-bar').css('width', '100%')
    timer = window.setTimeout(stopGame , countdown)
    currentSpell = generateSpell ()
    displaySpell ()
    progress(countdown, countdown)
    console.log(currentSpell)
    $('#timer-bar').addClass('trans')
  }

  function displaySpell () {
    $('#spell-div img').attr('src' , `/images/${currentSpell.name.toLowerCase().replace(/\s/ , '_')}.png`)
    $('#spell-div .caption').html(currentSpell.name)
  }

  function reddify () {
    $('body').addClass('reddify')
    setTimeout(() => {
      $('body').removeClass('reddify')
    },100)
  }

  function greenify () {
    $('body').addClass('greenify')
    setTimeout(() => {
      $('body').removeClass('greenify')
    },100)
  }

  function compareSpells (generated , invoked) {
    return (generated.length === invoked.length) &&
           (generated.every((element , index) => element === invoked.sort()[index]))
  }

  function changeOrbs (key , arr) {
    switch(key.toString().toLowerCase()){
      case 'q':
        arr.push('quas')
        arr.shift()
        break
      case 'w':
        arr.push('wex')
        arr.shift()
        break
      case 'e':
        arr.push('exort')
        arr.shift()
        break
      default:
        break
    }
    return arr
  }

  function generateSpell () {
    // Spell object
    const spells = {
      '1' : {
        name : 'Cold Snap',
        combination : ['quas' , 'quas' , 'quas']
      },
      '2' : {
        name : 'Ghost Walk',
        combination : ['quas' , 'quas' , 'wex']
      },
      '3' : {
        name : 'Ice Wall',
        combination : ['exort' , 'quas' , 'quas']
      },
      '4' : {
        name : 'Forge Spirits',
        combination : ['exort' , 'exort' , 'quas']
      },
      '5' : {
        name : 'Tornado',
        combination : ['quas' , 'wex' , 'wex']
      },
      '6' : {
        name : 'Chaos Meteor',
        combination : ['exort' , 'exort' , 'wex']
      },
      '7' : {
        name : 'Defeaning Blast',
        combination : ['exort' , 'quas' , 'wex']
      },
      '8' : {
        name : 'Alacrity',
        combination : ['exort' , 'wex' , 'wex']
      },
      '9' : {
        name : 'EMP',
        combination : ['wex' , 'wex' , 'wex']
      },
      '10' : {
        name : 'Sun Strike',
        combination : ['exort' , 'exort' , 'exort']
      }
    }

    let rng = Math.floor(Math.random() * 10) + 1

    let selectedSpell = spells[rng.toString()]

    if(currentSpell) {
      return selectedSpell.name === currentSpell.name ? generateSpell () : selectedSpell
    }
    return selectedSpell

  }

})
