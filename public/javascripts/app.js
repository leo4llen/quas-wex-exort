/* HOW CAN MIRRORS BE REAL IF OUR EYES AREN'T REAL */


$(document).ready(function(){

  // Initializing some vars
  let gameStarted = false
  let orbs
  let currentSpell
  let countdown = 2000
  let timer
  // Hide game row initially
  $('#game-row').css('display' , 'none')


  // Main keypress listener
  $(window).on('keypress' , (e) => {
    if(!gameStarted){
      if(e.which === 32){
        orbs  =   ['quas' , 'wex' , 'exort']
        $('#pre-game-row').css('display', 'none')
        $('#game-row').css('display', 'block')
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
    gameStarted = true;
    setOrbs (orbs)
    timer = window.setTimeout(stopGame , countdown)
    spellify ()
  }

  function stopGame(){
    $('#pre-game-row').css('display', 'block')
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
      compareSpells (currentSpell.combination , invokedOrbs) ?  resetSpell () : console.log('Nope')

    }
  }



  function resetSpell () {
    countdown -= 50
    window.clearTimeout(timer)
    timer = window.setTimeout(stopGame , countdown)
    currentSpell = generateSpell ()
    displaySpell ()
    console.log(currentSpell)
  }

  function displaySpell () {
    $('#spell-div img').attr('src' , `/images/${currentSpell.name.toLowerCase().replace(/\s/ , '_')}.png`)
    $('#spell-div .caption').html(currentSpell.name)
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
