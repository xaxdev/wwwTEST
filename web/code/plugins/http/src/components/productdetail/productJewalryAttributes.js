import React from 'react';
const Jewelryattr = (props) =>{
  return (
    <div className="line-h">
        <div className="col-sm-6 nopadding">
            <div className="col-md-12 col-sm-12 nopadding">
              <div className="col-md-4 col-sm-4 nopadding font-b">Jewelry Category</div>
              <div className="col-md-8 col-sm-8">{props.subType}</div>
            </div>
            <div className="col-md-12 col-sm-12 nopadding">
              <div className="col-md-4 col-sm-4 nopadding font-b">Collection</div>
              <div className="col-md-8 col-sm-8">{props.collection}</div>
            </div>
            <div className="col-md-12 col-sm-12 nopadding">
              <div className="col-md-4 col-sm-4 nopadding font-b">Brand</div>
              <div className="col-md-8 col-sm-8">{props.brand}</div>
            </div>
            <div className="col-md-12 col-sm-12 nopadding">
              <div className="col-md-4 col-sm-4 nopadding font-b">Dominant Stone</div>
              <div className="col-md-8 col-sm-8">{props.dominant}</div>
            </div>
        </div>
        <div className="col-sm-6 nopadding">
            <div className="col-md-12 col-sm-12 nopadding">
              <div className="col-md-4 col-sm-4 nopadding font-b">Metal Type</div>
              <div className="col-md-8 col-sm-8">{props.metalType}</div>
            </div>
            <div className="col-md-12 col-sm-12 nopadding">
              <div className="col-md-4 col-sm-4 nopadding font-b">Metal Color</div>
              <div className="col-md-8 col-sm-8">{props.metalColor}</div>
            </div>
            <div className="col-md-12 col-sm-12 nopadding">
              <div className="col-md-4 col-sm-4 nopadding font-b">Gross Weight</div>
              <div className="col-md-8 col-sm-8">{props.grossWeight}</div>
            </div>

            <div className="col-md-12 col-sm-12 nopadding">
              <div className="col-md-4 col-sm-4 nopadding font-b">Size</div>
              <div className="col-md-8 col-sm-8">{props.size}</div>
            </div>
        </div>
    </div>
  );
}
module.exports = Jewelryattr
