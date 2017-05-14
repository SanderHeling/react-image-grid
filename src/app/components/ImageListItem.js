import React from 'react';
import PropTypes from 'prop-types';


function ImageListItem({ src, alt, onClick }) {
    return (
        <div className="image-list__item">
            <img src={src} alt={alt} onClick={e => onClick(e)} />
        </div>
    );
}

ImageListItem.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    onClick: PropTypes.func,
};

ImageListItem.defaultProps = {
    alt: '',
    onClick: () => {},
};

export default ImageListItem;
