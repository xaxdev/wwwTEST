import React,{PropTypes} from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router';
import convertBlanktodash  from '../../utils/convertBlanktodash';
import convertDate from '../../utils/convertDate';
import checkInarray from '../../utils/checkInarray';
const pructdetailurl = '/productreletedetail/';
const allowGemstone = ["Stone"];
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
               <th>Certificate agency </th>
             </tr>
           </thead>
           <tbody>
           {props.gemstoneAttrData.map(function(data, index){
               if(checkInarray(allowGemstone, data.type)){
                 return (
                   <tr key={index}>
                     <td title="Stone Type" className="text-center">{convertBlanktodash(data.stoneTypeName)}</td>
                     <td title="Clarity" className="text-center">{convertBlanktodash(data.clarityName)}</td>
                     <td title="Cut" className="text-center">{convertBlanktodash(data.cutName)}</td>
                     <td title="Color" className="text-center">{convertBlanktodash(data.colorName)}</td>
                     <td title="QTY Of Stones" className="text-center">{convertBlanktodash(data.quantity)}</td>
                     <td title="Total Carat Weight" className="text-center">{convertBlanktodash(data.carat)}</td>
                     <td title="Symmetry" className="text-center">{convertBlanktodash(data.symmetry)}</td>
                     <td title="Fluorescence" className="text-center">{convertBlanktodash(data.fluorescence)}</td>
                     <td title="Certificate Number," className="text-center">{!!data.certificate ? data.certificate.number: '-'}</td>
                     <td title="Certificate Date" className="text-center">{!!data.certificate ? convertDate(data.certificate.issuedDate) : '-'}</td>
                     <td title="Certificate agency" className="text-center">{!!data.certificate ? convertBlanktodash(data.certificate.agency) : '-'}</td>
                   </tr>
                )
              }
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
