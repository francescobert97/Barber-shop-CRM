import { AdvancedStatus } from "./datacustomer.model"

export interface IData {
      money:number,
      productAmount:number
}

export interface IDataSummary  {
    PeriodMode: Record<AdvancedStatus, IData>,
    TotalMode:Record<AdvancedStatus, IData>
} 
export const DATA_SUMMARY_FALL:IDataSummary  = {
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


