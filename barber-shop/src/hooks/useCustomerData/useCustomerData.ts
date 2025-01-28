import { Services } from "../../shared/models/models"
import { useDataIstance } from "../useDataIstance/useDataIstance"

export const useCustomerData = () => {
           const data= useDataIstance()
  

const getAll = () => {
     const actualDate = new Date();
     const threeMonthAgoDate = new Date()
     const bestDate = new Date()
     threeMonthAgoDate.setDate(actualDate.getDate() - 90)
     bestDate.setDate(actualDate.getDate() - 10)
     const result = data.map(customer => {
          const lastBoughtData = customer.services.reduce((oldest:Services, curr:Services) => {
               const oldestDate = new Date(oldest.purchaseDate);
               const currentDate = new Date(curr.purchaseDate);
               return oldestDate > currentDate? oldest : curr;
              }).purchaseDate
     
          const lastBoughtDataConverted = new Date(lastBoughtData)
         const customerCondition = getCustomerCondition(lastBoughtDataConverted, bestDate, threeMonthAgoDate)
         
           return {customer, lastBoughtData, customerCondition}
      })

      return result
}

const getCustomerCondition = (purchaseDate:Date, bestDate:Date, threeMonthAgoDate:Date) => {
     if (purchaseDate < threeMonthAgoDate) return "bad";
     if (purchaseDate > bestDate) return "best";
     return "normal";
 }
}