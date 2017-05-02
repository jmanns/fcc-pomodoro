;(function () {
  var sessionTimeMinutes = 25;
  var breakTimeMinutes = 5;
  var timer = document.querySelector('.time')
  var sessionTimeEl = document.querySelector('.session-time')
  var breakTimeEl = document.querySelector('.break-time')
  var startButton = document.querySelector('.start-btn')
  var stopButton = document.querySelector('.stop-btn')
  var heading = document.querySelector('h1')
  var inProgress = false;
  var sessionInterval, breakInterval

  // session
  document.querySelector('.inc-s').addEventListener('click', incrementSession)
  document.querySelector('.dec-s').addEventListener('click', decrementSession)

  function incrementSession () {
    if (!inProgress) {
      const newSessionTime = parseInt(sessionTimeEl.innerText, 10) + 1
      sessionTimeMinutes = newSessionTime
      sessionTimeEl.innerText = newSessionTime
      updateTimer() 
    }
  }

  function decrementSession () {
    if (!inProgress) {
      const newSessionTime = parseInt(sessionTimeEl.innerText, 10) - 1
      if (newSessionTime > 0) {
        sessionTimeMinutes = newSessionTime
        sessionTimeEl.innerText = newSessionTime
        updateTimer() 
      } 
    }
  }

  // break
  document.querySelector('.inc-b').addEventListener('click', incrementBreak)
  document.querySelector('.dec-b').addEventListener('click', decrementBreakTime)

  function incrementBreak () {
    if (!inProgress) {
      const newBreakTime = parseInt(breakTimeEl.innerText, 10) + 1
      if (newBreakTime <= 20) {
        breakTimeEl.innerText = newBreakTime
        breakTimeMinutes = newBreakTime
      } 
    }
  }

  function decrementBreakTime () {
    if (!inProgress) {
      const newBreakTime = parseInt(breakTimeEl.innerText, 10) - 1
      if (newBreakTime >= 1) {
        breakTimeEl.innerText = newBreakTime
        breakTimeMinutes = newBreakTime
      } 
    }
  }
  
  // timer
  startButton.addEventListener('click', function (e) {
    this.style.display = 'none'
    stopButton.style.display = 'inline-block'
    inProgress = true
    heading.innerText = 'Work'
    startSessionTimer()
  })

  function startSessionTimer () {
    let sessionTimeSeconds = sessionTimeMinutes * 60
    sessionInterval = setInterval(function () {
      sessionTimeSeconds -= 1
      if (sessionTimeSeconds >= 0) {
        timer.innerText = formatSeconds(sessionTimeSeconds) 
      } else {
        playBuzzer()
        clearInterval(sessionInterval)
        heading.innerText = 'Break'
        startBreakTimer()
      }
    }, 1000)
  }

  function startBreakTimer () {
    let breakTimeSeconds = breakTimeMinutes * 60
    breakInterval = setInterval(function () {
      breakTimeSeconds -= 1
      if (breakTimeSeconds >= 0) {
        timer.innerText = formatSeconds(breakTimeSeconds) 
      } else {
        playBuzzer()
        clearInterval(breakTimeSeconds)
        updateTimer()
        inProgress = false;
        heading.innerText = 'Pomodoro'
      }
    }, 1000)
  }

  stopButton.addEventListener('click', function (e) {
    this.style.display = 'none'
    startButton.style.display = 'inline-block'
    heading.innerText = 'Pomodoro'
    // end the session
    clearInterval(sessionInterval)
    clearInterval(breakInterval)
    inProgress = false;
    // reset clock
    updateTimer()
  })

  function updateTimer () {
    timer.innerText = formatTime(sessionTimeMinutes)
  }

  function formatTime (minutes) {
    return minutes + ':00'
  }

  function formatSeconds (totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${seconds >= 10 ? seconds : '0' + seconds}`
  }

  function playBuzzer () {
    const audio = document.querySelector('audio')
    audio.play()
  }
})()
