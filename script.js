
$(document).ready(
  function() {
    let correctArr = []
    let playerArr = []
    let truthyflag = true
    let strickFlag = false
    let strictMode = false
    let stepCounter = correctArr.length
    const sound0 = new Audio ('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3')
    const sound1 = new Audio ('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3')
    const sound2 = new Audio ('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3')
    const sound3 = new Audio ('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')

    $('#checkbox').click(function(){
      if(strictMode === false){
        strictMode = true
        stop()
        $('#strictText').html('Strict Mode: on')
      }else {
        strictMode = false
        stop()
        $('#strictText').html('Strict Mode: off')
      }
    })

    $('#start').click(function(){
      if (correctArr.length === 0) {
      onStartPress()
    } else {
      displayColor()
    }
    })

    $('#stop').click(function() {
      stop()
    })

    function stop() {
      correctArr = []
      playerArr = []
      stepCounter = correctArr.length
      $('#level').val(stepCounter)
    }

    function onStartPress() {
      colorPicker()
      displayColor()

    }
    //Picks random number to be pushed into correctArr
    function colorPicker() {
      let randomnumber = Math.floor(Math.random() * 4)
      correctArr.push(randomnumber)
      stepCounter = correctArr.length
      $('#level').val(stepCounter)
    }

    //Array where each color is an object within an array.
    const COLORS = [
      { color: 'yellow', className: 'warning '},
      { color: 'blue', className: 'info '},
      { color: 'red', className: 'danger '},
      { color: 'green', className: 'success '},
    ]

    COLORS.forEach( ({ color }, index ) => {
      $( `#${color}` ).click( () => {
        if (playerArr.length < correctArr.length) {
          playerArr.push( index )
        }
        if (playerArr.length === correctArr.length) {
          checker()
          if (truthyflag === true && strictMode === false) {
            playerArr = []
            setTimeout(function(){onStartPress()}, 1000)
          }
          else if (truthyflag === false && strictMode === true) {
            truthyflag = true
            stop()
            setTimeout(function(){onStartPress()}, 1000)
          }
          else if (truthyflag === true && strictMode === true ) {
            playerArr = []
            setTimeout(function(){onStartPress()}, 1000)
          }
          else {
            truthyflag = true
            playerArr = []
            setTimeout(function(){displayColor()}, 1000)
          }
        }
      })
    })

    function displayColor() {
      timedDisplayColor( correctArr.map( color => color ) )
    }

    function timedDisplayColor( colors ) {
      const { color, className} = COLORS[ colors[ 0 ]]
      $( `#${color}` ).removeClass( `btn-${className}` ).trigger('onclick')
      setTimeout( () => {
        alternateTimedDisplayColor( colors )
      }, 500 )
    }

    function alternateTimedDisplayColor( colors ) {
      const { color, className } = COLORS[ colors.shift() ]
      $( `#${color}` ).addClass( `btn-${className}` )
      if( colors.length > 0 ) {
        setTimeout( () => {
          timedDisplayColor( colors )
        }, 500 )
      }
    }

    function checker () {
      for (let i = 0; i < playerArr.length; i++) {
        if (playerArr[i] !== correctArr[i]) {
          truthyflag = false
        }
      }
    }

  })
