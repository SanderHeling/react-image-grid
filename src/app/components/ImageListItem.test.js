import React from 'react';
import renderer from 'react-test-renderer';

import ImageListItem from './ImageListItem';


test('should render correctly', () => {
    const component = renderer.create(
        <ImageListItem src="https://source.unsplash.com/random/300x500" />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
