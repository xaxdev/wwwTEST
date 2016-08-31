import React,{PropTypes} from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router';
import convertBlanktodash  from '../../utils/convertBlanktodash';
import convertDate from '../../utils/convertDate';
import checkInarray from '../../utils/checkInarray';
import numberFormat from '../../utils/convertNumberformatwithcomma2digit';
const allowGemstone = ["Stone"];
    var styles ={
      colmd12:{
        width:'100%',
        float:'left'
      },
      colmd5:{
        width: '50%',
        float:'left'
      },
      colmd2:{
        width: '20%',
        float:'left'
      },
      tableresponsive:{
        width:'100%'
      },
      table:{
          width: '100%',
          borderSpacing: '0',
          borderCollapse: 'collapse'
      },
      th:{
        background: '#eee'
      },
      border:{
        border: '1px solid #5c5954',
        padding:'10px 5px',
        whiteSpace: 'nowrap'
      },
      textcenter:{
        border: '1px solid #5c5954',
        padding:'5px 5px',
        textAlign:'center'
      }
    };
const pructdetailurl = '/productreletedetail/';
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
    <div style={styles.tableresponsive}>
      <Table responsive style={styles.table}>
           <thead style={styles.th}>
             <tr style={styles.border}>
               <th style={styles.border}>Stone Type</th>
               <th style={styles.border}>Clarity</th>
               <th style={styles.border}>Cut</th>

               <th style={styles.border}>Color</th>
               <th style={styles.border}>QTY Of Stones</th>
               <th style={styles.border}>Total Carat Weight</th>
               <th style={styles.border}>Origin</th>
               <th style={styles.border}>Fluorescence</th>
               <th style={styles.border}>Laboratory</th>
               <th style={styles.border}>Certificate Number</th>
               <th style={styles.border}>Certificate Date </th>

             </tr>
           </thead>
           <tbody>
           {newprops.map(function(data, index){

             if(checkInarray(allowGemstone, data.type)){
                 return (
                   <tr key={index}>
                     <td title="Stone Type" style={styles.textcenter}>{convertBlanktodash(data.stoneTypeName)}</td>
                     <td title="Clarity" style={styles.textcenter}>{convertBlanktodash(data.clarityName)}</td>
                     <td title="Cut" style={styles.textcenter}>{convertBlanktodash(data.cutName)}</td>
                     <td title="Color" style={styles.textcenter}>{convertBlanktodash(data.colorName)}</td>
                     <td title="QTY Of Stones" style={styles.textcenter}>{convertBlanktodash(data.quantity)}</td>
                     <td title="Total Carat Weight" style={styles.textcenter}>{numberFormat(data.carat)}</td>
                     <td title="Origin" style={styles.textcenter}>{convertBlanktodash(data.origin)}</td>
                     <td title="Fluorescence" style={styles.textcenter}>{convertBlanktodash(data.fluorescence)}</td>
                     <td title="Certificate agency" style={styles.textcenter}>{!!data.certificate ? convertBlanktodash(data.certificate.agency) : '-'}</td>
                     <td title="Certificate Number," style={styles.textcenter}>{!!data.certificate ? data.certificate.number: '-'}</td>
                     <td title="Certificate Date" style={styles.textcenter}>{!!data.certificate ? convertDate(data.certificate.issuedDate) : '-'}</td>


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
