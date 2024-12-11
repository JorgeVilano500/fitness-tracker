
"use client"

import { DonutChart } from "./DonutChart"
import { IoIosAdd } from "react-icons/io";

const chartdata = [
  {
    name: "Calories Burned",
    amount: 84,
    steps: 8912, 
    miles: 0.5
  },
  {
    name: "Amount Left",
    amount: -16,
    steps: 8193, 
    miles: 0/8
  },

]


export const DonutChartLabelExample = () => (
  <DonutChart
    className="mx-auto "
    data={chartdata}
    category="name"
    value="amount"
    showLabel={true}
    valueFormatter={(number: number) =>
      `${Intl.NumberFormat("us").format(number).toString()}%`
    }
  />
)
import React from 'react'

const  Overview : React.FC = () => {
  return (
    <div className="self-center md:w-[17rem] md:h-[10rem] lg:w-[20rem] lg:h-[13rem] flex flex-col">
        <h3 className='text-xl font-semibold'>Overview</h3>
        
        <div className="flex flex-row justify-evenly w-[100%] h-[100%] self-center bg-slate-500 rounded-lg p-1">
            <section className="self-center">
                {/* section for pie graph */}
                <DonutChartLabelExample />
            </section>
            <section className="flex flex-col self-center">
                <div className="md:text-xs">
                    <p>Calores Burned</p>
                    {chartdata[0].amount} / 500cal
                </div>
                <div className="md:text-xs">
                    <p>Steps Walked</p>
                    {chartdata[0].steps} / 10k
                </div>
                <div className="md:text-xs">
                    <p>Miles Walked</p>
                    {chartdata[0].miles} / 2mi
                </div>

            </section>
        <section>
          <button className="bg-slate-200 rounded border border-transparent transition ease-in-out hover:bg-slate-800 hover:text-slate-200 hover:border-slate-200 hover:border-[1px] "><IoIosAdd /></button>
        </section>
        </div>
    </div>
  )
}

export default Overview