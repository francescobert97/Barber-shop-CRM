import { useEffect, useMemo, useRef, useState } from "react";
import BasicTable from "../../components/BasicTable/BasicTable";
import { useCustomerData } from "../../hooks/useCustomerData/useCustomerData";
import { ICustomerInformations } from "../../hooks/useCustomerData/models/usecustomer.model";
import { Button } from "@mui/material";
import { useLocation } from "react-router-dom";

  const getToUpsellList = (arr:ICustomerInformations[]) => {
    const result = arr.filter(customer => {
    
      const toUpsell = customer.customer.services.filter(service => ((service.type === 'Advanced' || service.type === 'Starter' ) && service.status === 'OrderEmitted')) || [];
      const discard = customer.customer.services.filter(service => service.type === 'Ultimate' && service.status !== 'Canceled' ) || [];
      
         return toUpsell.length > 0 && discard.length === 0;
  })

  return result
}

export const Customers = ({singleType, mode}:{singleType:'bad' | 'normal' | 'best' | 'all', mode?:'Upselling'}) => {
      const customerHook = useCustomerData()
      const location = useLocation();
     const memoizedCustomers =  useMemo(() =>{
      if(mode)return  getToUpsellList(customerHook.getCustomerInformation())
      else return customerHook.getCustomerInformation()
     } , [mode])
    const [limit, setLimit] = useState(0)
    const breakpointTypeReference =  useRef(0) 

     useEffect(()=>setLimit(0) ,[location.pathname])

  const pageSize = 20;
    const visibleClient = useMemo(() => {
        const filteredCustomers = []
        const filteredCustBreakOverCust = breakpointTypeReference.current >= memoizedCustomers.length;
      if(singleType !== 'all') {
        for (let i = limit; i < memoizedCustomers.length; i++) {
         
          if(filteredCustomers.length === pageSize) {
            if(filteredCustBreakOverCust) breakpointTypeReference.current = 0
  
            breakpointTypeReference.current = i
          };
          
          const customer = memoizedCustomers[i];
          if(filteredCustBreakOverCust) breakpointTypeReference.current = 0
  
          if(customer.customerCondition === singleType)filteredCustomers.push(customer)
        }
        return filteredCustomers
      }
      else {
          const slicedArray = memoizedCustomers.slice(limit, limit + pageSize);
          return slicedArray
      }
      
  }, [memoizedCustomers, limit, singleType]);




const scrollPage = (operation:'next' | 'previous', ) => {
  if(operation === 'next') { 
    if(visibleClient.length === pageSize) setLimit(prev => prev+pageSize)
  }

  if(operation === 'previous') {    
    if ((limit - pageSize) > 0) setLimit(prev => prev - pageSize);
    else setLimit(0)
  }
 
}



  return (
    <div key={location.pathname}>
    <BasicTable mode={mode} data={visibleClient} />
      <div className="d-flex justify-content-center mt-2 gap-5">
        {limit > 0 && <Button variant="contained" color="primary" onClick={() => scrollPage('previous')}>Prev</Button>}
        {visibleClient.length === pageSize && <Button variant="contained" color="primary" onClick={() =>scrollPage('next')}>Next</Button>}
      </div>


    </div>
  );
}


export default Customers;

//{singleType === 'all' &&
