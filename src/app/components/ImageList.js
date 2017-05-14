import React from 'react';
import PropTypes from 'prop-types';

import ImageListItem from './ImageListItem';


function ImageList({ images, onSelectImage }) {
    const imageComponents = images.map(img =>
        <ImageListItem
          key={img.id}
          src={img.src}
          onClick={e => onSelectImage(e, img)}
        />,
    );

    return (
        <div className="image-list">
            {imageComponents}
        </div>
    );
}

ImageList.propTypes = {
    onSelectImage: PropTypes.func,
    images: PropTypes.arrayOf(PropTypes.object),
};

ImageList.defaultProps = {
    onSelectImage: () => {},
    images: [],
};

export default ImageList;
