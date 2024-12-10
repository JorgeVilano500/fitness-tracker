import Image from "next/image";
import {Activities, Navbar, Output, Overview, SideNav} from "../components/index";

export default function Home() {
  return (
    <div className="grid grid-cols-10 grid-rows-20" >
      <Navbar />
      <SideNav />
        
        <section className="flex flex-row gap-5 w-[100%] col-span-8">
          <Activities />

          <Overview />

          <Output/>
        </section>
    </div> 
  );
}
