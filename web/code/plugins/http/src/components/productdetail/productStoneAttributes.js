import React from 'react';
import convertDate from '../../utils/convertDate';
import convertBlanktodash  from '../../utils/convertBlanktodash';
const Stoneattr =  (props) =>{
  let certifiiedDate = convertDate(props.itemCreatedDate);
  return (
    <div className="line-h">
        <div className="col-sm-6 nopadding">
            <div className="col-md-12 col-sm-12 nopadding">
              <div className="col-md-4 col-sm-4 nopadding font-b">Stone Type</div>
              <div className="col-md-8 col-sm-8">{convertBlanktodash(props.subType)}</div>
            </div>
            <div className="col-md-12 col-sm-12 nopadding">
              <div className="col-md-4 col-sm-4 nopadding font-b">Cut</div>
              <div className="col-md-8 col-sm-8">{convertBlanktodash(props.cut)}</div>
            </div>

            <div className="col-md-12 col-sm-12 nopadding">
                <div className="col-md-4 col-sm-4 nopadding font-b">Color</div>
                <div className="col-md-8 col-sm-8">{convertBlanktodash(props.color)}</div>
            </div>
            <div className="col-md-12 col-sm-12 nopadding">
                <div className="col-md-4 col-sm-4 nopadding font-b">Clarity</div>
                <div className="col-md-8 col-sm-8">{convertBlanktodash(props.clarity)}</div>
            </div>
            <div className="col-md-12 col-sm-12 nopadding">
                <div className="col-md-4 col-sm-4 nopadding font-b">Lot Number</div>
                <div className="col-md-8 col-sm-8">{convertBlanktodash(props.lotNumber)}</div>
            </div>
            <div className="col-md-12 col-sm-12 nopadding">
                  <div className="col-md-4 col-sm-4 nopadding font-b">Lot Quantity</div>
                  <div className="col-md-8 col-sm-8">{convertBlanktodash(props.quantity)}</div>
            </div>
            <div className="col-md-12 col-sm-12 nopadding">
                  <div className="col-md-4 col-sm-4 nopadding font-b">Total Carat Weight</div>
                  <div className="col-md-8 col-sm-8">{convertBlanktodash(props.carat)}</div>
            </div>
        </div>
        <div className="col-sm-6 nopadding">
            <div className="col-md-12 col-sm-12 nopadding">
                  <div className="col-md-4 col-sm-4 nopadding font-b">Certificate Number</div>
                  <div className="col-md-8 col-sm-8">{convertBlanktodash(props.certificatedNumber)}</div>
            </div>
            <div className="col-md-12 col-sm-12 nopadding">
                  <div className="col-md-4 col-sm-4 nopadding font-b">Certificate Lab</div>
                  <div className="col-md-8 col-sm-8">{convertBlanktodash(props.certificateLab)}</div>
            </div>
            <div className="col-md-12 col-sm-12 nopadding">
                  <div className="col-md-4 col-sm-4 nopadding font-b">Certificate Date</div>
                  <div className="col-md-8 col-sm-8">{'-'}</div>
            </div>
            <div className="col-md-12 col-sm-12 nopadding">
                  <div className="col-md-4 col-sm-4 nopadding font-b">Origin</div>
                  <div className="col-md-8 col-sm-8">{convertBlanktodash(props.origin)}</div>
            </div>
            <div className="col-md-12 col-sm-12 nopadding">
                  <div className="col-md-4 col-sm-4 nopadding font-b">Symmetry</div>
                  <div className="col-md-8 col-sm-8">{convertBlanktodash(props.symmetry)}</div>
            </div>
            <div className="col-md-12 col-sm-12 nopadding">
                  <div className="col-md-4 col-sm-4 nopadding font-b">Fluorescence</div>
                  <div className="col-md-8 col-sm-8">{convertBlanktodash(props.fluorescence)}</div>
            </div>
        </div>
    </div>
    );
}

module.exports = Stoneattr
