import React from 'react';

import ImageList from './ImageList';
import ImageCanvas from './ImageCanvas';
import getDummySources from '../data';


class ImageGrid extends React.Component {
    constructor() {
        super();

        this.onSelectImage = this.onSelectImage.bind(this);
    }

    onSelectImage(e, img) {
        this.imageCanvas.addImage(img.src);
    }

    render() {
        return (
            <div className="image-grid">
                <ImageList
                  images={getDummySources(30)}
                  onSelectImage={this.onSelectImage}
                />
                <ImageCanvas ref={(canvas) => { this.imageCanvas = canvas; }} />
            </div>
        );
    }
}

export default ImageGrid;
