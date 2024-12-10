import React from 'react'
import type { DailyProgressBar } from '@/types/common'


const ProgressBar : React.FC<DailyProgressBar> = ({day, progress, color}) => {
  return (
    <div className='flex flex-col items-center space-y-2'>
        <div className='text-sm font-medium'>{day.slice(0,1)}</div>
        <div className='h-40 w-6 bg-gray-200 rounded-lg overflow-hidden relative'>
            <div
             className={`absolute bottom-0 w-full bg-[${color}] z-20`}
                style={{height: `${progress}%`, backgroundColor: color}}
            >
            </div>
            <div className='text-xs text-gray-500 text-center'>{progress}%</div>
        </div>

    </div>
  )
}

export default ProgressBar