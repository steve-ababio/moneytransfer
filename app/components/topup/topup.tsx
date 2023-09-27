import React from "react";
import Button from "../button/button"
import TextInput from "../textinput/textinput"
import { RotatingLines } from "react-loader-spinner";

interface TopupProps{
    visible: boolean,
    loading:boolean,
    getTopupAmount:(e:React.ChangeEvent<HTMLInputElement>)=>void,
    closeTopup:(e:React.MouseEvent)=>void
    topUpBalance:()=>void
    setVisible:React.Dispatch<React.SetStateAction<boolean>>
}

const Topup = React.forwardRef<HTMLDivElement,TopupProps>(({loading,setVisible,topUpBalance,getTopupAmount,closeTopup,visible},ref)=>{
    return(
        <div ref={ref} onClick={closeTopup} className={`${visible? 'flex':'hidden'} absolute top-0 left-0 h-full w-full justify-center bg-slate-500/80`}>
            <div className="max-w-[90%] h-fit w-[30rem] mt-20">
                <TextInput onChange={getTopupAmount}  className="w-full text-white text-[18px]" isSignup={false} label="" placeholder="Enter amount to top up with" type="number"/>
                <Button disabled={loading} onClick={(e)=>{setVisible(false) ,topUpBalance()}} className={`bg-blue-500 mt-4 w-full text-center flex justify-center items-center ${loading && `cursor-not-allowed`}`}>
                    {
                        loading ? 
                            <>
                                <RotatingLines strokeColor="white" 
                                    strokeWidth="4"
                                    animationDuration="0.8"
                                    width="25"
                                    visible={true}
                                /> 
                                <span className="ml-2">Refilling account...</span>
                            </>:
                            "Top up"
                    } 
                </Button>
            </div>
        </div>
    )
});

export default Topup;