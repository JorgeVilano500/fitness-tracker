'use client';
import React, {createContext, useContext, useState, ReactNode, useEffect, FormEvent} from 'react'; 
import { createClient } from '@/utils/supabase/client';
import type { User } from '@supabase/supabase-js';

export type WeightLossData = {
    id: number
    created_at: Date
    user_policy_id: string
    weight_loss: number
    user_table?: {email: string}[]
}

export type TrackingData = {
    id?: number 
    created_at?: string
    user_policy_id?: string
    name: string 
    amount: number 
    steps: number 
    miles: number
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
    updateWeightLossData: (e: React.KeyboardEvent<HTMLInputElement>, item: WeightLossData, newVal: string) => void
    deleteWeightLossData: (event: React.MouseEvent<HTMLButtonElement>, dataId: number) => void


    addDailyTrackingData: (event: React.FormEvent<HTMLFormElement>) => void
    deleteDailyTrackingData: (event: React.MouseEvent<HTMLButtonElement>, dataId: number) => void
    updateDailyTrackingData: () => void

    formatDate: (date: Date) => string | undefined

    fetchDailyTrackingData: () => void

    num: string
    setNum: (value: string) => void
}

const MyContext = createContext<MyContextType | undefined>(undefined);


export const MyProvider = ({children}: {children: ReactNode}) => {
    const supabase = createClient();

    const [userData, setUserData] = useState<User | null>(null);
    const [isLastWeight, setIsLastWeight] = useState<WeightLossData[]>([]);

    const [dailyTrackingData, setDailyTrackingData] = useState<TrackingData[]>([]);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode>(null);

    const [num, setNum] = useState<string>('-1');

  
    const handleOpenModal = (content: React.ReactNode) => {
      setModalContent(content);
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
      setModalContent(null);
    };
  

    // for daily tracking data

    const fetchDailyTrackingData = async () => {
        console.log(dailyTrackingData);
        const {data: {user}} = await supabase.auth.getUser();
        const {data, error} = await supabase.from('daily_tracker').select('id, created_at, user_policy_id, name, amount, steps, miles');
        console.log(user);
        if(error) console.log('Daily Trackin Error', error.message);

        const val = data?.length ?? [];

            if(Number(val) >0) {
                setDailyTrackingData(data ?? []);
            };

    };

    const addDailyTrackingData = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const dailyTrackingData = new FormData(event.currentTarget);

        const calories= dailyTrackingData.get('amount');

        const steps = dailyTrackingData.get('steps');

        const miles = dailyTrackingData.get('miles');

        const {data, error} = await supabase.from('daily_tracker').insert({user_policy_id: userData?.id, name: 'Calories Burned', amount: calories, steps: steps, miles: miles}).select();

        if(error) console.log('Adding Daily tracking Error', error.message);

            if(data !== null) {
                setDailyTrackingData((prev): TrackingData[] => {
                    if(prev?.length > 0) {
                        return [...prev, data[0]];
                    } else {
                        return [data[0]];
                    }
                });
            }

            handleCloseModal();
    };

    const deleteDailyTrackingData = async (event: React.MouseEvent<HTMLButtonElement>, dataId: number) => {
        console.log(event, dataId);
    };
    
    const updateDailyTrackingData = async () => {

    };

    // for weight loss data 
    const fetchWeightLossData = async () => {
        const {data: {user}} = await supabase.auth.getUser();
        const {data, error} = await supabase.from('weight_loss_tracker').select('id, created_at, weight_loss, user_policy_id, user_table(email)').eq('user_policy_id', user?.id);

        if(error) console.log('Weight Loss Fetching Error', error.message);

            const val = data?.length ?? [];
            console.log(data);
            if(Number(val) > 0) {
                setIsLastWeight(data ?? []);
            };

    };

    const addWeightLossData = async (event:  React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(event);
        const weightLossData = new FormData(event.currentTarget);
        
        const weight = weightLossData.get('weight');
        
        
        console.log('Weight (lb):', weight, userData?.id);
        
        
        const {data, error} = await supabase.from('weight_loss_tracker').insert({weight_loss: weight, user_policy_id: userData?.id}).select();

        if(error) console.log('Adding Weight Loss Error', error.message);
            console.log(data);

        if(data !== null ){

        setIsLastWeight((prev) : WeightLossData[]   =>{
            const val = prev?.length ?? 0;
            if(Number(val) > 0) {
                return  [...prev, data[0] ];
            } else {
                return [data[0]!];
            };
        });
    }


        handleCloseModal();

    };

    const deleteWeightLossData = async (event: React.MouseEvent<HTMLButtonElement>, dataId: number) => {
        event.preventDefault();
        const response = await supabase.from('weight_loss_tracker').delete().eq('id', dataId);

        setIsLastWeight((prev) :WeightLossData[] =>  (prev?.filter(el=> el.id != dataId)));

        if(!response) console.log('Delete Weight Loss Error');

    };

    const formatDate =  (dbDate: Date) => {
        console.log(dbDate);
        if(!dbDate) return;
        const date = new Date(dbDate);

        //formate to specific local 
        const formattedDate = new Intl.DateTimeFormat('en-US', {
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
        }).format(date);

        
        return  formattedDate ;

    };
    
    const updateWeightLossData = async (e: React.KeyboardEvent<HTMLInputElement>, item: WeightLossData, newVal: string) => {
        if(!newVal) {
            return alert('please update weight')
        }

        if(e.key === 'Enter') {
               // will change the value using supabase in a second 

        const newItem = {
            ...item, 
            weight_loss: newVal
        };

        const {error} = await supabase.from('weight_loss_tracker').update({weight_loss: newVal}).eq('id', item.id);

        setIsLastWeight((prev : WeightLossData[] )  => prev.map((it) => it.id === item.id ?{...it, weight_loss:  Number(newItem)}: it));

            if(error) console.log('Updating error', error.message);
            setNum('-1');
        } 
    };
    

    useEffect(() => {

        // fetch session on Mount 
        supabase.auth.getUser().then(({data}) => {
            console.log(data);
            setUserData(data?.user);
        });

        // listen to changes in session 
        const {data: subscription} = supabase.auth.onAuthStateChange((_event, session) => {
            setUserData(session?.user ?? null);
            console.log(subscription);
        });


        // return () => subscription?.unsubscribe();
    }, []);

    return (
        <MyContext.Provider value={{userData, setUserData, fetchWeightLossData, isLastWeight, setIsLastWeight, isModalOpen, setIsModalOpen, modalContent, setModalContent, handleOpenModal, handleCloseModal, addWeightLossData, formatDate, deleteWeightLossData, updateWeightLossData, num, setNum, fetchDailyTrackingData, addDailyTrackingData, deleteDailyTrackingData, updateDailyTrackingData}} >
            {children}
        </MyContext.Provider>
    );


};

export const useMyContext = () =>{
    const context = useContext(MyContext);
    if(!context) {
        throw new Error('useMyContext should be wrapped within the provider');
    }
    return context;
};