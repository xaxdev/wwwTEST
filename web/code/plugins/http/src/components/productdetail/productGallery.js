import React,{PropTypes} from 'react';
import ImageGallery from 'react-image-gallery';

const Gallery =  (props) =>{
  return (
    <div>
      <ImageGallery
       items={props.imagegallery}
       lazyLoad={true}
       infinite={false}
       showBullets={false}
       showThumbnails={true}
       showIndex={false}
       showNav={false}
       slideInterval={2000}
       autoPlay={false}
       defaultImage={"/images/blank.gif"}
       slideOnThumbnailHover={false}
     />
     </div>

  );
}

Gallery.propTypes = {
  imagegallery: PropTypes.array.isRequired
}


module.exports = Gallery
