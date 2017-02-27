import React,{PropTypes} from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router';
import convertBlanktodash  from '../../utils/convertBlanktodash';
import convertDate from '../../utils/convertDatemovement';
const Goc =  ({list}) =>{

  return (

    <div className="table-responsive">
      <Table responsive className="table table-bordered">
           <thead>
               <tr>
                 <th>Transfer Date</th>
                 <th>Transferred from</th>
                 <th>Transferred to</th>

               </tr>
           </thead>
           <tbody>
           {list.map(function(data, index){
               let transferfrom = ''
               let transferto = ''

               if (data.status === 'GOC') {
                 transferfrom = `[${data.warehouse}] ${data.warehouseName}`
                 transferto = `Customer Name (${data.firstName} ${data.middleName} ${data.lastName}) ${data.customerID}`
               } else {
                 transferfrom = `Customer Name (${data.firstName} ${data.middleName} ${data.lastName}) ${data.customerID}`
                 transferto = `[${data.warehouse}] ${data.warehouseName}`
               }
               return (
                   <tr key={index}>
                     <td title="Transfer Date" className="text-center">{!!data.timeTo ? convertDate(data.timeTo) : '-'}</td>
                     <td title="Transferred from" className="text-center">{transferfrom}</td>
                     <td title="Transferred to" className="text-center">{transferto}</td>

                   </tr>
                )
            })}

               </tbody>
                   </Table>
                   {!!list && list.length === 0 &&
                     <div className="text-center">Data not found</div>
                   }
    </div>
  );
}

module.exports = Goc
