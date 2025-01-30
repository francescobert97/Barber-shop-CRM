import { AdvancedStatus, IHomeDeta, Services } from "../../shared/models/models"
import { useDataIstance } from "../useDataIstance/useDataIstance"

export const useIncome = () => {
      const emptyobj:IHomeDeta = {
            PeriodMode: {
                 ToBeEmitted: { money:0, productAmount:0},
                 OrderEmitted: { money:0, productAmount:0},
                 Canceled: { money:0, productAmount:0},
                 Postponed: { money:0, productAmount:0},
            },
            TotalMode:  {
                  ToBeEmitted: { money:0, productAmount:0},
                  OrderEmitted: { money:0, productAmount:0},
                  Canceled: { money:0, productAmount:0},
                  Postponed: { money:0, productAmount:0},
             }
      }
       const data= useDataIstance()
    const allServices =data.flatMap(s => s.services)      
      
  const total = allServices.reduce((acc,curr) => {
    
    return    curr.status === 'Canceled'? acc : ('amount' in  curr? (curr.price * curr.amount) + acc : acc +curr.price)
},0)

console.log('total money: ' + total)

      const getGeneralBalanceStatus = (mode: IAll | IPartial, period:number = 30):IHomeDeta => {
            const actualDate = new Date();
            const maxDate = new Date()
            maxDate.setDate(actualDate.getDate() - period)
                return  onlypassedPROVA((statusTypes) => {              
                        return allServices.reduce((acc:IHomeDeta,curr) =>{
                              const purchaseDate = new Date(curr.purchaseDate)
                         
                              if(statusTypes && !statusTypes.includes(curr.status)) return acc;

                                    if(purchaseDate >= maxDate) {
                                          if(!acc['PeriodMode']) acc['PeriodMode'] = emptyobj.PeriodMode
                                          acc['PeriodMode'] = accumulatorCondition(acc['PeriodMode'],curr)
                                    }
                                    
                                    if(!mode.updating) {
                                          if(!acc['TotalMode']) acc['TotalMode'] = emptyobj.TotalMode
                                          acc['TotalMode'] = accumulatorCondition(acc['TotalMode'],curr)
                                    } 
                                   
                              
                                     return acc;
                        } , emptyobj)
                  
                  },mode.statusType)

      }

  
      const accumulatorCondition = (acc:Record<AdvancedStatus, IData>,curr:Services) => {
            acc[curr.status] = acc[curr.status] || { money: 0, productAmount: 0 };
            acc[curr.status].money += ('amount' in curr? (curr.price * curr.amount) : curr.price )
            acc[curr.status].productAmount += (curr.id? 1 : 0)
            return acc;
      }
      
      const onlypassedPROVA = (callback:(statusTypes?:AdvancedStatus[]) => IHomeDeta,statusTypes?:(AdvancedStatus)[] ):IHomeDeta => {    
            let result; 
            if(statusTypes) {
                   result = callback(statusTypes)
            }else {
                  result = callback()
            }
            
            return result
      }
      

return { getGeneralBalanceStatus}
}


export interface IData {
      money:number,
      productAmount:number
}
 interface IMode {
      mode:'All' | 'Partial'
      updating?: boolean
 }
 interface IPartial extends IMode {
      mode:'Partial'
      statusType: AdvancedStatus[]
 }
 interface IAll extends IMode{
      mode: 'All'
      statusType?: never
 }


