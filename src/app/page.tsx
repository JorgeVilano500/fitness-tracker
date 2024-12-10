import Image from "next/image";
import {Navbar, Overview, SideNav} from "../components/index";

export default function Home() {
  return (
    <div className="grid grid-cols-10 grid-rows-20" >
      <Navbar />
      <SideNav />
        <Overview />
    </div> 
  );
}
