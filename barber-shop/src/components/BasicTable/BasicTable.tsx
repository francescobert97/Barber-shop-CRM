import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ICustomer } from '../../shared/models/models';
import CmTooltip from '../cm-tooltip/CmTooltip';
import { useState } from 'react';

export default function BasicTable({data, mode}:{data:{
  customer: ICustomer;
  lastBoughtData: string;
  customerCondition: string;
}[], mode?:'Upselling'} ){
  console.log(mode)
  const [show, setShow] = useState({id: '0', show:false})
  const showData = (id:string) =>{
    console.log('imposto show')
      setShow({id, show: true})
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
  <>

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
              <TableCell align="right">Clicca per contattare</TableCell>
            </TableRow>
  </>

          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
  

}