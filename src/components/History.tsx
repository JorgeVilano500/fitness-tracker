'use client';
import React from 'react';
import { useMyContext } from '@/app/context/MyContext';
import { TiDelete } from 'react-icons/ti';
// import type { WeightLossData } from '@/app/context/MyContext';
// import { createClient } from '@/utils/supabase/client';

function History() {
    const {isLastWeight, formatDate, deleteWeightLossData,  setNum, num, updateWeightLossData} = useMyContext();


    const handleDoubleClick = (inx: string) => {
        setNum(inx);
    };


    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e);
     


    };

    const handleBlur = () => {
        setNum('-1');
    };


    // const handleClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: WeightLossData, newVal: string) => {

    //     console.log(item, newVal, e.currentTarget.value)
    //     const newItem = {
    //         ...item, 
    //         weight_loss: newVal
    //     }

    //     const {error} = await supabase.from('weight_loss_tracker').update({weight_loss: newVal}).eq('id', item.id)
    //     setIsLastWeight((prev : WeightLossData[] )  => prev.map((it) => it.id === item.id ? newItem: it))


    //         if(error) console.log('Updating error', error.message)
    //         setNum('-1')

    // }


  return (
    <div className='w-[100%] h-[auto] m-auto'>
        <h1 className='text-xl font-semibold'>History</h1>
        <section className='bg-slate-500 '>
            <ul className='sm:w-[100%] lg:w-[75%] h-[10rem] m-auto overflow-y-auto overflow-x-hidden'>
            {(isLastWeight ?? []).map((item, inx) => (
                <li key={inx} className='w-[auto] h-[4rem] flex flex-row justify-center gap-5 bg-slate-200 m-4 rounded'>
                    {
                        Number(num) === inx ? (
                            <>
                                <h1 className='text-sm font-thin self-center'>Edit Weight Lost:</h1>
                                <input
                                    type='text'
                                    // value={}
                                    onChange={ handleChange}
                                    onBlur={ handleBlur}
                                    onKeyDown={(e) =>updateWeightLossData(e, item, e.currentTarget.value)}
                                    autoFocus
                                    className='w-[25%] h-[50%] my-auto'
                                    required
                                
                                />
                                <p className='text-xs self-center'>Press Enter</p>
                                {/* <button
                                    className='bg-slate-500 rounded w-[25%] h-[50%] my-auto'
                                    onClick={(e) => handleClick(e, item, e.currentTarget.value)}
                                    >Submit</button> */}
                                </>
                        ) : (
                            <>
                                <h1 className='text-xl font-thin self-center'>Weight Lost:</h1>
                                <span className='w-[3rem] self-center cursor-pointer bg-slate-500 py-1 px-2 rounded border border-transparent transition ease-in-out hover:text-slate-500 hover:border-slate-500 hover:border-[1px] hover:bg-slate-200' aria-label='Double Click to Edit' onDoubleClick={() => handleDoubleClick(inx.toString())}><h3 className='text-xl font-semibold self-center'>{item.weight_loss}</h3></span>
                            </>
                        )
                    }
                    <h3 className='text-xs self-center'>Created: {formatDate(item.created_at)}</h3>
                    <button onClick={(e) => deleteWeightLossData(e, item.id)} className='self-center'><TiDelete size={20}  /></button>
                </li>
            ))}
            </ul>
        </section>
    </div>
  );
}

export default History;