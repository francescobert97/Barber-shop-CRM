import { ICustomer, Services } from "../../shared/models/datacustomer.model"
import { useDataIstance } from "../useDataIstance/useDataIstance"
import { ICustomerInformations } from "./models/usecustomer.model"

export const useCustomerData = (newerDate:number = 10, oldestDate:number = 90) => {
           const data:ICustomer[]= JSON.parse(JSON.stringify(useDataIstance()))
  

const getCustomerInformation = ():ICustomerInformations[] => {
     const actualDate = new Date();
     const minDate = new Date()
     const maxDate = new Date()
     minDate.setDate(actualDate.getDate() - oldestDate)
     maxDate.setDate(actualDate.getDate() - newerDate)
     const result = data.map(customer => {
          const lastBoughtData = customer.services.reduce((oldest:Services, curr:Services) => {
               const oldestDate = new Date(oldest.purchaseDate);
               const currentDate = new Date(curr.purchaseDate);
               return oldestDate > currentDate? oldest : curr;
              }).purchaseDate
     
          const lastBoughtDataConverted = new Date(lastBoughtData)
         const customerCondition: 'bad' | 'normal' | 'best' = getCustomerCondition(lastBoughtDataConverted, maxDate, minDate)
         
           return {customer, lastBoughtData, customerCondition}
      })

      return result
}

const getCustomerCondition = (purchaseDate:Date, maxDate:Date, minDate:Date) => {
     if (purchaseDate < minDate) return "bad";
     if (purchaseDate > maxDate) return "best";
     return "normal";
 }

 //console.log(getCustomerInformation())
return {getCustomerInformation}
}