import { createDinamicMockData } from "../../../mockData"
import { ICustomer } from "../../shared/models/models"

export const useDataIstance = () => {
        const data:ICustomer[] =createDinamicMockData()
        return data
}