import React,{Component,PropTypes} from 'react';
import { connect } from 'react-redux';
import ImageGallery from 'react-image-gallery';
import jQuery from 'jquery';

class GalleryCOA extends Component {
    constructor() {
        super();

        this.state = {
            isPlaying: false,
            showIndex: false,
            slideOnThumbnailHover: false,
            showBullets: false,
            infinite: false,
            showThumbnails: true,
            showNav: true,
            slideInterval: 2000,
            fullscreen: false,
            startIndex:0
        };
    }

    componentDidUpdate(prevProps, prevState) {
        this._imageGallery.slideToIndex(0);
    }

    render() {
        const { imagesCOA } = this.props.productdetail;
        const { imagesGallery } = this.props;
        let images = [];
        if (!!imagesGallery) {
            images = imagesGallery;
        }

        return (
            <div>
                <ImageGallery
                  ref={i => this._imageGallery = i}
                  items={images}
                  lazyLoad={false}
                  infinite={this.state.infinite}
                  showBullets={this.state.showBullets}
                  showThumbnails={this.state.showThumbnails}
                  showIndex={this.state.showIndex}
                  showNav={this.state.showNav}
                  defaultImage={'/images/blank.gif'}
                  slideInterval={parseInt(this.state.slideInterval)}
                  autoPlay={this.state.isPlaying}
                  startIndex={this.state.startIndex}
                  slideOnThumbnailHover={this.state.slideOnThumbnailHover}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
	return {
		productdetail: state.productdetail.detail,
	}
}


GalleryCOA.propTypes = {
    imagegallery: PropTypes.array.isRequired
}

module.exports = connect(mapStateToProps, null)(GalleryCOA);
