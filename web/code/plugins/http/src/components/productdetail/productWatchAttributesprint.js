import React from 'react';
import convertBlanktodash  from '../../utils/convertBlanktodash';
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
              <div style={styles.colmd5}>{convertBlanktodash(props.strapTypeName)}</div>
            </div>
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
              <div style={styles.colmd5}>Limited Edition</div>
              <div style={styles.colmd5}>{convertBlanktodash(props.limitedEdition)}</div>
            </div>
          <div style={styles.colmd12}>
              <div style={styles.colmd5}>Limited Edition Number</div>
              <div style={styles.colmd5}>{convertBlanktodash(props.limitedEditionNumber)}</div>
            </div>
          <div style={styles.colmd12}>
              <div style={styles.colmd5}>Serial Number</div>
              <div style={styles.colmd5}>{convertBlanktodash(props.serialNumber)}</div>
            </div>
          <div style={styles.colmd12}>
              <div style={styles.colmd5}>Movement</div>
                  <div style={styles.colmd5}>{convertBlanktodash(props.movementName)}</div>
          </div>
          <div style={styles.colmd12}>
              <div style={styles.colmd5}>Complication</div>
                  <div style={styles.colmd5}>{convertBlanktodash(props.complicationName)}</div>
          </div>
          <div style={styles.colmd12}>
              <div style={styles.colmd5}>Strap Type</div>
                  <div style={styles.colmd5}>{convertBlanktodash(props.strapTypeName)}</div>
          </div>
          <div style={styles.colmd12}>
              <div style={styles.colmd5}>Strap Color</div>
                  <div style={styles.colmd5}>{convertBlanktodash(props.strapColorName)}</div>
          </div>
          <div style={styles.colmd12}>
              <div style={styles.colmd5}>Dial Index</div>
                  <div style={styles.colmd5}>{convertBlanktodash(props.dialIndexName)}</div>
          </div>
          <div style={styles.colmd12}>
              <div style={styles.colmd5}>Dial Color</div>
                  <div style={styles.colmd5}>{convertBlanktodash(props.dialColorName)}</div>
          </div>
          <div style={styles.colmd12}>
              <div style={styles.colmd5}>Dial Metal</div>
                  <div style={styles.colmd5}>{convertBlanktodash(props.dialMetalName)}</div>
          </div>
          <div style={styles.colmd12}>
              <div style={styles.colmd5}>Buckle Type</div>
                  <div style={styles.colmd5}>{convertBlanktodash(props.buckleTypeName)}</div>
          </div>
      </div>
    </div>

  );
}

module.exports = Watchattr
