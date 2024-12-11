'use client'
import React, {createContext, useContext, useState, ReactNode, useEffect, FormEvent} from 'react'; 
import { getSession } from '../login/actions';
import { createClient } from '@/utils/supabase/client';
import type { User } from '@supabase/supabase-js';

type WeightLossData = {
    id: number
    created_at: Date
    user_policy_id: string
    weight_loss: number
    user_table?: {email: string}[]
}

interface MyContextType  {
    userData: object | null
    setUserData: (user: User | null) => void
    fetchWeightLossData: () => void
    isLastWeight: WeightLossData[] 
    setIsLastWeight: (data: WeightLossData[]) => void
    isModalOpen: boolean
    setIsModalOpen: (modal: boolean) => void 
    modalContent: React.ReactNode
    setModalContent: (content: React.ReactNode) => void
    handleOpenModal : (content: React.ReactNode) => void
    handleCloseModal: () => void
    addWeightLossData: (event: React.FormEvent<HTMLFormElement>) => void

    formatDate: (date: Date) => string | undefined

    deleteWeightLossData: (event: React.MouseEvent<HTMLButtonElement>, dataId: number) => void
}

const MyContext = createContext<MyContextType | undefined>(undefined);


export const MyProvider = ({children}: {children: ReactNode}) => {
    const supabase = createClient();

    const [userData, setUserData] = useState<User | null>(null)
    const [isLastWeight, setIsLastWeight] = useState<WeightLossData[]>([])

    const clearUser = () => setUserData(null)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  
    const handleOpenModal = (content: React.ReactNode) => {
      setModalContent(content);
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
      setModalContent(null);
    };
  


    const fetchWeightLossData = async () => {
        const {data: {user}} = await supabase.auth.getUser();
        const {data, error} = await supabase.from('weight_loss_tracker').select('id, created_at, weight_loss, user_policy_id, user_table(email)').eq('user_policy_id', user?.id)

        if(error) console.log('Weight Loss Fetching Error', error.message)


            console.log(data)
            if(data?.length! > 0) {
                setIsLastWeight(data ?? []);
            }

    }

    const addWeightLossData = async (event:  React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(event);
        const weightLossData = new FormData(event.currentTarget)
        
        const weight = weightLossData.get('weight')
        
        
        console.log('Weight (lb):', weight, userData?.id)
        
        
        const {data, error} = await supabase.from('weight_loss_tracker').insert({weight_loss: weight, user_policy_id: userData?.id}).select()

        if(error) console.log('Adding Weight Loss Error', error.message)
            console.log(data)

        if(data !== null ){

        setIsLastWeight((prev) : WeightLossData[]   =>{
            if(prev?.length! > 0) {
                return  [...prev, data[0] ]
            } else {
                return [data[0]!]
            }
        });
    }


        handleCloseModal();

    }

    const deleteWeightLossData = async (event: React.MouseEvent<HTMLButtonElement>, dataId: number) => {
        event.preventDefault();
        const response = await supabase.from('weight_loss_tracker').delete().eq('id', dataId);

        setIsLastWeight((prev) :WeightLossData[] =>  (prev?.filter(el=> el.id != dataId)))

        if(!response) console.log('Delete Weight Loss Error')

    }

    const formatDate =  (dbDate: Date) => {
        console.log(dbDate)
        if(!dbDate) return;
        const date = new Date(dbDate);

        //formate to specific local 
        const formattedDate = new Intl.DateTimeFormat('en-US', {
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
        }).format(date);

        
        return  formattedDate ;

    }
    

    useEffect(() => {

        // fetch session on Mount 
        supabase.auth.getUser().then(({data}) => {
            console.log(data);
            setUserData(data?.user)
        })

        // listen to changes in session 
        const {data: subscription} = supabase.auth.onAuthStateChange((_event, session) => {
            setUserData(session?.user ?? null)
        })


        // return () => subscription?.unsubscribe();
    }, [])

    return (
        <MyContext.Provider value={{userData, setUserData, fetchWeightLossData, isLastWeight, setIsLastWeight, isModalOpen, setIsModalOpen, modalContent, setModalContent, handleOpenModal, handleCloseModal, addWeightLossData, formatDate, deleteWeightLossData}} >
            {children}
        </MyContext.Provider>
    )


}

export const useMyContext = () =>{
    const context = useContext(MyContext);
    if(!context) {
        throw new Error('useMyContext should be wrapped within the provider')
    }
    return context;
}