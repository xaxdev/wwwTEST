import React,{PropTypes} from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router';
import convertBlanktodash  from '../../utils/convertBlanktodash';
import convertDate from '../../utils/convertDate';
const pructdetailurl = '/productreletedetail/';
const Gemstoneattr =  (props) =>{

  return (
    <div className="table-responsive">
      <Table responsive className="table table-bordered">
           <thead>
             <tr>
               <th>Stone Type</th>
               <th>Clarity</th>
               <th>Cut</th>
               <th>Color</th>
               <th>QTY Of Stones</th>
               <th>Total Carat Weight</th>
               <th>Symmetry</th>
               <th>Fluorescence</th>
               <th>Certificate Number</th>
               <th>Certificate Date </th>
             </tr>
           </thead>
           <tbody>
           {props.gemstoneAttrData.map(function(data, index){
             return (
               <tr key={index}>
                 <td title="Stone Type" className="text-center">{props.stoneTypeName}</td>
                 <td title="Clarity" className="text-center">{data.clarity}</td>
                 <td title="Cut" className="text-center">{data.cut}</td>
                 <td title="Color" className="text-center">{data.color}</td>
                 <td title="QTY Of Stones" className="text-center">{data.quantity}</td>
                 <td title="Total Carat Weight" className="text-center">{data.carat}</td>
                 <td title="Symmetry" className="text-center">{data.symmetry}</td>
                 <td title="Fluorescence" className="text-center">{data.fluorescence}</td>
                 <td title="Certificate Number," className="text-center">{data.number}</td>
                 <td title="Certificate Date" className="text-center">{!!data.certificate ? convertDate(data.certificate.issuedDate) : '-'}</td>

               </tr>
            )
            })}

               </tbody>
                   </Table>
    </div>
  );
}
Gemstoneattr.propTypes = {
  gemstoneAttrData: PropTypes.array.isRequired
}
module.exports = Gemstoneattr
