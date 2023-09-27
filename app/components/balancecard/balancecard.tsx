import { CiCreditCard2 } from "react-icons/ci";
import CardWrapper from "../dashboard/cardwrapper/cardwrapper";

interface BalanceCardProps{
    balance: number,
    country: string,
    showTopupInput:()=>void,
}
export default function BalanceCard({balance,country,showTopupInput}:BalanceCardProps){
    return(
        <CardWrapper className="px-0">
            <div className="w-full h-full bg-blue-500/90 ">
                <div className="w-[95%] mx-auto h-full flex flex-col justify-between">
                    <div className="flex justify-between items-center py-6">
                        <h3 className="text-[14px] text-white">Total balance</h3>
                        <h3 className="text-white">{balance}{(country.toLowerCase()) === "ghana"?"GHS":"USD"}</h3>
                    </div>
                    <div className="flex gap-x-3 mb-2">
                        <CiCreditCard2 className="border rounded-sm border-white" color="white" size={40} />
                        <button onClick={showTopupInput} className="hover:bg-blue-400/30 border rounded-sm border-white text-[20px] px-3 text-white flex justify-center items-center">+</button>
                    </div>
                </div>
            </div>
        </CardWrapper> 
    )
}