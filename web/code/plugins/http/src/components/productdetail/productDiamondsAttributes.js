import React,{PropTypes} from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router';
import convertBlanktodash  from '../../utils/convertBlanktodash';
import convertDate from '../../utils/convertDate';
import checkInarray from '../../utils/checkInarray';
const pructdetailurl = '/productreletedetail/';
const allowGemstone = ["Loose Diamond","Diamond"];
import numberFormat from '../../utils/convertNumberformatwithcomma2digit';
import numberFormatComma from '../../utils/convertNumberformatwithcomma';
const Gemstoneattr =  (props) =>{

  let newprops = props.gemstoneAttrData.sort(function(a, b) {
        let nameA = a.stoneTypeName.toUpperCase(); // ignore upper and lowercase
        let nameB = b.stoneTypeName.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        } else {
            if (parseFloat(a.carat) < parseFloat(b.carat)) {
            return 1;
          }
          if (parseFloat(a.carat) > parseFloat(b.carat)) {
            return -1;
          }
        }

        // names must be equal
        return 0;
  });

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
               <th>Origin</th>
               <th>Fluorescence</th>
               <th>Laboratory</th>
               <th>Certificate Number</th>
               <th>Certificate Date </th>
               <th></th>
             </tr>
           </thead>
           <tbody>
           {newprops.map(function(data, index){
               if(checkInarray(allowGemstone, data.type)){
                 return (
                   <tr key={index}>
                     <td title="Stone Type" className="text-center">{convertBlanktodash(data.stoneTypeName)}</td>
                     <td title="Clarity" className="text-center">{convertBlanktodash(data.clarityName)}</td>
                     <td title="Cut" className="text-center">{convertBlanktodash(data.cutName)}</td>
                     <td title="Color" className="text-center">{convertBlanktodash(data.colorName)}</td>
                     <td title="QTY Of Stones" className="text-center">{numberFormatComma(data.quantity)}</td>
                     <td title="Total Carat Weight" className="text-center">{numberFormat(data.carat)}</td>
                     <td title="Fluorescence" className="text-center">{convertBlanktodash(data.origin)}</td>
                     <td title="Fluorescence" className="text-center">{convertBlanktodash(data.fluorescence)}</td>
                     <td title="Certificate agency" className="text-center">{!!data.certificate ? convertBlanktodash(data.certificate.agency) : '-'}</td>
                     <td title="Certificate Number," className="text-center">{!!data.certificate ? data.certificate.number: '-'}</td>
                     <td title="Certificate Date" className="text-center">{!!data.certificate ? convertDate(data.certificate.issuedDate) : '-'}</td>
                     {!!data.certificate ?
                         <td title="Certificate Number," className="icon-certificate margin-l10"
                            onClick={props.onClick.bind(this,data.certificate.number)}></td> :
                         <td title="Certificate Number," className="icon-certificate btn-primary btn-certificate-radius button-certificate"></td>}

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
