import React from 'react';
import { responsive } from 'react-bootstrap';
import { Link } from 'react-router';
import ReactImageFallback from 'react-image-fallback';
const pructdetailurl = '/salesproductreletedetail/';
const productreleted = (props) => {
    return (
        <div>
            {
                props.productrelte.map(function(data, index){
                    return (
                        <div key={data.id} className="col-md-3 col-sm-3 bd-img nopadding">
                            <Link to={{pathname: `${pructdetailurl}${data.id}`}}>
                                <ReactImageFallback src={data.image.length > 0 ? data.image[0].thumbnail :'/images/blank.gif' } fallbackImage="/images/blank.gif"
                                    initialImage="/images/blank.gif" width={120} height={120} className="img-responsive" />
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    );
}
module.exports = productreleted
