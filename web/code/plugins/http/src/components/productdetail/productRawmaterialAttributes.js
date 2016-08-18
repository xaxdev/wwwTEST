import React,{PropTypes} from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router';
import convertBlanktodash  from '../../utils/convertBlanktodash';
import convertDate from '../../utils/convertDate';
import checkInarray from '../../utils/checkInarray';
const pructdetailurl = '/productreletedetail/';
const allowGemstone = ["Loose Diamond","Stone"];
const Gemstoneattr =  (props) =>{

  return (
    <div className="table-responsive">
      <Table responsive className="table table-bordered">
           <thead>
             <tr>
               <th>Stone Type</th>
               <th>Total Carat Weight</th>
             </tr>
           </thead>
           <tbody>
           {props.gemstoneAttrData.map(function(data, index){
               if(!checkInarray(allowGemstone, data.type)){
                 return (
                   <tr key={index}>
                     <td title="Stone Type" className="text-center">{convertBlanktodash(data.stoneTypeName)}</td>
                     <td title="Total Carat Weight" className="text-center">{convertBlanktodash(data.carat)}</td>
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
