import React,{PropTypes} from 'react';
import { Link } from 'react-router';
import ReactImageFallback from 'react-image-fallback';
const pructdetailurl = '/productreletedetail/';

const productSet =  (props) =>{
    return (
        <div>
            {
                props.productset.products.map(function(data, index){
                    const isSpecialDisc = data.specialDiscount != undefined ? data.specialDiscount == 1?true:false : false;
                    return (
                        <div key={data.id} className="col-md-3 col-sm-3 bd-img nopadding">
                            <Link to={{pathname: `${pructdetailurl}${data.id}`}}>
                                <div className="tagbar-special-detail">
                                    <span className={`${(isSpecialDisc)?'tagbar-special-detail-gallery special-detail-set':'hidden'}`}></span>
                                    <ReactImageFallback src={data.image? data.image.original :'/images/blank.gif' }
                                        fallbackImage="/images/blank.gif" initialImage="/images/blank.gif" width={120} height={120}
                                        className="img-responsive" />
                                </div>
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    )
}

module.exports = productSet
