import React from 'react';
const Watchattr =  (props) =>{
  return (
   <div className="line-h">
      <div className="colmd12">
          <div className="colmd12">
              <div className="colmd6 nopadding font-b">Watch Category</div>
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
              <div className="colmd6 nopadding font-b">Metal Type</div>
              <div className="colmd6">{props.metalType}</div>
            </div>
          <div className="colmd12">
              <div className="colmd6 nopadding font-b">Metal Colour</div>
              <div className="colmd6">{props.metalColor}</div>
            </div>
          <div className="colmd12">
              <div className="colmd6 nopadding font-b">Limited Edition</div>
              <div className="colmd6">{props.limitedEdition}</div>
            </div>
          <div className="colmd12">
              <div className="colmd6 nopadding font-b">Limited Edition Number</div>
              <div className="colmd6">{props.limitedEditionNumber}</div>
            </div>
          <div className="colmd12">
              <div className="colmd6 nopadding font-b">Serial Number</div>
              <div className="colmd6">{props.serialNumber}</div>
            </div>
          <div className="colmd12">
              <div className="colmd6 nopadding font-b">Movement</div>
                  <div className="colmd6">{props.movement}</div>
          </div>
          <div className="colmd12">
              <div className="colmd6 nopadding font-b">Complication</div>
                  <div className="colmd6">{props.complication}</div>
          </div>
          <div className="colmd12">
              <div className="colmd6 nopadding font-b">Strap Type</div>
                  <div className="colmd6">{props.strapType}</div>
          </div>
          <div className="colmd12">
              <div className="colmd6 nopadding font-b">Strap Color</div>
                  <div className="colmd6">{props.strapColor}</div>
          </div>
          <div className="colmd12">
              <div className="colmd6 nopadding font-b">Dial Index</div>
                  <div className="colmd6">{props.dialIndex}</div>
          </div>
          <div className="colmd12">
              <div className="colmd6 nopadding font-b">Dial Color</div>
                  <div className="colmd6">{props.dialColor}</div>
          </div>
          <div className="colmd12">
              <div className="colmd6 nopadding font-b">Dial Metal</div>
                  <div className="colmd6">{props.dialMetal}</div>
          </div>
          <div className="colmd12">
              <div className="colmd6 nopadding font-b">Buckle Type</div>
                  <div className="colmd6">{props.buckleType}</div>
          </div>
      </div>
    </div>

  );
}

module.exports = Watchattr
