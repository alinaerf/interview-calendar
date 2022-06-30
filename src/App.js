import './App.css';
import {useState, useEffect} from 'react'
import dayjs from 'dayjs'
//import styled from 'styled-components'

function App() {
  const months=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August','September', 'October', 'November', 'December']
  const daysOfWeek=['Monday', 'Tuesday', "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const [days, setDays]=useState([])
  const [clicked,setClicked]=useState(false)
  const [chosenCell, setChosenCell]=useState([])
  var today=dayjs().format('YYYY-MM-DD')
  const [month, setMonth]=useState('')
  const [year, setYear]=useState('')
  const [busyTime, setBusyTime]=useState([])
  const lightBlue='#ebecff'
  
  const displayBusy =()=>{
    console.log("Busy Days:", busyTime)
    console.log('Days for display:', days)
    for (let i=0; i<busyTime.length;i++){
      for (let k=0; k<7;k++){
        document.getElementById(1+k+(busyTime[i].hour*8)).style.backgroundColor='white'
        if (busyTime[i].day===days[k].day && busyTime[i].month===days[k].month){
          document.getElementById(1+k+(busyTime[i].hour*8)).style.backgroundColor=lightBlue
        }
      }}}
  const displayedDays = ()=>{
    let date= dayjs()
    var newDay=Number(date.format('D'))
    var dayOfWeek=daysOfWeek.indexOf(date.format('dddd'))+1
    var newMonth=Number(date.format('MM'))
    var newYear= Number(date.format('YYYY'))
    setMonth(newMonth)
    setYear(newYear)
    var newDays=[]
    for (let i=0; i<7; i++){
      if (i<dayOfWeek-1){
        var before=date.subtract(String(dayOfWeek-i-1), 'days')
        newDays.push({'day':Number(before.format('D')),'month': Number(before.format('MM')) })
      }else if (i>dayOfWeek-1){
        var after=date.add(String(i-dayOfWeek+1), 'days')
        newDays.push({'day':Number(after.format('D')),'month': Number(after.format('MM')) })
      }else{
        newDays.push({'day': newDay, 'month':newMonth})
      }
    }
    setDays(newDays)
  }
  const weekBefore = ()=>{
    var currentWeek=days.concat()
    for (let i=0; i<7; i++){
      let day=dayjs(`${year}-${currentWeek[i].month}-${currentWeek[i].day}`)
      var weekFromNow=day.subtract('7', 'day')
      currentWeek[i].month=Number(weekFromNow.format("MM"))
      currentWeek[i].day=Number(weekFromNow.format("D"))
      setMonth(Number(weekFromNow.format('MM')))
    }
    setDays(currentWeek)
    displayBusy()
    
  }
  const weekAfter =()=>{
    var currentWeek=days.concat()
    for (let i=0; i<7; i++){
      let day=dayjs(`${year}-${currentWeek[i].month}-${currentWeek[i].day}`)
      var weekFromNow=day.add('7', 'day')
      currentWeek[i].month=Number(weekFromNow.format("MM"))
      currentWeek[i].day=Number(weekFromNow.format("D"))
      setMonth(Number(weekFromNow.format('MM')))
    }
    setDays(currentWeek)
    displayBusy()
  }
  const showToday = ()=>{
    displayedDays()
    displayBusy()
  }
  const showDays= ()=>{
    const daysWeek=["M", "T", "W", "T","F", "S", "S"]
    return(
      <table className='days-aligned'>
        <tbody>
        <tr className='push'>
        {daysWeek.map(a=>{return <td key={a==="T" || a==='S'?Math.random():a} className='day-of-week'> {a}</td>})}
        </tr>
        <tr className='push'>
          {days.concat().map(d=>{
            return <td className={(d.day===Number(today.slice(8)) && d.month===Number(today.slice(5,7)) && year===Number(today.slice(0,4)))?'today-class day':'day'} key={d.day}>{d.day}</td>
            })}
        </tr>
        </tbody>
      </table>
    )
  }
  const addEvent =()=>{
    var result= prompt('Enter event time:\nYYYY-MM-DD HH:mm:ss', [])
    const format=/^\d{4}-\d{2}-\d{2} \d{2}:\d{1,2}:\d{1,2}/
    if (format.exec(result)){
      console.log(result)
      setBusyTime(busyTime.concat({'year':Number(result.slice(0, 4)), 'month':Number(result.slice(5,7)), 'day': Number(result.slice(8,10)), 'hour':Number(result.slice(11,13))}))
      for (let i=0; i<7; i++){
        if (days[i].day===Number(result.slice(8,10)) && days[i].month===Number(result.slice(5,7))){
          document.getElementById(1+i+Number(result.slice(11,13))*8).style.backgroundColor=lightBlue
          break
        }
      }
    }else{
      alert('Error in input!')
    }
  } 
  const clickOn = (key)=>{
    var a=days[key%8-1]
    if (chosenCell.length===0){
      setClicked(true)
      setChosenCell([{'day':a.day, 'month':a.month, 'hour':(key-(key%8))/8, 'id':key}])
      document.getElementById(key).style.backgroundColor='#b3b7ff'
    } else{
      if (chosenCell[0].id===key){
        setChosenCell([])
        for (let i=0; i<busyTime.length;i++){
          if (busyTime[i].day===chosenCell[0].day && busyTime[i].month===chosenCell[0].month && busyTime[i].hour===chosenCell[0].hour){
            document.getElementById(key).style.backgroundColor=lightBlue
            setClicked(false)
          }}
        if (clicked===true){
          document.getElementById(key).style.backgroundColor='white'
          setClicked(false)
        }
      }else{
        for (let i=0; i<busyTime.length;i++){
          if (busyTime[i].day===chosenCell[0].day && busyTime[i].month===chosenCell[0].month && busyTime[i].hour===chosenCell[0].hour){
            document.getElementById(chosenCell[0].id).style.backgroundColor=lightBlue
            setClicked(false)
          }}
        if (clicked===true){
          document.getElementById(chosenCell[0].id).style.backgroundColor='white'
        }
        setClicked(true)
        setChosenCell([{'day':a.day, 'month':a.month, 'hour':(key-(key%8))/8, 'id':key}])
        document.getElementById(key).style.backgroundColor='#b3b7ff'
      }
    }
    }
  const buildBoxes= ()=>{
    const time=[]
    for (var i=0; i<192; i++){
      if (i % 8===0 && i!==0){
        time.push({'value':`${i/8}:00`, "key":i})
      }else{
        time.push({'value':" ", "key":i})
      }
      
    }
    return time.map(c=>
      {return <div key={c.key} className={c.key%8===0?'time-boxes':'my-day'} id={c.key%8!==0?c.key:null} onClick={c.key%8!==0?()=>clickOn(c.key):null}>{c.value}</div>})
       
  }
  const deleteTask =()=>{
    for (let i=0; i<busyTime.length;i++){
      if (busyTime[i].day===chosenCell[0].day && busyTime[i].month===chosenCell[0].month && busyTime[i].hour===chosenCell[0].hour){
        setBusyTime(busyTime.concat().filter(k=>{return !(k.day===chosenCell[0].day && k.month===chosenCell[0].day && k.hour===chosenCell[0].hour)}))
        document.getElementById(chosenCell[0].id).style.backgroundColor='white'
        setClicked(false)
        setChosenCell([])
      }
    }
  }
  useEffect(()=>{
    displayedDays()
  }, [])
  
  return (
    <div className='App'>
      <div className='fixed'>
      <div className='header'>
        <p id='app-name'> Interview Calendar</p> <button id='add-button' onClick={addEvent}> </button>
      </div>
      <div className='upper-part'>
      {showDays()}
      <div className='month-line'>
       <button id='week-before' onClick={weekBefore}></button> <p id='month'>{months[month-1] +" "+ year}</p><button id='week-after' onClick={weekAfter}></button>
       </div>
       </div>
       </div>
      <div id='my-grid'>
        {buildBoxes()}
      </div>

      <div className='footer'>
        <button className='last-line' onClick={showToday}> Today </button> <button className={clicked?'delete':'hidden'} onClick={deleteTask}>Delete</button>
      </div>
    </div>
  );
}

export default App;
