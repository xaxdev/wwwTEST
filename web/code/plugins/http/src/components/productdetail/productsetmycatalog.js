import React,{PropTypes} from 'react';
import { Link } from 'react-router';
import ReactImageFallback from "react-image-fallback";
const pructdetailurl = '/productmycatalog/';

const productSet =  (props) =>{
    return (
         <div>

         {props.productset.products.map(function(data, index){
            return (
              <div key={data.id} className="col-md-3 col-sm-3 bd-img nopadding">
                <Link to={{pathname: `${pructdetailurl}${data.id}`}}>
                <ReactImageFallback
                       src={data.image? data.image.original :'/images/blank.gif' }
                       fallbackImage='/images/blank.gif'
                       initialImage='/images/blank.gif'
                       width={120}
                       height={120}
                       className='img-responsive' /></Link>
              </div>
           )
           })}
         </div>

    )
}

module.exports = productSet
