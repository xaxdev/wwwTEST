import React,{PropTypes} from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router';
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
               <th style={styles.border}>Cut Grade</th>
               <th style={styles.border}>Color</th>
               <th style={styles.border}>QTY Of Stones</th>
               <th style={styles.border}>Total Carat Weight</th>
               <th style={styles.border}>Polish</th>
               <th style={styles.border}>Symmetry</th>
               <th style={styles.border}>Treatment</th>
               <th style={styles.border}>Fluorescence</th>

             </tr>
           </thead>
           <tbody>
           {props.gemstoneAttrData.map(function(data, index){
             return (
               <tr key={index}>
                 <td title="Stone Type" style={styles.textcenter}>{props.subType}</td>
                 <td title="Clarity" style={styles.textcenter}>{data.clarity}</td>
                 <td title="Cut" style={styles.textcenter}>{data.cut}</td>
                 <td title="Cut Grade" style={styles.textcenter}>{data.cutGrade}</td>
                 <td title="Color" style={styles.textcenter}>{data.color}</td>
                 <td title="QTY Of Stones" style={styles.textcenter}>{data.quantity}</td>
                 <td title="Total Carat Weight" style={styles.textcenter}>{data.totalCaratWeight}</td>
                 <td title="Polish" style={styles.textcenter}>{data.polish}</td>
                 <td title="Symmetry" style={styles.textcenter}>{data.symmetry}</td>
                 <td title="Treatment" style={styles.textcenter}>{data.treatment}</td>
                 <td title="Fluorescence" style={styles.textcenter}>{data.fluorescence}</td>

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
