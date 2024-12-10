
"use client"

import { DonutChart } from "./DonutChart"

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

export const DonutChartLabelExample = () => (
  <DonutChart
    className="mx-auto"
    data={chartdata}
    category="name"
    value="amount"
    showLabel={true}
    valueFormatter={(number: number) =>
      `${Intl.NumberFormat("us").format(number).toString()}`
    }
  />
)
import React from 'react'

const  Overview : React.FC = () => {
  return (
    <div className="w-[17rem] h-[10rem] flex flex-col">
        <h3>Overview</h3>
        <div className="flex flex-row justify-evenly w-[100%] h-[100%] self-center bg-slate-500 p-1">
            <section className="self-center">
                {/* section for pie graph */}
                <DonutChartLabelExample />
            </section>
            <section className="flex flex-col self-center">
                <div className="text-xs">
                    <p>Calores Burned</p>
                    {chartdata[0].amount}
                </div>
                <div className="text-xs">
                    <p>Steps Walked</p>
                    {chartdata[0].steps}
                </div>
                <div className="text-xs">
                    <p>Miles Walked</p>
                    {chartdata[0].miles}
                </div>

            </section>
        </div>
    </div>
  )
}

export default Overview