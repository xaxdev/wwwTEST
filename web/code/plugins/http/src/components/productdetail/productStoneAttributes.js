import React from 'react';
const Stoneattr =  (props) =>{
  return (
    <div className="line-h">
        <div className="col-sm-6 nopadding">
            <div className="col-md-12 col-sm-12 nopadding">
              <div className="col-md-4 col-sm-4 nopadding font-b">Stone Type</div>
              <div className="col-md-8 col-sm-8">{props.subType}</div>
            </div>
            <div className="col-md-12 col-sm-12 nopadding">
              <div className="col-md-4 col-sm-4 nopadding font-b">Cut</div>
              <div className="col-md-8 col-sm-8">{props.cut}</div>
            </div>
            <div className="col-md-12 col-sm-12 nopadding">
                <div className="col-md-4 col-sm-4 nopadding font-b">Cut Grade</div>
                <div className="col-md-8 col-sm-8">{props.cutGrade}</div>
            </div>
            <div className="col-md-12 col-sm-12 nopadding">
                <div className="col-md-4 col-sm-4 nopadding font-b">Color</div>
                <div className="col-md-8 col-sm-8">{props.color}</div>
            </div>
            <div className="col-md-12 col-sm-12 nopadding">
                <div className="col-md-4 col-sm-4 nopadding font-b">Clarity</div>
                <div className="col-md-8 col-sm-8">{props.clarity}</div>
            </div>
            <div className="col-md-12 col-sm-12 nopadding">
                <div className="col-md-4 col-sm-4 nopadding font-b">Lot Number</div>
                <div className="col-md-8 col-sm-8">{props.lotNumber}</div>
            </div>
            <div className="col-md-12 col-sm-12 nopadding">
                  <div className="col-md-4 col-sm-4 nopadding font-b">Lot Quantity</div>
                  <div className="col-md-8 col-sm-8">{props.quantity}</div>
            </div>
            <div className="col-md-12 col-sm-12 nopadding">
                  <div className="col-md-4 col-sm-4 nopadding font-b">Total Carat Weight</div>
                  <div className="col-md-8 col-sm-8">{props.carat}</div>
            </div>
        </div>
        <div className="col-sm-6 nopadding">
            <div className="col-md-12 col-sm-12 nopadding">
                  <div className="col-md-4 col-sm-4 nopadding font-b">Certificate Number</div>
                  <div className="col-md-8 col-sm-8">{props.certificatedNumber}</div>
            </div>
            <div className="col-md-12 col-sm-12 nopadding">
                  <div className="col-md-4 col-sm-4 nopadding font-b">Certificate Lab</div>
                  <div className="col-md-8 col-sm-8">{props.certificateLab}</div>
            </div>
            <div className="col-md-12 col-sm-12 nopadding">
                  <div className="col-md-4 col-sm-4 nopadding font-b">Certificate Date</div>
                  <div className="col-md-8 col-sm-8">{props.certifiiedDate}</div>
            </div>
            <div className="col-md-12 col-sm-12 nopadding">
                  <div className="col-md-4 col-sm-4 nopadding font-b">Origin</div>
                  <div className="col-md-8 col-sm-8">{props.origin}</div>
            </div>
            <div className="col-md-12 col-sm-12 nopadding">
                  <div className="col-md-4 col-sm-4 nopadding font-b">Polish</div>
                  <div className="col-md-8 col-sm-8">{props.polish}</div>
            </div>
            <div className="col-md-12 col-sm-12 nopadding">
                  <div className="col-md-4 col-sm-4 nopadding font-b">Symmetry</div>
                  <div className="col-md-8 col-sm-8">{props.symmetry}</div>
            </div>
            <div className="col-md-12 col-sm-12 nopadding">
                  <div className="col-md-4 col-sm-4 nopadding font-b">Treatment</div>
                  <div className="col-md-8 col-sm-8">{props.treatment}</div>
            </div>
            <div className="col-md-12 col-sm-12 nopadding">
                  <div className="col-md-4 col-sm-4 nopadding font-b">Fluorescence</div>
                  <div className="col-md-8 col-sm-8">{props.fluorescence}</div>
            </div>
        </div>
    </div>
    );
}

module.exports = Stoneattr
