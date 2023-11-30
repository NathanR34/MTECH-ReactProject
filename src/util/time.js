import { useState, useEffect } from 'react'



export const UseTime = () => {
    const today = new Date();
    const month = today.getMonth() + 1; 
    const year = today.getFullYear();
    const date = today.getDate();
    const second = today.getSeconds();
    const hour = today.getHours();
    const tomorrow = {month:  month , date: date, second: second, hour: hour, year: year }
    const [currentDate, setCurrentDate] = useState({month: month, date: date, second: second, hour: hour });
    useEffect (() => {
      var timer = setInterval(() => {
        setCurrentDate(tomorrow)



        // console.log(tomorrow)
      }, 100000)
      return function cleanup(){
        clearInterval(timer)
      }
    });
    return currentDate
  } 
  

  export const getDate = () => {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const date = today.getDate();
    const hour = today.getHours();
    const minute = today.getMinutes();
    const second = today.getSeconds();
    const time = hour + ':' + minute + ':' + second
    const currentDate = month + '/' + date + '/' + year;
    return currentDate + ' ' + time
  }


