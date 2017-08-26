/* HOW CAN MIRRORS BE REAL IF OUR EYES AREN'T REAL */


$(document).ready(function(){

  // Initializing some vars
  let gameStarted = false

  let orbs  =   ['/images/quas.png' , '/images/wex.png' , '/images/exort.png']


  // check state initially
  $('game-row').css('display' , 'none')

  // Listener for starting up the game
  $(window).on('keypress' , (e) => {
    if(!gameStarted){
      e.which === 32 ? startGame() : console.log(e.which)
    }
    else {
      orbs = changeOrbs (e.key , orbs)
      setOrbs ( orbs )
    }
  })



  function startGame () {
    gameStarted = true;
    $('#pre-game-row').css('display', 'none')
    setOrbs (orbs)
  }

  function setOrbs (arr) {
    $('#game-row ul').html('')
    arr.forEach((v) => {
      $('#game-row ul').append(`<li><img src="${v}" alt="" class="img-circle"></li>`)
    })
  }

  function changeOrbs (key , arr) {
    switch(key.toString().toLowerCase()){
      case 'q':
        arr.push('/images/quas.png')
        arr.shift()
        break
      case 'w':
        arr.push('/images/wex.png')
        arr.shift()
        break
      case 'e':
        arr.push('/images/exort.png')
        arr.shift()
        break
      default:
        console.log('ggwp')
        break;
    }
    return arr
  }

  function generateSpell () {
   return console.log(Math.floor(Math.random() * 10) + 1)
  }

})
