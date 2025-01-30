//import { createDinamicMockData } from "../../../mockData"
import { ICustomer } from "../../shared/models/models"
import jsonData from '../../../mock.json'
export const useDataIstance = () => {
        //const data:ICustomer[] =createDinamicMockData()
        console.log(jsonData)
        const data:ICustomer[] = jsonData as ICustomer[]
        return data
}