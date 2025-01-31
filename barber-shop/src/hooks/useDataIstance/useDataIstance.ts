import jsonData from '../../../mock.json'
import { ICustomer } from '../../shared/models/datacustomer.model'
export const useDataIstance = () => {
        
        const data:ICustomer[] = jsonData as ICustomer[]
        return data
}