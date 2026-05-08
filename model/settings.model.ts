import mongoose, {model, Schema } from "mongoose";
import { tr } from "motion/react-client";

interface Isettings{
    ownerId:string
    businessname:string
    supportemail:string
    knowledge:string
}
const settingsSchema=new Schema<Isettings>({
    ownerId:{
        type: String,
        required:true,
        unique:true
    },
    businessname:{
        type: String,
        
    },
    supportemail:{
        type: String,
          
    },
    knowledge:{
        type: String,
        
    },
},{timestamps:true})
const Settings=mongoose.models.Settings || model("Settings",settingsSchema)
export default Settings