import React from 'react';
const Watchattr =  (props) =>{
  return (
   <div className="line-h">
      <div className="col-sm-6 nopadding">
          <div className="col-md-12 col-sm-12 nopadding">
              <div className="col-md-4 col-sm-4 nopadding font-b">Watch Category</div>
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
              <div className="col-md-4 col-sm-4 nopadding font-b">Metal Type</div>
              <div className="col-md-8 col-sm-8">{props.metalType}</div>
            </div>
          <div className="col-md-12 col-sm-12 nopadding">
              <div className="col-md-4 col-sm-4 nopadding font-b">Metal Colour</div>
              <div className="col-md-8 col-sm-8">{props.metalColor}</div>
            </div>
          <div className="col-md-12 col-sm-12 nopadding">
              <div className="col-md-4 col-sm-4 nopadding font-b">Limited Edition</div>
              <div className="col-md-8 col-sm-8">{props.limitedEdition}</div>
            </div>
          <div className="col-md-12 col-sm-12 nopadding">
              <div className="col-md-4 col-sm-4 nopadding font-b">Limited Edition Number</div>
              <div className="col-md-8 col-sm-8">{props.limitedEditionNumber}</div>
            </div>
          <div className="col-md-12 col-sm-12 nopadding">
              <div className="col-md-4 col-sm-4 nopadding font-b">Serial Number</div>
              <div className="col-md-8 col-sm-8">{props.serialNumber}</div>
            </div>
      </div>
      <div className="col-sm-6 nopadding">
          <div className="col-md-12 col-sm-12 nopadding">
              <div className="col-md-4 col-sm-4 nopadding font-b">Movement</div>
                  <div className="col-md-8 col-sm-8">{props.movement}</div>
          </div>
          <div className="col-md-12 col-sm-12 nopadding">
              <div className="col-md-4 col-sm-4 nopadding font-b">Complication</div>
                  <div className="col-md-8 col-sm-8">{props.complication}</div>
          </div>
          <div className="col-md-12 col-sm-12 nopadding">
              <div className="col-md-4 col-sm-4 nopadding font-b">Strap Type</div>
                  <div className="col-md-8 col-sm-8">{props.strapType}</div>
          </div>
          <div className="col-md-12 col-sm-12 nopadding">
              <div className="col-md-4 col-sm-4 nopadding font-b">Strap Color</div>
                  <div className="col-md-8 col-sm-8">{props.strapColor}</div>
          </div>
          <div className="col-md-12 col-sm-12 nopadding">
              <div className="col-md-4 col-sm-4 nopadding font-b">Dial Index</div>
                  <div className="col-md-8 col-sm-8">{props.dialIndex}</div>
          </div>
          <div className="col-md-12 col-sm-12 nopadding">
              <div className="col-md-4 col-sm-4 nopadding font-b">Dial Color</div>
                  <div className="col-md-8 col-sm-8">{props.dialColor}</div>
          </div>
          <div className="col-md-12 col-sm-12 nopadding">
              <div className="col-md-4 col-sm-4 nopadding font-b">Dial Metal</div>
                  <div className="col-md-8 col-sm-8">{props.dialMetal}</div>
          </div>
          <div className="col-md-12 col-sm-12 nopadding">
              <div className="col-md-4 col-sm-4 nopadding font-b">Buckle Type</div>
                  <div className="col-md-8 col-sm-8">{props.buckleType}</div>
          </div>
      </div>
    </div>

  );
}

module.exports = Watchattr
