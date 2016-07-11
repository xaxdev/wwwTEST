import React from 'react';
import convertDate from '../../utils/convertDate';
const Stoneattr =  (props) =>{
  let certifiiedDate = convertDate(props.certifiiedDate);
  return (
    <div className="line-h">
        <div className="colmd12">
            <div className="colmd12">
              <div className="colmd6 font-b">Stone Type</div>
              <div className="colmd6">{props.subType}</div>
            </div>
            <div className="colmd12">
              <div className="colmd6 font-b">Cut</div>
              <div className="colmd6">{props.cut}</div>
            </div>
            <div className="colmd12">
                <div className="colmd6 font-b">Cut Grade</div>
                <div className="colmd6">{props.cutGrade}</div>
            </div>
            <div className="colmd12">
                <div className="colmd6 font-b">Color</div>
                <div className="colmd6">{props.color}</div>
            </div>
            <div className="colmd12">
                <div className="colmd6 font-b">Clarity</div>
                <div className="colmd6">{props.clarity}</div>
            </div>
            <div className="colmd12">
                <div className="colmd6 font-b">Lot Number</div>
                <div className="colmd6">{props.lotNumber}</div>
            </div>
            <div className="colmd12">
                  <div className="colmd6 font-b">Lot Quantity</div>
                  <div className="colmd6">{props.quantity}</div>
            </div>
            <div className="colmd12">
                  <div className="colmd6 font-b">Total Carat Weight</div>
                  <div className="colmd6">{props.carat}</div>
            </div>
            <div className="colmd12">
                  <div className="colmd6 font-b">Certificate Number</div>
                  <div className="colmd6">{props.certificatedNumber}</div>
            </div>
            <div className="colmd12">
                  <div className="colmd6 font-b">Certificate Lab</div>
                  <div className="colmd6">{props.certificateLab}</div>
            </div>
            <div className="colmd12">
                  <div className="colmd6 font-b">Certificate Date</div>
                  <div className="colmd6">{certifiiedDate}</div>
            </div>
            <div className="colmd12">
                  <div className="colmd6 font-b">Origin</div>
                  <div className="colmd6">{props.origin}</div>
            </div>
            <div className="colmd12">
                  <div className="colmd6 font-b">Polish</div>
                  <div className="colmd6">{props.polish}</div>
            </div>
            <div className="colmd12">
                  <div className="colmd6 font-b">Symmetry</div>
                  <div className="colmd6">{props.symmetry}</div>
            </div>
            <div className="colmd12">
                  <div className="colmd6 font-b">Treatment</div>
                  <div className="colmd6">{props.treatment}</div>
            </div>
            <div className="colmd12">
                  <div className="colmd6 font-b">Fluorescence</div>
                  <div className="colmd6">{props.fluorescence}</div>
            </div>
        </div>
    </div>
    );
}

module.exports = Stoneattr
