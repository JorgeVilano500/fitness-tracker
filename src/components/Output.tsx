'use client';
import React from 'react';
import { FaWeightScale } from 'react-icons/fa6';
import { PiFireSimpleDuotone } from 'react-icons/pi';
import { IoIosAddCircle } from 'react-icons/io';
import { useMyContext } from '@/app/context/MyContext';
import Modal from './Modal';


  
  const WeightLossForm = () => {
    const {addWeightLossData} = useMyContext();

    return (
      <form onSubmit={(e) => addWeightLossData(e)} className='text-center w-[50%] h-[50%] justify-center gap-5 flex-col items-center m-auto '>
        <h1 className='self-center justify-self-center'>Current Weight Loss Form</h1>
        <label className='self-center justify-self-center' htmlFor='weight'>Weight (lb)</label>
        <input  required className='self-center justify-self-center' name='weight' type='number' />
        <br />
        <input type='submit' placeholder='Submit' className='bg-slate-500 py-1 px-2 rounded border border-transparent transition ease-in-out hover:text-slate-500 hover:border-slate-500 hover:border-[1px] hover:bg-slate-200' />
      </form>
    );

  };

function Output() {

  const { isLastWeight, isModalOpen, handleOpenModal, handleCloseModal, modalContent} = useMyContext();




  return (
    <div className='self-center md:w-[17rem] md:h-[10rem] lg:w-[20rem] lg:h-[13rem] flex flex-col'>
        <h3 className='text-xl font-semibold'>Output</h3>

        {isLastWeight  ? 
        <>
                <section className='bg-slate-500 flex flex-row justify-evenly w-[100%] h-[100%] self-center rounded-t-lg p-1 '>
                <div className='w-[80%] h-[80%] my-4 mx-auto bg-orange-200 flex flex-row justify-evenly gap-4 rounded'>
                    <FaWeightScale className=' self-center' size={30} />
                    <section className='self-center'> 
                        <p className='text-xs'>Current Weight Loss:</p>
                        <p className='font-semibold'>{isLastWeight[isLastWeight.length - 1]?.weight_loss} lb.</p>
                    </section>
                    <section className='self-end p-1 rounded my-2 flex flex-row bg-gray-500 bg-opacity-50'> 
                        <PiFireSimpleDuotone className='self-center' />
                        <p className='text-xs'>Great!</p>
                    </section>
                </div>
    
            </section>
    
    
            <section className='bg-slate-500 flex flex-row justify-evenly w-[100%] h-[100%] self-center rounded-b-lg p-1 '>
                {/* need to add function to add previous weight loss check in  */}
            <button onClick={() => handleOpenModal(<WeightLossForm />)} className='w-[80%] h-[50%] my-4 mx-auto bg-gray-200 flex flex-row justify-around  border-[2px] border-transparent  rounded transition ease-in-out   hover:border-dotted hover:border-black hover:border-[2px] '>
                <div className='w-[80%] h-[50%] my-4 mx-auto bg-gray-200 flex flex-row justify-around gap-4 border border-transparent  rounded transition ease-in-out      ' >
                    <FaWeightScale className=' self-center' size={30} />
                    <section className='self-center'> 
                        <p className='text-xs'>Add Weight Loss:</p>
                        <p className='font-semibold'>~</p>
                    </section>
                    <section className='self-center p-1 rounded my-2 flex flex-row bg-gray-500 bg-opacity-50'> 
                       <IoIosAddCircle /> 
                    </section>
                </div>
                </button>
    
            </section>
            </>
            :
            <section className='bg-slate-500 flex flex-row justify-evenly w-[100%] h-[100%] self-center rounded-lg p-1 '>
            {/* need to add function to add previous weight loss check in  */}
        <button onClick={() => handleOpenModal(<WeightLossForm />)} className='w-[80%] h-[50%] my-4 mx-auto bg-gray-200 flex flex-row justify-around  border-[2px] border-transparent  rounded transition ease-in-out   hover:border-dotted hover:border-black hover:border-[2px] '>
            <div className='w-[80%] h-[50%] my-4 mx-auto bg-gray-200 flex flex-row justify-around gap-4 border border-transparent  rounded transition ease-in-out      ' >
                <FaWeightScale className=' self-center' size={30} />
                <section className='self-center'> 
                    <p className='text-xs'>Add Weight Loss:</p>
                    <p className='font-semibold'>~</p>
                </section>
                <section className='self-center p-1 rounded my-2 flex flex-row bg-gray-500 bg-opacity-50'> 
                   <IoIosAddCircle /> 
                </section>
            </div>
            </button>

        </section>


        }

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          {modalContent}

      </Modal>

    </div>
  );
};

export default Output;