import Image from "next/image";
import HomeClient from "./components/HomeClient";
import { getsession } from "./lib/getsession";

export default async function Home() {
  const session = await  getsession()
  
  return (
    
    <>
    <HomeClient email={session?.user?.email!}/>
      </>
  );
}
