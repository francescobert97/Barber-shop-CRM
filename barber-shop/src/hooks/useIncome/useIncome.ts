import { Status } from "../../shared/models/models"
import { useDataIstance } from "../useDataIstance/useDataIstance"

export const useIncome = () => {
       const data= useDataIstance()
    const allServices =data.flatMap(s => s.services)      
      
  const total = allServices.reduce((acc,curr) => {
    
    return    curr.status === 'Canceled'? acc : ('amount' in  curr? (curr.price * curr.amount) + acc : acc +curr.price)
},0)

console.log('total money: ' + total)

const getSingleModeMoney = (status: Status | 'Postponed') => {

      const result =  allServices.reduce((acc,curr) => {
              if(status === curr.status)return 'amount' in  curr? (curr.price * curr.amount) + acc : acc +curr.price
              else return acc;
        }, 0)
      return result
  }
  

  const getMultiModeMoney = () => {
      const result =  allServices.reduce((acc:Record<string, {money:number, productAmount:number}>,curr) => {
            acc[curr.status] = acc[curr.status] || { money: 0, productAmount: 0 };

      acc[curr.status].money  += ('amount' in curr? (curr.price * curr.amount) : curr.price )
      acc[curr.status].productAmount  += (curr.id? 1 : 0);
            return acc
      }, {})
      return result

}

const getEarnedMoneyInPeriod = ( mode:IMode) => {
      const actualDate = new Date();

      const subCondition = (subMode:string, purchaseDate:Date):Record<string, number> => {
            if(subMode === 'Day') return  {current: actualDate.getDay(), purchase: purchaseDate.getDay()}
            else if(subMode === 'Month')  return  {current: actualDate.getMonth(), purchase: purchaseDate.getMonth()}
            else  return  {current: actualDate.getFullYear(), purchase: purchaseDate.getFullYear()}
      }
      
      const result = allServices.reduce((acc:Record<string, {money:number, productAmount:number}>,curr) =>{
            const purchaseDate = new Date(curr.purchaseDate)
                  const {current, purchase} = subCondition(mode.period, purchaseDate);
                  if(current === purchase  ) {
                        acc[curr.status] = acc[curr.status] || { money: 0, productAmount: 0 };

                        acc[curr.status].money += ('amount' in curr? (curr.price * curr.amount) : curr.price )
                        acc[curr.status].productAmount += (curr.id? 1 : 0)
                        return acc;
                  }else return acc;
            
      } , {})
      return result
}


return {getMultiModeMoney, getSingleModeMoney, getEarnedMoneyInPeriod}
}


 type PeriodMode =  'Month' | 'Day' | 'Year'
 interface IMode {
      statusType: Status | 'Postponed'
      period: PeriodMode
 }

