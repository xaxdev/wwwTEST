import React,{PropTypes} from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router';
import convertBlanktodash  from '../../utils/convertBlanktodash';
import convertDate from '../../utils/convertDate';
import checkInarray from '../../utils/checkInarray';
const allowGemstone = ["Loose Diamond","Stone"];
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
               <th style={styles.border}>Total Carat Weight</th>
             </tr>
           </thead>
           <tbody>
           {props.gemstoneAttrData.map(function(data, index){

             if(!checkInarray(allowGemstone, data.type)){
                 return (
                   <tr key={index}>
                     <td title="Stone Type" style={styles.textcenter}>{convertBlanktodash(data.stoneTypeName)}</td>
                     <td title="Total Carat Weight" style={styles.textcenter}>{convertBlanktodash(data.carat)}</td>
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
