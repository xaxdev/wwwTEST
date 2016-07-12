import React from 'react';
const Watchattr =  (props) =>{
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
  return (
   <div style={styles.colmd12}>
      <div style={styles.colmd12}>
          <div style={styles.colmd12}>
              <div style={styles.colmd5}>Watch Category</div>
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
              <div style={styles.colmd5}>Metal Type</div>
              <div style={styles.colmd5}>{props.metalType}</div>
            </div>
          <div style={styles.colmd12}>
              <div style={styles.colmd5}>Metal Colour</div>
              <div style={styles.colmd5}>{props.metalColor}</div>
            </div>
          <div style={styles.colmd12}>
              <div style={styles.colmd5}>Limited Edition</div>
              <div style={styles.colmd5}>{props.limitedEdition}</div>
            </div>
          <div style={styles.colmd12}>
              <div style={styles.colmd5}>Limited Edition Number</div>
              <div style={styles.colmd5}>{props.limitedEditionNumber}</div>
            </div>
          <div style={styles.colmd12}>
              <div style={styles.colmd5}>Serial Number</div>
              <div style={styles.colmd5}>{props.serialNumber}</div>
            </div>
          <div style={styles.colmd12}>
              <div style={styles.colmd5}>Movement</div>
                  <div style={styles.colmd5}>{props.movement}</div>
          </div>
          <div style={styles.colmd12}>
              <div style={styles.colmd5}>Complication</div>
                  <div style={styles.colmd5}>{props.complication}</div>
          </div>
          <div style={styles.colmd12}>
              <div style={styles.colmd5}>Strap Type</div>
                  <div style={styles.colmd5}>{props.strapType}</div>
          </div>
          <div style={styles.colmd12}>
              <div style={styles.colmd5}>Strap Color</div>
                  <div style={styles.colmd5}>{props.strapColor}</div>
          </div>
          <div style={styles.colmd12}>
              <div style={styles.colmd5}>Dial Index</div>
                  <div style={styles.colmd5}>{props.dialIndex}</div>
          </div>
          <div style={styles.colmd12}>
              <div style={styles.colmd5}>Dial Color</div>
                  <div style={styles.colmd5}>{props.dialColor}</div>
          </div>
          <div style={styles.colmd12}>
              <div style={styles.colmd5}>Dial Metal</div>
                  <div style={styles.colmd5}>{props.dialMetal}</div>
          </div>
          <div style={styles.colmd12}>
              <div style={styles.colmd5}>Buckle Type</div>
                  <div style={styles.colmd5}>{props.buckleType}</div>
          </div>
      </div>
    </div>

  );
}

module.exports = Watchattr
