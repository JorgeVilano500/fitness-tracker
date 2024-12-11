'use client'
import React, {createContext, useContext, useState, ReactNode, useEffect} from 'react'; 
import { getSession } from '../login/actions';
import { supabase } from '@/lib/supabaseClient';


interface MyContextType  {
    user: object | null
    setUser: (user: object | null) => void
}

const MyContext = createContext<MyContextType | undefined>(undefined);


export const MyProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<object | null>(null)

    const clearUser = () => setUser(null)

    

    useEffect(() => {

        // fetch session on Mount 
        supabase.auth.getSession().then(({data}) => {
            setUser(data.session)
        })

        // listen to changes in session 
        const {data: subscription} = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session)
        })


        // return () => subscription?.unsubscribe();
    }, [])

    return (
        <MyContext.Provider value={{user, setUser}} >
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