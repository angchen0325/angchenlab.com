import React from 'react';
import renderer from 'react-test-renderer';

import Copyright from './Copyright';

describe('Copyright', () => {
  it('renders correctly', () => {
    const props = {
      copyright: 'copyright',
    };

    const tree = renderer.create(<Copyright {...props} />).toJSON();
    const currentYear = new Date().getFullYear();
    expect(tree).toEqual({
      type: 'p',
      props: { className: 'copyright' },
      children: [`${props.copyright} ${currentYear}`],
    });
  });
});
