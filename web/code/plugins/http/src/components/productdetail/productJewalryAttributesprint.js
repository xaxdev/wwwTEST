import React from 'react';
const Jewelryattr = (props) =>{
  return (
    <div className="line-h">
        <div className="colmd12">
            <div className="colmd12">
              <div className="colmd6 nopadding font-b">Jewelry Category</div>
              <div className="colmd6">{props.subType}</div>
            </div>
            <div className="colmd12">
              <div className="colmd6 nopadding font-b">Collection</div>
              <div className="colmd6">{props.collection}</div>
            </div>
            <div className="colmd12">
              <div className="colmd6 nopadding font-b">Brand</div>
              <div className="colmd6">{props.brand}</div>
            </div>
            <div className="colmd12">
              <div className="colmd6 nopadding font-b">Dominant Stone</div>
              <div className="colmd6">{props.dominant}</div>
            </div>
            <div className="colmd12">
              <div className="colmd6 nopadding font-b">Metal Type</div>
              <div className="colmd6">{props.metalType}</div>
            </div>
            <div className="colmd12">
              <div className="colmd6 nopadding font-b">Metal Color</div>
              <div className="colmd6">{props.metalColor}</div>
            </div>
            <div className="colmd12">
              <div className="colmd6 nopadding font-b">Gross Weight</div>
              <div className="colmd6">{props.grossWeight}</div>
            </div>

            <div className="colmd12">
              <div className="colmd6 nopadding font-b">Size</div>
              <div className="colmd6">{props.size}</div>
            </div>
        </div>
    </div>
  );
}
module.exports = Jewelryattr
