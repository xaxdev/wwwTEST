import React from 'react';
import convertBlanktodash  from '../../utils/convertBlanktodash';

const styles ={
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
const obaAttr = (props) =>{
  return (
    <div style={styles.colmd12}>
            <div style={styles.colmd12}>
              <div style={styles.colmd5}>Collection</div>
              <div style={styles.colmd5}>{convertBlanktodash(props.collectionName)}</div>
            </div>
            <div style={styles.colmd12}>
              <div style={styles.colmd5}>Brand</div>
              <div style={styles.colmd5}>{convertBlanktodash(props.brandName)}</div>
            </div>
            <div style={styles.colmd12}>
              <div style={styles.colmd5}>Metal Type</div>
              <div style={styles.colmd5}>{convertBlanktodash(props.metalTypeName)}</div>
            </div>
            <div style={styles.colmd12}>
              <div style={styles.colmd5}>Metal Colour</div>
              <div style={styles.colmd5}>{convertBlanktodash(props.metalColorName)}</div>
            </div>
            <div style={styles.colmd12}>
              <div style={styles.colmd5}>OBA Dimension</div>
              <div style={styles.colmd5}>{convertBlanktodash(props.dimensions)}</div>
            </div>
            <div style={styles.colmd12}>
              <div style={styles.colmd5}>Dominant Stone</div>
              <div style={styles.colmd5}>{convertBlanktodash(props.dominantStoneName)}</div>
            </div>
            <div style={styles.colmd12}>
              <div style={styles.colmd5}>Gross Weight</div>
              <div style={styles.colmd5}>{convertBlanktodash(props.grossWeight)}</div>
            </div>

      </div>
  );
}
module.exports = obaAttr
