import React from 'react';
import convertDate from '../../utils/convertDate';
    var styles ={
      colmd12:{
        width:'100%',
        float:'left'
      },
      colmd5:{
        width: '50%',
        float:'left',
        lineHeight:'26px'
      }
    };
const Stoneattr =  (props) =>{
  let certifiiedDate = convertDate(props.certifiiedDate);
  return (
     <div style={styles.colmd12}>
        <div style={styles.colmd12}>
            <div style={styles.colmd12}>
              <div style={styles.colmd5}>Stone Type</div>
              <div style={styles.colmd5}>{props.subType}</div>
            </div>
            <div style={styles.colmd12}>
              <div style={styles.colmd5}>Cut</div>
              <div style={styles.colmd5}>{props.cut}</div>
            </div>
            <div style={styles.colmd12}>
                <div style={styles.colmd5}>Cut Grade</div>
                <div style={styles.colmd5}>{props.cutGrade}</div>
            </div>
            <div style={styles.colmd12}>
                <div style={styles.colmd5}>Color</div>
                <div style={styles.colmd5}>{props.color}</div>
            </div>
            <div style={styles.colmd12}>
                <div style={styles.colmd5}>Clarity</div>
                <div style={styles.colmd5}>{props.clarity}</div>
            </div>
            <div style={styles.colmd12}>
                <div style={styles.colmd5}>Lot Number</div>
                <div style={styles.colmd5}>{props.lotNumber}</div>
            </div>
            <div style={styles.colmd12}>
                  <div style={styles.colmd5}>Lot Quantity</div>
                  <div style={styles.colmd5}>{props.quantity}</div>
            </div>
            <div style={styles.colmd12}>
                  <div style={styles.colmd5}>Total Carat Weight</div>
                  <div style={styles.colmd5}>{props.carat}</div>
            </div>
            <div style={styles.colmd12}>
                  <div style={styles.colmd5}>Certificate Number</div>
                  <div style={styles.colmd5}>{props.certificatedNumber}</div>
            </div>
            <div style={styles.colmd12}>
                  <div style={styles.colmd5}>Certificate Lab</div>
                  <div style={styles.colmd5}>{props.certificateLab}</div>
            </div>
            <div style={styles.colmd12}>
                  <div style={styles.colmd5}>Certificate Date</div>
                  <div style={styles.colmd5}>{certifiiedDate}</div>
            </div>
            <div style={styles.colmd12}>
                  <div style={styles.colmd5}>Origin</div>
                  <div style={styles.colmd5}>{props.origin}</div>
            </div>
            <div style={styles.colmd12}>
                  <div style={styles.colmd5}>Polish</div>
                  <div style={styles.colmd5}>{props.polish}</div>
            </div>
            <div style={styles.colmd12}>
                  <div style={styles.colmd5}>Symmetry</div>
                  <div style={styles.colmd5}>{props.symmetry}</div>
            </div>
            <div style={styles.colmd12}>
                  <div style={styles.colmd5}>Treatment</div>
                  <div style={styles.colmd5}>{props.treatment}</div>
            </div>
            <div style={styles.colmd12}>
                  <div style={styles.colmd5}>Fluorescence</div>
                  <div style={styles.colmd5}>{props.fluorescence}</div>
            </div>
        </div>
    </div>
    );
}

module.exports = Stoneattr
