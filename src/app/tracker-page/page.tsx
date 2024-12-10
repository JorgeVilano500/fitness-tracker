import Image from "next/image";
import {Activities, Navbar, Output, Overview, SideNav} from "../../components/index";

export default function Home() {
  return (
    <div className="grid grid-cols-10 grid-rows-auto h-auto" >
      <Navbar />
      <SideNav />
        
        <section className="flex flex-row justify-center gap-5 h-[70vh] w-[100%] row-span-4 col-span-8">
          <Activities />

          <Overview />

          <Output/>
        </section>
    </div> 
  );
}
