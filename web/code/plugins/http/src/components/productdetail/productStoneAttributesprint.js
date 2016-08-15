import React from 'react';
import convertDate from '../../utils/convertDate';
import convertBlanktodash  from '../../utils/convertBlanktodash';
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
              <div style={styles.colmd5}>{convertBlanktodash(props.subTypeName)}</div>
            </div>
            <div style={styles.colmd12}>
              <div style={styles.colmd5}>Cut</div>
              <div style={styles.colmd5}>{convertBlanktodash(props.cutName)}</div>
            </div>

            <div style={styles.colmd12}>
                <div style={styles.colmd5}>Color</div>
                <div style={styles.colmd5}>{convertBlanktodash(props.colorName)}</div>
            </div>
            <div style={styles.colmd12}>
                <div style={styles.colmd5}>Clarity</div>
                <div style={styles.colmd5}>{convertBlanktodash(props.clarityName)}</div>
            </div>
            <div style={styles.colmd12}>
                <div style={styles.colmd5}>Lot Number</div>
                <div style={styles.colmd5}>{convertBlanktodash(props.lotNumber)}</div>
            </div>
            <div style={styles.colmd12}>
                  <div style={styles.colmd5}>Lot Quantity</div>
                  <div style={styles.colmd5}>{convertBlanktodash(props.quantity)}</div>
            </div>
            <div style={styles.colmd12}>
                  <div style={styles.colmd5}>Total Carat Weight</div>
                  <div style={styles.colmd5}>{convertBlanktodash(props.carat)}</div>
            </div>
            <div style={styles.colmd12}>
                  <div style={styles.colmd5}>Certificate Number</div>
                  <div style={styles.colmd5}>{!!props.certificates.length ? props.certificates[0].number : '-'}</div>
            </div>
            <div style={styles.colmd12}>
                  <div style={styles.colmd5}>Certificate Lab</div>
                  <div style={styles.colmd5}>{!!props.certificates.length ? props.certificates[0].agency : '-'}</div>
            </div>
            <div style={styles.colmd12}>
                  <div style={styles.colmd5}>Certificate Date</div>
                  <div style={styles.colmd5}>{!!props.certificates.length ? convertDate(props.certificates[0].issuedDate) : '-'}</div>
            </div>
            <div style={styles.colmd12}>
                  <div style={styles.colmd5}>Origin</div>
                  <div style={styles.colmd5}>{convertBlanktodash(props.origin)}</div>
            </div>
            <div style={styles.colmd12}>
                  <div style={styles.colmd5}>Polish</div>
                  <div style={styles.colmd5}>{convertBlanktodash(props.polish)}</div>
            </div>
            <div style={styles.colmd12}>
                  <div style={styles.colmd5}>Symmetry</div>
                  <div style={styles.colmd5}>{convertBlanktodash(props.symmetry)}</div>
            </div>
            <div style={styles.colmd12}>
                  <div style={styles.colmd5}>Treatment</div>
                  <div style={styles.colmd5}>{convertBlanktodash(props.treatment)}</div>
            </div>
            <div style={styles.colmd12}>
                  <div style={styles.colmd5}>Fluorescence</div>
                  <div style={styles.colmd5}>{convertBlanktodash(props.fluorescence)}</div>
            </div>
        </div>
    </div>
    );
}

module.exports = Stoneattr