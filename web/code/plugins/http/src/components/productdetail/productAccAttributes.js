import React from 'react';
import convertBlanktodash  from '../../utils/convertBlanktodash';
const accAttr = (props) =>{
  return (
    <div className="line-h">
        <div className="col-sm-6 nopadding">
            <div className="col-md-12 col-sm-12 nopadding">
              <div className="col-md-4 col-sm-4 nopadding font-b">Accessory Type</div>
              <div className="col-md-8 col-sm-8">{convertBlanktodash(props.subTypeName)}</div>
            </div>
            <div className="col-md-12 col-sm-12 nopadding">
              <div className="col-md-4 col-sm-4 nopadding font-b">Collection</div>
              <div className="col-md-8 col-sm-8">{convertBlanktodash(props.collectionName)}</div>
            </div>
            <div className="col-md-12 col-sm-12 nopadding">
              <div className="col-md-4 col-sm-4 nopadding font-b">Brand</div>
              <div className="col-md-8 col-sm-8">{convertBlanktodash(props.brandName)}</div>
            </div>
            <div className="col-md-12 col-sm-12 nopadding">
              <div className="col-md-4 col-sm-4 nopadding font-b">Metal Type</div>
              <div className="col-md-8 col-sm-8">{convertBlanktodash(props.metalTypeName)}</div>
            </div>
        </div>
        <div className="col-sm-6 nopadding">
            <div className="col-md-12 col-sm-12 nopadding">
              <div className="col-md-4 col-sm-4 nopadding font-b">Metal Colour</div>
              <div className="col-md-8 col-sm-8">{convertBlanktodash(props.metalColorName)}</div>
            </div>
            <div className="col-md-12 col-sm-12 nopadding">
              <div className="col-md-4 col-sm-4 nopadding font-b">Dominant Stone</div>
              <div className="col-md-8 col-sm-8">{convertBlanktodash(props.dominantStoneName)}</div>
            </div>
            <div className="col-md-12 col-sm-12 nopadding">
              <div className="col-md-4 col-sm-4 nopadding font-b">Gross Weight</div>
              <div className="col-md-8 col-sm-8">{convertBlanktodash(props.grossWeight)}</div>
            </div>
        </div>
    </div>
  );
}
module.exports = accAttr
