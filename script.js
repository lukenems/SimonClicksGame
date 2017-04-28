// To work on after lunch. colorPicker does not stop.




$(document).ready(
// yellow = 0, blue = 1, red = 2, green = 3
  function() {
    let correctArr = []
    let playerArr = []
    let truthyflag = true
    let stepCounter = correctArr.length

    function colorPicker() {
      let randomnumber = Math.floor(Math.random() * 4)
      correctArr.push(randomnumber)
    }

    function doSetTimeout(i){
      setTimeout(function(){i}, 1000)
    }

    function displayColor() {
      timedDisplayColor( correctArr.map( color => color ) )
    }

    const COLORS = [
      { color: 'yellow', className: 'warning '},
      { color: 'blue', className: 'info '},
      { color: 'red', className: 'danger '},
      { color: 'green', className: 'success '},
    ]

    function timedDisplayColor( colors ) {
      const { color, className } = COLORS[ colors[ 0 ]]

      $( `#${color}` ).removeClass( `btn-${className}` )

      setTimeout( () => {
        alternateTimedDisplayColor( colors )
      }, 300 )
    }

    function alternateTimedDisplayColor( colors ) {
      const { color, className } = COLORS[ colors.shift() ]

      $( `#${color}` ).addClass( `btn-${className}` )

      if( colors.length > 0 ) {
        setTimeout( () => {
          timedDisplayColor( colors )
        }, 300 )
      }
    }

    COLORS.forEach( ({ color }, index ) => {
      $( `#${color}` ).click( () => {
        if (playerArr.length < correctArr.length) {
          playerArr.push( index )
        }
        if (playerArr.length === correctArr.length) {
          checker()
          console.log('playerArr', playerArr);
          if (truthyflag === true) {
            playerArr = []
            onStartPress()
            console.log('playerArr', playerArr);
          } else {
            playerArr = []
            displayColor()
          }
        }
      })
    })

    function checker () {
      for (let i = 0; i < playerArr.length; i++) {
        if (playerArr[i] !== correctArr[i]) {
          truthyflag = false
        }
      }
    }
    // If stuff breaks check this


    function onStartPress() {
      colorPicker()
      displayColor()
      console.log(correctArr);
    }



    $('#start').click(function(){
      onStartPress()
    })
  })
