import Image from "next/image";
import {Activities, Navbar, Output, Overview, SideNav} from "../components/index";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Fitness Tracker',
  description: 'This is a test of a fitness tracker I have been planning to build for a while. I will use iPHONE Shortcuts to get some automation for data tracking. '

}

export default function Home() {
  return (
    <div className="grid grid-cols-10 grid-rows-auto h-auto" >
      <Navbar />
      <SideNav />
        

        <h1>Welcome to the main page</h1>
    
    </div> 
  );
}
