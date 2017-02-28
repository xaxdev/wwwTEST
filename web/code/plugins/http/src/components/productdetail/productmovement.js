import React,{PropTypes} from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router';
import convertBlanktodash  from '../../utils/convertBlanktodash';
import convertDate from '../../utils/convertDatemovement';
const Movement =  ({list}) =>{

  return (

    <div className="table-responsive">
      <Table responsive className="table table-bordered">
           <thead>
               <tr>
                 <th>Transfer Date</th>
                 <th>Transferred From Location</th>
                 <th>Transferred To Location</th>

               </tr>
           </thead>
           <tbody>
           {list.map(function(data, index){
               return (
                   <tr key={index}>
                     <td title="Transfer Date" className="text-center">{!!data.timeTo ? convertDate(data.timeTo) : '-'}</td>
                     <td title="Transferred From Location" className="text-center">{`[${data.fromWareHouse}] ${data.fromWarehouseName}`}</td>
                     <td title="Transferred To Location" className="text-center">{`[${data.toWareHouse}] ${data.toWareHouseName}`}</td>

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

module.exports = Movement
