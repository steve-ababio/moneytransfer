'use client'
import { CiCreditCard2 } from "react-icons/ci";
import { DonutChart} from "@tremor/react";
import SummaryCard from "@/app/components/summarycard/summarycard";
import CardWrapper from "@/app/components/dashboard/cardwrapper/cardwrapper";
import Sidebar from "@/app/components/dashboard/sidebar/sidebar";
import Table from "@/app/components/table/table";
import MoneyCard from "../moneycard/moneycard";
import TextInput from "../../textinput/textinput";
import React, { useRef, useState } from "react";
import Button from "../../button/button";
import { RotatingLines } from "react-loader-spinner";
import { useSession } from "next-auth/react";
import Topup from "../../topup/topup";
import BalanceCard from "../../balancecard/balancecard";

interface GeneralData{
    date:string,
    amount:number,
    status:string,
    id:string
}
interface TransferData extends GeneralData{
    recipient_name:string,
}
interface ReceptionData extends GeneralData{
    sender_name:string,
}

interface DashBoardDataProps{
    transfersbycountries:{name:string,transfers:number}[]
    transferdata:TransferData[]
    receptiondata:ReceptionData[],
    balance:number,
    totalamountreceived:number,
    totalamountsent:number,
    numberofreceptions:number,
    numberoftransfers:number,
    country:string
    setBalance:React.Dispatch<React.SetStateAction<number>>
}
interface CurrentUser{
    username:string,
    id:string,
    firstname:string,
    lastname:string
  };
export default function DashBoardData({totalamountreceived,numberofreceptions,numberoftransfers,totalamountsent,transfersbycountries,receptiondata,transferdata,setBalance,balance,country}:DashBoardDataProps){
    const [visible,setVisible] = useState(false);
    const topupvalue = useRef(0);
    const topupinputoverlay = useRef(null);
    const [loading,setLoading] = useState(false);    
    const {data} = useSession();
    const currentuser = data?.user as CurrentUser;

    function showTopupInput(){
        setVisible(true);
    }
    function closeTopup(e:React.MouseEvent){
        if(e.target === topupinputoverlay.current)
            setVisible(false)
    }
    async function getTopupAmount(e:React.ChangeEvent<HTMLInputElement>){
        const value = parseFloat(e.target.value);
        topupvalue.current = value;
    }
    async function topUpBalance(){
        try{
            setLoading(true);
            const response = await fetch("/api/topup",{method:"POST",body:JSON.stringify({amount:topupvalue.current,userId:currentuser.id})});
            const data = await response.json();
            if(data.status === "success" && data.toppedup){
                setBalance(data.balance);
            }   
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }
    }
    return(
        <div className="h-full relative">
            <div className="w-full flex h-full bg-blue-100/20">
                <Sidebar showTopupInput={showTopupInput} />
                <div className="grow">
                    <div className="w-[95%] mx-auto grid gap-x-4 grid-rows-5 md:grid-rows-3 md:grid-cols-2 gap-y-4 lg:grid-rows-2 lg:grid-cols-3 mt-8">
                        <SummaryCard
                            numberofreceptions={numberofreceptions}
                            numberoftransfers={numberoftransfers}                         
                        />
                        <CardWrapper>
                            <div className="py-6">
                                <h3 className="text-[14px] text-slate-500">Transfers by country</h3>
                                <div>
                                    <DonutChart 
                                        data={transfersbycountries} 
                                        colors={["sky","amber"]}
                                        index="name"
                                        variant="donut"
                                        category="transfers"
                                        className="text-slate-700 mt-6 border-white" 
                                    />
                                </div>
                            </div>
                        </CardWrapper>
                        <BalanceCard
                            balance={balance}
                            country={country}
                            showTopupInput={showTopupInput} 
                        />                        
                        <MoneyCard country={country} label="Total money sent" amount={totalamountsent} />
                        <MoneyCard country={country} label="Total money Received" amount={totalamountreceived} />
                        <Topup
                            loading={loading} 
                            setVisible={setVisible}
                            topUpBalance={topUpBalance}
                            closeTopup={closeTopup}
                            getTopupAmount={getTopupAmount}
                            visible={visible}
                            ref={topupinputoverlay}
                        />
                    </div>
                    <div className=" w-[95%] mx-auto h-full">
                        <div id="table-ctn" className="grid gap-y-5 lg:gap-y-0 lg:grid-cols-2 gap-x-10 ">
                            <Table className="col-span-1" heading="Recent Tranfers" data={transferdata} />
                            <Table heading="Recent Receptions" data={receptiondata} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}