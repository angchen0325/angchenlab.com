import React from 'react';
import renderer from 'react-test-renderer';

import { isMenuItemActive, Menu } from './Menu';

describe('Menu', () => {
  const props = {
    menu: [
      {
        label: 'Item 0',
        path: '/#0/',
      },
      {
        label: 'Item 1',
        path: '/#1/',
      },
    ],
  };

  it('renders correctly', () => {
    const tree = renderer.create(<Menu {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('only marks About active on homepage', () => {
    expect(isMenuItemActive('/', '/')).toBe(true);
    expect(isMenuItemActive('/', '/projects/')).toBe(false);
    expect(isMenuItemActive('/', '/blog/')).toBe(false);
  });

  it('marks Blog active on blog listing routes', () => {
    expect(isMenuItemActive('/blog/', '/blog/')).toBe(true);
    expect(isMenuItemActive('/blog/', '/blog/page/2/')).toBe(true);
    expect(isMenuItemActive('/blog/', '/blog/top/')).toBe(true);
    expect(isMenuItemActive('/blog/', '/projects/')).toBe(false);
  });

  it('marks Tags active on tag pages', () => {
    expect(isMenuItemActive('/tags/', '/tags/')).toBe(true);
    expect(isMenuItemActive('/tags/', '/tag/optics/')).toBe(true);
    expect(isMenuItemActive('/tags/', '/blog/')).toBe(false);
  });
});
