'use client'
import React from 'react'
import { useMyContext } from '@/app/context/MyContext'
import { TiDelete } from "react-icons/ti";

function History() {
    const {isLastWeight, formatDate, deleteWeightLossData} = useMyContext();

  return (
    <div className='w-[50%] h-[20rem] m-auto'>
        <h1 className='text-xl font-semibold'>History</h1>
        <section className='bg-slate-500 '>
            <ul className='w-[75%] h-[10rem] m-auto overflow-y-auto overflow-x-hidden'>
            {(isLastWeight ?? []).map((item, inx) => (
                <li key={inx} className='w-[auto] h-[4rem] flex flex-row justify-center gap-5 bg-slate-200 m-4 rounded'>
                    <h1 className='text-xl font-thin self-center'>Weight Lost:</h1>
                    <h3 className='text-xl font-semibold self-center'>{item.weight_loss}</h3>
                    <h3 className='text-xs self-center'>Created: {formatDate(item.created_at)}</h3>
                    <button onClick={(e) => deleteWeightLossData(e, item.id)} className='self-center'><TiDelete size={20}  /></button>
                </li>
            ))}
            </ul>
        </section>
    </div>
  )
}

export default History