import React from 'react'
import ProgressBar from './ProgressBar'

const weekdayProgess = [
  {
    day: 'Monday', 
    progress: 75, 
    color: '#374B73'
  },
  {
    day: 'Tuesday', 
    progress: 75, 
    color: '#606D75'
  },
  {
    day: 'Wednesday', 
    progress: 75, 
    color: '#281C10'
  },
  {
    day: 'Thursday', 
    progress: 50, 
    color: '#4F5961'
  },
  {
    day: 'Friday', 
    progress: 25, 
    color: '#4C535B'
  },
  {
    day: 'Saturday', 
    progress: 50, 
    color: '#A61103'
  },
  {
    day: 'Sunday', 
    progress: 0, 
    color: '#590202'
  }
]

function Activities() {
  return (
    <div className="md:w-[17rem] md:h-[10rem] lg:w-[20rem] lg:h-[13rem] col-span-4 flex flex-col">
      <h3>Activities</h3>
      <div  className="flex flex-row justify-evenly w-[100%] h-[100%] self-center bg-slate-500 rounded-lg p-1">
          {weekdayProgess.map(({day, progress, color}) => (
            <ProgressBar key={day} day={day}  progress={progress} color={color}/>
          ))}
      </div>
    </div>
  )
}

export default Activities