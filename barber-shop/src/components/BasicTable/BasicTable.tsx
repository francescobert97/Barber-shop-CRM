import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CmTooltip from '../cm-tooltip/CmTooltip';
import React, { useState } from 'react';
import { ICustomer } from '../../shared/models/datacustomer.model';
import { ICustomerInformations } from '../../hooks/useCustomerData/models/usecustomer.model';

export default function BasicTable({data, mode}:{data:ICustomerInformations[], mode?:'Upselling'} ){
  const [show, setShow] = useState({id: '0', show:false})
  const showData = (id:string) =>{
      setShow({id, show: true})
  }
  
  const publishMessage = (name:string) => {
      return `Ciao ${name}, siamo La squadra della barba e ti abbiamo contattato perchè.....`
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nome cliente</TableCell>
            <TableCell align="right">email</TableCell>
            <TableCell align="right">N. servizi acquistati</TableCell>
            <TableCell align="right">Condizione</TableCell>
            <TableCell align="right">ultima data di acquisto</TableCell>
            <TableCell align="right">Contatta</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((customer: {
  customer: ICustomer;
  lastBoughtData: string;
  customerCondition: string;
}) => (
  <React.Fragment key={customer.customer.id}>

            {(mode && (show && show.id === customer.customer.id)) && <CmTooltip services={customer.customer.services} />}
            <TableRow onMouseOver={() => mode? showData(customer.customer.id) : undefined}  
              key={customer.customer.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {customer.customer.fullname}
              </TableCell>
              <TableCell  align="right">{customer.customer.mail}</TableCell>
              <TableCell align="right">{customer.customer.services.length}</TableCell>
              <TableCell align="right">{customer.customerCondition}</TableCell>
              <TableCell align="right">{customer.lastBoughtData}</TableCell>
              <TableCell align="right"><a href={`mailto:${customer.customer.mail}?subject=La squadra della barba&body=${publishMessage(customer.customer.fullname)}`}>Clicca per contattare</a></TableCell>
            </TableRow>
  </React.Fragment>

          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
  

}