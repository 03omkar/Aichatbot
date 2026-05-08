import { div } from 'motion/react-client'
import react from 'react'
import { getsession } from '../lib/getsession'
import DashboardClient from '../components/DashboardClient'
async function page(){
    const session=await getsession()
    return (
        <>
            
            <DashboardClient ownerId={session?.user?.id!}/>
            
        </>
    )
}
export default page