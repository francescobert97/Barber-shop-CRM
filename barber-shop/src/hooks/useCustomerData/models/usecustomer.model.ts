import { ICustomer } from "../../../shared/models/datacustomer.model";

export interface ICustomerInformations  {
  customer:ICustomer,
   lastBoughtData:string,
    customerCondition: 'bad' | 'normal' | 'best'
  }