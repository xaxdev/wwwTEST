import React from 'react';
    var styles ={
      colmd12:{
        width:'100%',
        float:'left'
      },
      colmd5:{
        width: '50%',
        float:'left'
      }
    };
const Jewelryattr = (props) =>{
  return (
        <div style={styles.colmd12}>
            <div style={styles.colmd12}>
              <div style={styles.colmd5}>Jewelry Category</div>
              <div style={styles.colmd5}>{props.subType}</div>
            </div>
            <div style={styles.colmd12}>
              <div style={styles.colmd5}>Collection</div>
              <div style={styles.colmd5}>{props.collection}</div>
            </div>
            <div style={styles.colmd12}>
              <div style={styles.colmd5}>Brand</div>
              <div style={styles.colmd5}>{props.brand}</div>
            </div>
            <div style={styles.colmd12}>
              <div style={styles.colmd5}>Dominant Stone</div>
              <div style={styles.colmd5}>{props.dominant}</div>
            </div>
            <div style={styles.colmd12}>
              <div style={styles.colmd5}>Metal Type</div>
              <div style={styles.colmd5}>{props.metalType}</div>
            </div>
            <div style={styles.colmd12}>
              <div style={styles.colmd5}>Metal Color</div>
              <div style={styles.colmd5}>{props.metalColor}</div>
            </div>
            <div style={styles.colmd12}>
              <div style={styles.colmd5}>Gross Weight</div>
              <div style={styles.colmd5}>{props.grossWeight}</div>
            </div>

            <div style={styles.colmd12}>
              <div style={styles.colmd5}>Size</div>
              <div style={styles.colmd5}>{props.size}</div>
            </div>
        </div>
  );
}
module.exports = Jewelryattr
