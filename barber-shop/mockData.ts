import { ICustomer, IKit, Kit, KitPricing, OtherServices, PricingServices, Services, Status } from './src/shared/models/models';

import { v4 as uuidv4 } from 'uuid';
const uniqueId = uuidv4;
export const createDinamicMockData = ():ICustomer[] => {

    const firstNames = ['Luca', 'Marco', 'Giulia', 'Alessia', 'Matteo', 'Francesca'];
const lastNames = ['Rossi', 'Bianchi', 'Ferrari', 'Esposito', 'Ricci', 'Conti'];
    const emptyArr = new Array(generateRandomNumber(100)).fill(undefined)
    const customers = emptyArr.map(() => {
        const randomName = generateRandomNumber(6)
        const randomLN = generateRandomNumber(6)
      return  {
        id: uniqueId(),
        fullname: `${firstNames[randomName]} ${lastNames[randomLN]}`,
        mail: `${firstNames[randomName].toLowerCase()}.${lastNames[randomLN].toLowerCase()}@gmail.com`,
        services: new Array(randomName +1).fill(undefined).map( ():Services=> randomServiceGenerator())
    }})
    return customers
    
}



const generateRandomNumber = (range:number) => Math.floor(Math.random() * range);


const randomServiceGenerator = ():Services => {
    const randomType = generateRandomNumber(2)

    if(randomType === 1) {
        const appointmentDate =  new Date(new Date().getTime() - (generateRandomNumber(100) * 24 * 60 * 60 * 1000))
        const otherServices:OtherServices[] = ['beardConsulting' ,'Formation', 'homeBeardCut']
        const servicesPricing:PricingServices = { beardConsulting: 35,Formation: 80,  homeBeardCut: 20}
        const servicesStatus:(Status | 'Postponed')[] = ['OrderEmitted', 'toBeEmitted', 'Canceled', 'Postponed']
            const types = otherServices[generateRandomNumber(otherServices.length)]
        return {
            id:uniqueId(),
            type: types ,
            price: servicesPricing[types],
            dateAppointment: appointmentDate.toString(),
            status:servicesStatus[generateRandomNumber(4)],
            amount: generateRandomNumber(4)+1,
            purchaseDate: new Date(appointmentDate.getTime() - (generateRandomNumber(10) * 24 * 60 * 60 * 1000)).toString(),
        }
    }
    else {
        const kitType:Kit[]= ['Starter', 'Advanced', 'Ultimate']
        const kitPricing:KitPricing = {Starter: 49, Advanced: 56, Ultimate:69}
        const kitStatus:Status[] = ['OrderEmitted', 'toBeEmitted', 'Canceled']

        const kit:Kit = kitType[generateRandomNumber(kitType.length)]

        const randomService:IKit = {
            id: uniqueId(),
            type: kit,
            price: kitPricing[kit],
            status: kitStatus[generateRandomNumber(kitStatus.length)], 
            purchaseDate: new Date(new Date().getTime() - (generateRandomNumber(100) * 24 * 60 * 60 * 1000)).toString(),
        }
        return randomService
    }

}