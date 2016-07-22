import React,{PropTypes} from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router';
import convertBlanktodash  from '../../utils/convertBlanktodash';
import convertDate from '../../utils/convertDate';
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

               <th style={styles.border}>Symmetry</th>
               <th style={styles.border}>Fluorescence</th>
               <th style={styles.border}>Certificate Number</th>
               <th style={styles.border}>Certificate Date </th>
             </tr>
           </thead>
           <tbody>
           {props.gemstoneAttrData.map(function(data, index){
             return (
               <tr key={index}>
                 <td title="Stone Type" style={styles.textcenter}>{convertBlanktodash(props.stoneTypeName)}</td>
                 <td title="Clarity" style={styles.textcenter}>{convertBlanktodash(data.clarity)}</td>
                 <td title="Cut" style={styles.textcenter}>{convertBlanktodash(data.cut)}</td>

                 <td title="Color" style={styles.textcenter}>{convertBlanktodash(data.color)}</td>
                 <td title="QTY Of Stones" style={styles.textcenter}>{convertBlanktodash(data.quantity)}</td>
                 <td title="Total Carat Weight" style={styles.textcenter}>{convertBlanktodash(data.carat)}</td>

                 <td title="Symmetry" style={styles.textcenter}>{convertBlanktodash(data.symmetry)}</td>
                 <td title="Fluorescence" style={styles.textcenter}>{convertBlanktodash(data.fluorescence)}</td>
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
