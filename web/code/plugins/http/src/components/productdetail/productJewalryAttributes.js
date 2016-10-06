import React from 'react';
import convertBlanktodash  from '../../utils/convertBlanktodash';
import numberFormat2digit from '../../utils/convertNumberformatwithcomma2digit';
const Jewelryattr = (props) =>{

  let grossWeight = numberFormat2digit(props.grossWeight)
  return (
    <div className="line-h">
        <div className="col-sm-6 nopadding">
            <div className="col-md-12 col-sm-12 nopadding">
              <div className="col-md-4 col-sm-4 nopadding font-b">Jewelry Category</div>
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
              <div className="col-md-4 col-sm-4 nopadding font-b">Dominant Stone</div>
              <div className="col-md-8 col-sm-8">{convertBlanktodash(props.dominantStoneName)}</div>
            </div>
        </div>
        <div className="col-sm-6 nopadding">
            <div className="col-md-12 col-sm-12 nopadding">
              <div className="col-md-4 col-sm-4 nopadding font-b">Metal Type</div>
              <div className="col-md-8 col-sm-8">{convertBlanktodash(props.metalTypeName)}</div>
            </div>
            <div className="col-md-12 col-sm-12 nopadding">
              <div className="col-md-4 col-sm-4 nopadding font-b">Metal Color</div>
              <div className="col-md-8 col-sm-8">{convertBlanktodash(props.metalColorName)}</div>
            </div>
            <div className="col-md-12 col-sm-12 nopadding">
              <div className="col-md-4 col-sm-4 nopadding font-b">Gross Weight</div>
              <div className="col-md-8 col-sm-8">{grossWeight}</div>
            </div>

            <div className="col-md-12 col-sm-12 nopadding">
              <div className="col-md-4 col-sm-4 nopadding font-b">Size</div>
              <div className="col-md-8 col-sm-8">{convertBlanktodash(props.size)}</div>
            </div>
        </div>
    </div>
  );
}
module.exports = Jewelryattr
