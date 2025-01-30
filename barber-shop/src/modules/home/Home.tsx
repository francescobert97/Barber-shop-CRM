import { useEffect, useRef, useState } from "react"
import { IData, useIncome } from "../../hooks/useIncome/useIncome"
import { AdvancedStatus } from "../../shared/models/models";
import Chart from "../../components/chart/Chart";
import { TextField } from "@mui/material";
import ShowDataBox from "./components/show-data-box/ShowDataBox";

 interface IHomeData {
    allMoney: Record<AdvancedStatus, IData>,
    MonthlyEarn:Record<AdvancedStatus, IData>
} 

function Home() {
    const myhook = useIncome()
    const [data, setData] = useState<IHomeData>({} as IHomeData);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    useEffect(() => {
       const {PeriodMode, TotalMode} = myhook.getGeneralBalanceStatus({mode:'All'}, 100)
           setData(
            {
                allMoney: TotalMode,
                MonthlyEarn: PeriodMode}) 
    }, [])


   const changePeriodTime = (day:number) => {
    clearTimeout(timeoutRef.current);

    const newPulledData = myhook.getGeneralBalanceStatus({mode:'All', updating:true}, day);
    timeoutRef.current = setTimeout(() =>     setData(prev =>({...prev, MonthlyEarn: {...newPulledData.PeriodMode}})), 500)

   }
    return (
        <div className="text-light container d-flex flex-column justify-content-center vh-100">
            <div className=" my-2 d-flex justify-content-between col-sm-6 mx-auto">
                {data.MonthlyEarn && <ShowDataBox data={Object.entries(data.MonthlyEarn).map(([key,value]) => ({name:key , value: value}))} />}
                {data.allMoney && <ShowDataBox data={Object.entries(data.allMoney).map(([key,value]) => ({name:key , value: value}))} />}
            </div>
    
            <div className="col-sm-6 mx-auto">
                <strong className="text-dark">Entrate periodizzate(default mensile):</strong>
                <TextField
                    id="outlined-basic"
                    type="number"
                    label="Inserisci un numero"
                    variant="outlined"
                    onChange={(event) => {
                        const value = Number(event.target.value);
                        changePeriodTime(value);  
                    }}
                    fullWidth
                 />
                <div className="d-flex">
                  { data.MonthlyEarn &&
                  <>
                    <Chart data={Object.entries(data.MonthlyEarn).map(([key,value]) => ({name:key , value: value.money}))} />
                    <Chart data={Object.entries(data.MonthlyEarn).map(([key,value]) => ({name:key , value: value.productAmount }))} />
                  </>
   
                }
                </div>
            </div>
   
            <div className=" col-sm-6 mx-auto">
                Entrate totali:
                <div className="d-flex">
                { data.allMoney &&
                    <>
                    <Chart data={Object.entries(data.allMoney).map(([key,value]) => ({name:key , value: value.money }))} />
                    <Chart data={Object.entries(data.allMoney).map(([key,value]) => ({name:key , value: value.productAmount }))} />
                    </>
                } 
                </div>
           
        </div>
     

    </div>
    )
}

export default Home