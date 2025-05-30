import User from "@/models/user.model";


const scheduleUnverifiedUserRemoval = async (userId: string, email: string) =>{
    return new Promise<void>((resolve)=>{
        setTimeout(async ()=>{
            try {
                const unverifiedUser = await User.findById(userId);
                if (unverifiedUser && !unverifiedUser.isVerified) {
                    await User.findByIdAndDelete(userId);
                    console.log(`Removed unverified user with email: ${email}`);
                }
            } catch (error: any) {
                throw new Error(error.message);
            }
            resolve();
        },1000*60*10)
    })
}
export default scheduleUnverifiedUserRemoval;