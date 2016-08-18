import React,{PropTypes} from 'react';
import { Link } from 'react-router';
const pructdetailurl = '/productreletedetail/';

const productSet =  (props) =>{

    return (
         <div>
         {props.productset.products.map(function(data, index){
            return (
              <div key={data.id} className="col-md-3 col-sm-3 bd-img nopadding">
                <Link to={{pathname: `${pructdetailurl}${data.id}`}}><img src={data.image.length > 0 ? data.image[0].thumbnail :'/images/blank.gif' }  responsive width={120} height={120}/></Link>
              </div>
           )
           })}
         </div>

    )
}

module.exports = productSet
