import React, { useEffect, useState } from "react";
import "./App.css";
import Grid from './components/grid'


function App() {

  const [gridArray, setgridArray] = useState([])
  const [level, setlevel] = useState(4)
  const [flag, setflag] = useState(false)
  const [timeLimit, settimeLimit] = useState(30)
  const [timeString, settimeString] = useState('')
  const [timer, settimer] = useState(null)





  useEffect(() => {
    let num = level;
    let num1 = ((num * num) / 2);
    let numArr = new Array(num1).fill(null).map((i, k) => k + 1);
    let dupArr = [];

    function getRandomNum(arr) {
      var y = Math.floor(Math.random() * arr.length);
      let x = numArr[y];
      if (dupArr.indexOf(x) == -1) {
        dupArr.push(x);
        return x
      } else if (dupArr.indexOf(x) != -1 && numArr.indexOf(x) != -1) {
        let index = numArr.findIndex((a) => a == x)
        numArr.splice(index, 1);
        return x
      } else {
        getRandomNum(numArr)
      }
    }
    const matrix = new Array(num).fill(null).map(() => new Array(num).fill(null).map((i) => getRandomNum(numArr)));
    // console.log('duparr',dupArr)
    // console.log('numarr',numArr)
    setgridArray(matrix)
    startTimer()
  }, [level, flag])


  const startTimer = ()=>{
    if(timer){
      clearInterval(timer)
      settimer(null)
    }
    let date = new Date()
    date.setSeconds(date.getSeconds()+timeLimit)

    var countDownDate = new Date(date).getTime();

    function timerFunction (){
      var now = new Date().getTime();
      var distance = countDownDate - now;
      
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
      settimeString(`${days ? days+" : " : ''} ${hours ? hours+" : " : ''} ${minutes} : ${seconds} `)
        
      if (distance < 0) {
        clearInterval(x);
        onGameOver(false)
      }
    }

    var x = setInterval(timerFunction , 1000);
    settimer(x)
    // clearInterval(x);
    // onGameOver(false)
  }


  const reset = ()=>{
    setflag(flag => !flag)
    resetTimer()
  }

  const onGameOver = (winnerFlag) =>{
    let statement = winnerFlag == true ? `Congrats!! You won the game, your score is ${2}` : `Sorry time is over!`
    statement += '\nWould you like to play again ?';

    if(window.confirm(statement)){
      console.log('yes')
      reset()
    }else{
      console.log('no')
    }
  }

  const resetTimer = ()=>{

    settimeString('')
    startTimer()
  }


  return (
    <div className="App">
      <header role="heading" aria-level={1} className="App-header">
        <p>
          Emerson React Coding Challenge
        </p>
      </header>

      <div style={{ width: '40%', margin: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ marginRight: '10px' }}>
            <select name="difficulty" id="difficulty" value={level}
            onChange={(e)=>{
              let value = parseInt(e.target.value);
              setlevel(parseInt(value))
              switch (value) {
                case 2:
                  settimeLimit(10)
                  break;
                case 4:
                  settimeLimit(30)
                  break;
                case 6:
                  settimeLimit(50)
                  break;
                case 8:
                  settimeLimit(70)
                  break;
                case 10:
                  settimeLimit(90);
                  break;
                default:
                  settimeLimit(30)
                  break;
              }
              resetTimer()
            }}>
              <option value={2}>Super Easy (2X2)</option>
              <option value={4}>Easy (4X4)</option>
              <option value={6}>Medium (6X6)</option>
              <option value={8}>Difficult (8X8)</option>
              <option value={10}>Hard (10X10)</option>
            </select>
          </div>
          <h1 style={{ marginBottom: '20px' }}>{timeString}</h1>
          <div style={{ marginLeft: '10px' }}>
            <button onClick={reset}>Restart</button>
          </div>
        </div>
        <Grid gridArray={gridArray} flag={flag} level={level} onGameOver={onGameOver}/>
      </div>
    </div>
  );
}

export default App;
