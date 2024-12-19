'use client';
import { DonutChart } from './DonutChart';
import React from 'react';
import Modal from './Modal';
import { IoIosAdd } from 'react-icons/io';
import { useMyContext } from '@/context/MyContext';
import type { TrackingData } from '@/context/MyContext';
type ChartDataItem = {
  name: string; // The name of the chart segment
  amount: number; // The numerical value for the amount
  steps: number; // The step count
  miles: number; // The miles value
};
type Props = {
  chartdata: ChartDataItem[]
};

type TrackerProps = {
  trackerData: TrackingData[] | null
};



const chartdata: ChartDataItem[] = [
  {
    name: 'Calories Burned',
    amount: 84,
    steps: 8912, 
    miles: 0.5
  },
  {
    name: 'Amount Left',
    amount: -16,
    steps: 8193, 
    miles: 0/8
  },

];

const DailyTrackerForm = () => {

  const {addDailyTrackingData} = useMyContext();




  return (
    <form onSubmit={(e) =>{addDailyTrackingData(e);}} className='text-center w-[50%] h-screen  justify-center gap-5 flex-col items-center m-auto '>
      <h1>Daily Goals Form</h1>

        <label className='self-center justify-self-center' htmlFor='amount'>Calories:</label>
        <input  required className='self-center justify-self-center' name='amount' type='number' />
        <br />
        
        <label className='self-center justify-self-center' htmlFor='steps'>Steps:</label>
        <input  required className='self-center justify-self-center' name='steps' type='number' />
        <br />
        
        <label className='self-center justify-self-center' htmlFor='miles'>Miles (mi): </label>
        <input  required className='self-center justify-self-center' name='miles' type='number' />
        <br />
        <input type='submit' placeholder='Submit' className='bg-slate-500 py-1 px-2 rounded border border-transparent transition ease-in-out hover:text-slate-500 hover:border-slate-500 hover:border-[1px] hover:bg-slate-200' />
    </form>
  );

};

export const DonutChartLabelExample = ({chartdata}: Props) => (
  <DonutChart
    className='mx-auto '
    data={chartdata}
    category='name'
    value='amount'
    showLabel={true}
    valueFormatter={(number: number) =>
      `${Intl.NumberFormat('us').format(number).toString()}%`
    }
  /> 
);



const  Overview : React.FC<TrackerProps> = ({trackerData}) => {
  
  const {isModalOpen, handleOpenModal, handleCloseModal, modalContent} = useMyContext();


  return (
    <div className='self-center md:w-[17rem] md:h-[10rem] lg:w-[20rem] lg:h-[13rem] flex flex-col'>
        <h3 className='text-xl font-semibold'>Overview</h3>
        
        <div className='flex flex-row justify-evenly w-[100%] h-[100%] self-center bg-slate-500 rounded-lg p-1'>
            <section className='self-center'>
                {/* section for pie graph */}
                <DonutChartLabelExample chartdata={chartdata} />
            </section>
            <section className='flex flex-col self-center'>
                <div className='md:text-xs'>
                    <p>Calores Burned</p>
                    {trackerData![trackerData!.length - 1].amount} / 500cal
                </div>
                <div className='md:text-xs'>
                    <p>Steps Walked</p>
                    {trackerData![trackerData!.length - 1].steps} / 10k
                </div>
                <div className='md:text-xs'>
                    <p>Miles Walked</p>
                    {trackerData![trackerData!.length - 1].miles} / 2mi
                </div>

            </section>
        <section>
          <button onClick={() => handleOpenModal(<DailyTrackerForm />)} className='bg-slate-200 rounded border border-transparent transition ease-in-out hover:bg-slate-800 hover:text-slate-200 hover:border-slate-200 hover:border-[1px] '><IoIosAdd /></button>
        </section>
        </div>

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          {modalContent}
        </Modal>
    </div>
  );
};

export default Overview;