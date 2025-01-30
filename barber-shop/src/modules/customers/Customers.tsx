import { useMemo, useRef, useState } from "react";
import BasicTable from "../../components/BasicTable/BasicTable";
import { useCustomerData } from "../../hooks/useCustomerData/useCustomerData";
import { ICustomer } from "../../shared/models/models";
export interface ICustomerInformations  {
  customer:ICustomer,
   lastBoughtData:string,
    customerCondition: 'bad' | 'normal' | 'best'
  }
  const getToUpsellList = (arr:ICustomerInformations[]) => {
    const result = arr.filter(customer => {
    
      const toUpsell = customer.customer.services.filter(service => ((service.type === 'Advanced' || service.type === 'Starter' ) && service.status === 'OrderEmitted')) || [];
      const discard = customer.customer.services.filter(service => service.type === 'Ultimate' && service.status !== 'Canceled' ) || [];
      
         return toUpsell.length > 0 && discard.length === 0;
  })
  console.log(result)

  return result
}
export const Customers = ({singleType, mode}:{singleType:'bad' | 'normal' | 'best' | 'all', mode?:'Upselling'}) => {
      const customerHook = useCustomerData()
     const memoizedCustomers =  useMemo(() =>{
      if(mode)return  getToUpsellList(customerHook.getCustomerInformation())
      else return customerHook.getCustomerInformation()
     } , [mode])
    const [limit, setLimit] = useState(0)
    const breakpointTypeReference =  useRef(0) 

 

  const pageSize = 30;
    const visibleClient = useMemo(() => {
        const filteredCustomers = []
      if(singleType !== 'all') {
        for (let i = limit; i < memoizedCustomers.length; i++) {
          if(filteredCustomers.length === pageSize) {
            if(breakpointTypeReference.current >= memoizedCustomers.length) breakpointTypeReference.current = 0
  
            breakpointTypeReference.current = i
          };
          
          const customer = memoizedCustomers[i];
          if(breakpointTypeReference.current >= memoizedCustomers.length) breakpointTypeReference.current = 0
  
          if(customer.customerCondition === singleType)filteredCustomers.push(customer)
        }
        return filteredCustomers
      }else {
          const slicedArray = memoizedCustomers.slice(limit, limit + pageSize);
          return slicedArray
      }
      
  }, [memoizedCustomers, limit, singleType]);




const scrollPage = (operation:'next' | 'previous', ) => {
  if(operation === 'next') { 
    if ((limit + pageSize) < memoizedCustomers.length)setLimit(prev => prev + pageSize);
  }

  if(operation === 'previous') {
    if ((limit - pageSize) > 0) setLimit(prev => prev - pageSize);
    else setLimit(0)
  }
 
}



  return (
    <>
    <BasicTable mode={mode} data={visibleClient} />
    {singleType === 'all' &&
      <>
        <button onClick={() => scrollPage('previous')}>PREVIUS BASIC</button>
        <button onClick={() =>scrollPage('next')}>NEXT BASIC</button>
      </>
    }

    </>
  );
}


export default Customers;