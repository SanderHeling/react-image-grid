import React from 'react';
import PropTypes from 'prop-types';

import { fabric } from 'fabric';


class ImageCanvas extends React.Component {
    componentDidMount() {
        const { rows, cols, spacing, imageSize } = this.props;

        const canvasWidth = ((cols) * (imageSize + spacing)) - spacing;
        const canvasHeight = ((rows) * (imageSize + spacing)) - spacing;

        // Create canvas
        const canvas = new fabric.Canvas('canvas', {
            backgroundColor: '#eee',
            selection: false,
            width: canvasWidth,
            height: canvasHeight,
        });

        this.canvas = canvas;

        // Snap to grid moving
        canvas.on('object:moving', (options) => {
            const snapSize = (imageSize + spacing);
            options.target.set({
                left: Math.round(options.target.left / snapSize) * snapSize,
                top: Math.round(options.target.top / snapSize) * snapSize,
            });
        });

        // Snap to grid scaling
        canvas.on('object:scaling', (options) => {
            const target = options.target;
            const scale = Math.round(target.getWidth() / (imageSize + spacing));
            const newSize = (scale * imageSize) + ((scale - 1) * spacing);

            // Set scaleX and scaleY to 1 to prevent default scaling.
            target.set({
                scaleX: 1,
                scaleY: 1,
                width: newSize,
                height: newSize,
            });
        });

        this.drawGrid();
    }

    /**
     * Generate the grid
     */
    drawGrid() {
        const { imageSize, spacing } = this.props;
        const gridOptions = {
            stroke: '#fff',
            selectable: false,
            strokeWidth: spacing,
        };

        // Draw horizontal grid lines
        for (let i = 1; i < this.props.rows; i += 1) {
            const x1 = 0;
            const y1 = (i * imageSize) + ((i - 1) * spacing);
            const x2 = this.canvas.width;
            const y2 = y1;

            const line = new fabric.Line([x1, y1, x2, y2], gridOptions);
            this.canvas.add(line);
        }

        // Draw vertical grid lines
        for (let i = 1; i < this.props.rows; i += 1) {
            const x1 = (i * imageSize) + ((i - 1) * spacing);
            const y1 = 0;
            const x2 = x1;
            const y2 = this.canvas.height;

            const line = new fabric.Line([x1, y1, x2, y2], gridOptions);
            this.canvas.add(line);
        }
    }

    /**
     * Add a single image by passing the url.
     */
    addImage(url) {
        const { imageSize } = this.props;
        const width = imageSize;
        const height = imageSize;

        fabric.Image.fromURL(url, (img) => {
            this.canvas.add(img);

            // Disable all controls except bottom-right.
            img.setControlsVisibility({
                mt: false,
                mb: false,
                ml: false,
                mr: false,
                bl: false,
                br: true,
                tl: false,
                tr: false,
                mtr: false,
            });
        }, {
            width,
            height,
            hasRotatingPoint: false,
            lockRotation: true,
            lockScalingFlip: true,
            lockUniScaling: true,
            minScaleLimit: 1,
        });
    }

    render() {
        return (
            <div>
                <canvas id="canvas" />
            </div>
        );
    }
}

ImageCanvas.propTypes = {
    rows: PropTypes.number,
    cols: PropTypes.number,
    spacing: PropTypes.number,
    imageSize: PropTypes.number,
};

ImageCanvas.defaultProps = {
    rows: 5,
    cols: 5,
    spacing: 20,
    imageSize: 100,
};

export default ImageCanvas;
