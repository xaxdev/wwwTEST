import React,{PropTypes} from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router';

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
               <th>Cut Grade</th>
               <th>Color</th>
               <th>QTY Of Stones</th>
               <th>Total Carat Weight</th>
               <th>Polish</th>
               <th>Symmetry</th>
               <th>Treatment</th>
               <th>Fluorescence</th>

             </tr>
           </thead>
           <tbody>
           {props.gemstoneAttrData.map(function(data, index){
             return (
               <tr key={index}>
                 <td title="Stone Type" className="text-center">{props.subType}</td>
                 <td title="Clarity" className="text-center">{data.clarity}</td>
                 <td title="Cut" className="text-center">{data.cut}</td>
                 <td title="Cut Grade" className="text-center">{data.cutGrade}</td>
                 <td title="Color" className="text-center">{data.color}</td>
                 <td title="QTY Of Stones" className="text-center">{data.quantity}</td>
                 <td title="Total Carat Weight" className="text-center">{data.totalCaratWeight}</td>
                 <td title="Polish" className="text-center">{data.polish}</td>
                 <td title="Symmetry" className="text-center">{data.symmetry}</td>
                 <td title="Treatment" className="text-center">{data.treatment}</td>
                 <td title="Fluorescence" className="text-center">{data.fluorescence}</td>

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
