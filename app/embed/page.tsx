import react from "react"
import { getsession } from "../lib/getsession"
import EmbedClient from "../components/EmbedClient"
async function page(){
    const session= await getsession()

    return(
        <>
           
            <EmbedClient ownerId={session?.user?.id!}/>

        </>

    )
}
export default page