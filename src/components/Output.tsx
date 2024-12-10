import React from 'react'
import { FaWeightScale } from "react-icons/fa6";
import { PiFireSimpleDuotone } from "react-icons/pi";
import { IoIosAddCircle } from "react-icons/io";
const chartdata = [
    {
      name: "Calories Burned",
      amount: 84,
      steps: 8912, 
      miles: 0.5
    },
    {
      name: "Amount Left",
      amount: 16,
      steps: 8193, 
      miles: 0/8
    },
  
  ]
  

function Output() {
  return (
    <div className='md:w-[17rem] md:h-[10rem] lg:w-[20rem] lg:h-[13rem] flex flex-col'>
        <h3>Output</h3>

        <section className='bg-zinc-400 flex flex-row justify-evenly w-[100%] h-[100%] self-center rounded-t-lg p-1 '>
            <div className='w-[80%] h-[50%] my-4 mx-auto bg-orange-200 flex flex-row justify-around gap-4 rounded'>
                <FaWeightScale className=' self-center' size={30} />
                <section className='self-center'> 
                    <p className='text-xs'>Weight Loss:</p>
                    <p className='font-semibold'>{chartdata[0].amount}</p>
                </section>
                <section className='self-end p-1 rounded my-2 flex flex-row bg-gray-500 bg-opacity-50'> 
                    <PiFireSimpleDuotone className='self-center' />
                    <p className='text-xs'>Great!</p>
                </section>
            </div>

        </section>
        <section className='bg-zinc-400 flex flex-row justify-evenly w-[100%] h-[100%] self-center rounded-b-lg p-1 '>
            {/* need to add function to add previous weight loss check in  */}
        <button className='w-[80%] h-[50%] my-4 mx-auto bg-gray-200 flex flex-row justify-around  border-[1px] border-transparent  rounded transition ease-in-out   hover:border-dotted hover:border-black hover:border-[2px] '>
            <div className='w-[80%] h-[50%] my-4 mx-auto bg-gray-200 flex flex-row justify-around gap-4 border border-transparent  rounded transition ease-in-out      ' >
                <FaWeightScale className=' self-center' size={30} />
                <section className='self-center'> 
                    <p className='text-xs'>Weight Loss:</p>
                    <p className='font-semibold'>~</p>
                </section>
                <section className='self-end p-1 rounded my-2 flex flex-row bg-gray-500 bg-opacity-50'> 
                   <IoIosAddCircle /> 
                </section>
            </div>
            </button>

        </section>


    </div>
  )
}

export default Output