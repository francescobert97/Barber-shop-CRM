import { AdvancedStatus, Services } from "../../shared/models/datacustomer.model"
import { DATA_SUMMARY_FALL, IDataSummary } from "../../shared/models/periodfilter.model"
import { useDataIstance } from "../useDataIstance/useDataIstance"

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


export const useIncome = () => {
      const data_summary:IDataSummary =  JSON.parse(JSON.stringify(DATA_SUMMARY_FALL))
       const data= useDataIstance()
    const allServices =data.flatMap(s => s.services)      

  const total = allServices.reduce((acc,curr) => {
    
    return    curr.status === 'Canceled'? acc : ('amount' in  curr? (curr.price * curr.amount) + acc : acc +curr.price)
},0)




      const getGeneralBalanceStatus = (mode: IAll | IPartial, period:number = 30):IDataSummary => {
            const actualDate = new Date();
            const maxDate = new Date()
            maxDate.setDate(actualDate.getDate() - period)
                return  getFilteredData((statusTypes) => {              
                        return allServices.reduce((acc:IDataSummary,curr) =>{
                              const purchaseDate = new Date(curr.purchaseDate)
                         
                              if(statusTypes && !statusTypes.includes(curr.status)) return acc;

                                    if(purchaseDate >= maxDate) {
                                          if(!acc['PeriodMode']) acc['PeriodMode'] = data_summary.PeriodMode
                                          acc['PeriodMode'] = accumulatorCondition(acc['PeriodMode'],curr)
                                    }
                                    
                                    if(!mode.updating) {
                                          if(!acc['TotalMode']) acc['TotalMode'] = data_summary.TotalMode
                                          acc['TotalMode'] = accumulatorCondition(acc['TotalMode'],curr)
                                    } 
                                   
                              
                                     return acc;
                        } , {...data_summary})
                  
                  },mode.statusType)
      }

  
      const accumulatorCondition = (acc:Record<AdvancedStatus, IData>,curr:Services) => {
            
            acc[curr.status] = acc[curr.status] || { money: 0, productAmount: 0 };
            acc[curr.status].money += ('amount' in curr? (curr.price * curr.amount) : curr.price )
            acc[curr.status].productAmount += (curr.id? 1 : 0)
            return acc;
      }
      
      const getFilteredData = (callback:(statusTypes?:AdvancedStatus[]) => IDataSummary,statusTypes?:(AdvancedStatus)[] ):IDataSummary => {    
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


