
export interface ICustomer {
    id: string,
    fullname: string,
    mail:string,
    services: Services[]
}

interface IService {
    id:string,
    type: string,
    purchaseDate:string
    price: number,
    status:string
}
export interface IKit extends IService {
    type: Kit,
    price: KitPricing[Kit],
    status: Status
}

export interface IOtherServices extends IService{
    type: OtherServices 
    price: PricingServices[OtherServices],
    dateAppointment: string,
    status:AdvancedStatus
    amount:number
}

export type AdvancedStatus = Status | 'Postponed'

export type Kit = 'Starter' | 'Advanced' | 'Ultimate'

export type OtherServices = 'beardConsulting' | 'Formation' | 'homeBeardCut'


export type KitPricing = {
    Starter: 49;
    Advanced: 56;
    Ultimate: 69;
  };
  

 export type PricingServices = {
    beardConsulting: 35,
    Formation: 80,
    homeBeardCut: 20
  };

export type Services = IKit | IOtherServices;


export type Status = 'OrderEmitted'| 'ToBeEmitted' | 'Canceled'
