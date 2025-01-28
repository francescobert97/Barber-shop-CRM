import { Services, Status } from "../../shared/models/models"
import { useDataIstance } from "../useDataIstance/useDataIstance"

export const useIncome = () => {
       const data= useDataIstance()
    const allServices =data.flatMap(s => s.services)      
      
  const total = allServices.reduce((acc,curr) => {
    
    return    curr.status === 'Canceled'? acc : ('amount' in  curr? (curr.price * curr.amount) + acc : acc +curr.price)
},0)

console.log('total money: ' + total)

      const getGeneralBalanceStatus = (mode: IAll | IPartial, period:number = 30) => {
            const actualDate = new Date();
            const maxDate = new Date()
            maxDate.setDate(actualDate.getDate() - period)


            if(mode.statusType) {
                return  onlypassedPROVA((statusTypes) => {              
                        return allServices.reduce((acc:Record<string, Record<string, IData>>,curr) =>{
                              const purchaseDate = new Date(curr.purchaseDate)
                         

                                    if(statusTypes && statusTypes.includes(curr.status)) {
                                          if(purchaseDate >= maxDate) {
                                                if(!acc['PeriodMode']) acc['PeriodMode'] = {}
                                                acc['PeriodMode'] = accumulatorCondition(acc['PeriodMode'],curr)
                                          }
      
                                          if(!acc['TotalMode']) acc['TotalMode'] = {}
                                                acc['TotalMode'] = accumulatorCondition(acc['TotalMode'],curr)
                                    }
                         
                  
                                    return acc
                        } , {})
                  
                  },mode.statusType)
            }
            else {
                return  onlypassedPROVA(() => {
                        return allServices.reduce((acc:Record<string, Record<string,IData>>,curr) =>{
                              const purchaseDate = new Date(curr.purchaseDate)
                         
 
                                          console.log(purchaseDate >= maxDate)
                                          if(purchaseDate >= maxDate) {
                                                if(!acc['PeriodMode']) acc['PeriodMode'] = {}
                                                acc['PeriodMode'] = accumulatorCondition(acc['PeriodMode'],curr)
                                          }
                                          if(!acc['TotalMode']) acc['TotalMode'] = {}
                                                acc['TotalMode'] = accumulatorCondition(acc['TotalMode'],curr)
                                    return acc
                        } , {})
                  })
            }

  
      }
      const accumulatorCondition = (acc:Record<string, IData>,curr:Services) => {
            acc[curr.status] = acc[curr.status] || { money: 0, productAmount: 0 };
            acc[curr.status].money += ('amount' in curr? (curr.price * curr.amount) : curr.price )
            acc[curr.status].productAmount += (curr.id? 1 : 0)
            return acc;
      }
      
      const onlypassedPROVA = (callback:(statusTypes?:(Status | 'Postponed')[]) => void,statusTypes?:(Status | 'Postponed')[] ) => {    
            let result; 
            if(statusTypes) {
                   result = callback(statusTypes)
            }else {
                  result = callback()
            }
            
            console.log(result)
            return result
      }
      

            getGeneralBalanceStatus({mode:'All'}, 100)
return { getGeneralBalanceStatus}
}


interface IData {
      money:number,
      productAmount:number
}
 interface IMode {
      mode:'All' | 'Partial'
 }
 interface IPartial extends IMode {
      mode:'Partial'
      statusType: (Status | 'Postponed')[]
 }
 interface IAll extends IMode{
      mode: 'All'
      statusType?: never
 }


