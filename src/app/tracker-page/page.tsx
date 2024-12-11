import Image from "next/image";
import {Activities, Navbar, Output, Overview, SideNav, History} from "../../components/index";
import { createClient } from "@/utils/supabase/server";
import {redirect} from 'next/navigation';

export default async function Home() {

  const supabase = await createClient();

  const {data, error} = await supabase.auth.getUser();
  console.log(data.user)

  if(error || !data?.user) {
    redirect('/login')
  }
  

  return (
    <div className="grid col-span-10 row-span-auto grid-rows-auto h-auto" >
      <Navbar user={data.user} />
      <SideNav />
          
          <div className="my-4 col-span-8">
          <h1 className="text-center text-xl font-semibold">Welcome {data.user.email}</h1> 
        <section className=" gap-8 h-[50vh] w-[100%] flex flex-row justify-center">
          <Activities />

          <Overview />

          <Output/>
        </section>
        <section className="my-4 col-span-8 text-center">
          <History />
        </section>
        </div>
    </div> 
  );
}
