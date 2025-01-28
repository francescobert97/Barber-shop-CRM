import { useEffect, useState } from "react"
import { useIncome } from "../../hooks/useIncome/useIncome"
import { Status } from "../../shared/models/models";
import { useCustomerData } from "../../hooks/useCustomerData/useCustomerData";

interface IHomeData {
    allMoney: Record<Status, {money:number, productAmount:number}>,
    MonthlyEarn:Record<Status, {money:number, productAmount:number}>
} 
function Home() {
    const myhook = useIncome()
    const customerHook = useCustomerData()
    const [data, setData] = useState<IHomeData>({} as IHomeData);
    useEffect(() => {
        console.log(myhook.getMultiModeMoney())
        console.log(myhook.getEarnedMoneyInPeriod({statusType:'OrderEmitted', period:'Month'}))
        
        setData({
            allMoney: myhook.getMultiModeMoney(),
            MonthlyEarn: myhook.getEarnedMoneyInPeriod({statusType:'OrderEmitted', period:'Month'})
        })
    }, [])
    return (
        <div>
            TOTALI
            { data.allMoney &&
                Object.entries(data.allMoney).map(([key,value]) => (       
                <p>{key}:  {value.money} - quantità {value.productAmount}</p>
                ))
            }
                ----------------------
            <p>QUESTO MESE</p>
        { data.MonthlyEarn &&
                Object.entries(data.MonthlyEarn).map(([key,value]) => (       
                <p>{key}:  {value.money} - quantità {value.productAmount}</p>
                ))
            }
        </div>
    )
}

export default Home