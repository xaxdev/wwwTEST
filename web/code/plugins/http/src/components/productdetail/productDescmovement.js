import React,{PropTypes} from 'react';

const Detail = (props) =>{

    return (
      <div className="line-h">
        <div className="col-md-12 col-sm-12 nopadding">
          <div className="col-md-4 col-sm-4 nopadding font-b">Item Reference</div>
          <div className="col-md-8 col-sm-8">{props.reference}</div>
        </div>
        <div className="col-md-12 col-sm-12 nopadding">
          <div className="col-md-4 col-sm-4 nopadding font-b">Description</div>
          <div className="col-md-8 col-sm-8 text-wrap">{props.description}</div>
        </div>

      </div>
    );
  
}


module.exports = Detail
