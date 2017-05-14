/**
 * Generate dummy images
 */
function getDummySources(number) {
    let imageSources = [];

    for (let i = 0; i < number; i += 1) {
        const imageSize = 500 + i;
        imageSources = [...imageSources, {
            id: `${i + 1}`,
            src: `https://source.unsplash.com/random/${imageSize}x${imageSize}`,
        }];
    }

    return imageSources;
}

export default getDummySources;
