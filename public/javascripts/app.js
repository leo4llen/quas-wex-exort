/* HOW CAN MIRRORS BE REAL IF OUR EYES AREN'T REAL */


$(document).ready(function(){

  // Initializing some vars
  let gameStarted = false
  let orbs
  let countdown = 2000
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
    let timer = window.setTimeout(stopGame , countdown)
    if(invokedOrbs === undefined){
      let currentSpell = generateSpell ()
    }
    else {
      window.clearTimeout(timer)
      console.log('timeout cleared')
    }
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
    let spell
    switch(Math.floor(Math.random() * 10) + 1){
      case 1:
        spell = 'cold_snap'
        break
      case 2:
        spell = 'ghost_walk'
        break
      case 3:
       spell = 'ice_wall'
       break
      case 4:
        spell = 'forge_spirits'
        break
      case 5:
        spell = 'tornado'
        break
      case 6:
        spell = 'chaos_meteor'
        break
      case 7:
        spell = 'defeaning_blast'
        break
      case 8:
        spell = 'alacrity'
        break
      case 9:
        spell = 'emp'
        break
      case 10:
        spell = 'sun_strike'
        break
    }
    return spell
  }

})
