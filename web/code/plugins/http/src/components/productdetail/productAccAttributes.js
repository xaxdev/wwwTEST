import React from 'react';
import convertBlanktodash  from '../../utils/convertBlanktodash';
const accAttr = (props) =>{
  return (
    <div className="line-h">
        <div className="col-sm-6 nopadding">
            <div className="col-md-12 col-sm-12 nopadding">
              <div className="col-md-4 col-sm-4 nopadding font-b">Accessory Type</div>
              <div className="col-md-8 col-sm-8">{convertBlanktodash(props.accessoryType)}</div>
            </div>
            <div className="col-md-12 col-sm-12 nopadding">
              <div className="col-md-4 col-sm-4 nopadding font-b">Collection</div>
              <div className="col-md-8 col-sm-8">{convertBlanktodash(props.collection)}</div>
            </div>
            <div className="col-md-12 col-sm-12 nopadding">
              <div className="col-md-4 col-sm-4 nopadding font-b">Brand</div>
              <div className="col-md-8 col-sm-8">{convertBlanktodash(props.brand)}</div>
            </div>
            <div className="col-md-12 col-sm-12 nopadding">
              <div className="col-md-4 col-sm-4 nopadding font-b">Metal Type</div>
              <div className="col-md-8 col-sm-8">{convertBlanktodash(props.metalType)}</div>
            </div>
        </div>
        <div className="col-sm-6 nopadding">
            <div className="col-md-12 col-sm-12 nopadding">
              <div className="col-md-4 col-sm-4 nopadding font-b">Metal Colour</div>
              <div className="col-md-8 col-sm-8">{convertBlanktodash(props.metalColor)}</div>
            </div>
            <div className="col-md-12 col-sm-12 nopadding">
              <div className="col-md-4 col-sm-4 nopadding font-b">Dominant Stone</div>
              <div className="col-md-8 col-sm-8">{convertBlanktodash(props.dominantStone)}</div>
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