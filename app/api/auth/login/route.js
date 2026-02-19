import {prisma} from "lib/prisma"
import bcrypt from "bcrypt";
import {NextResponse} from "next/server"

export async function POST(req){
    const {email,password}=await req.json();
    const user =await prisma.user.findUnique({where:{email}})
    if(!user){
        return  NextResponse.json({error:"Invalid user"},
            {stqatus:401}
        )
    }
    const ismatch=await bcrypt.compare(password,user.password);
    if(!ismatch){
        return NextResponse.json({error:"Worng password"},{status:400})
    }

    return NextResponse.json({message:"Login Successsfull"})
}