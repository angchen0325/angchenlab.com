import React from 'react';
import renderer from 'react-test-renderer';

import { getContactHref } from '../../utils';

import Contacts from './Contacts';

describe('Contacts', () => {
  const props = {
    contacts: {
      twitter: '#',
      facebook: '#',
      github: '#',
      email: '#',
    },
  };

  it('renders correctly', () => {
    const tree = renderer.create(<Contacts {...props} />).toJSON();
    expect(tree).toBeTruthy();
    if (!tree) {
      throw new Error('Contacts did not render');
    }

    expect(tree.type).toBe('div');
    expect(tree.props.className).toBe('contacts');

    const list = tree.children && tree.children[0];
    if (!list) {
      throw new Error('Contacts list not rendered');
    }
    expect(list.type).toBe('ul');

    const items = list.children || [];
    const keys = Object.keys(props.contacts);
    expect(items.length).toBe(keys.length);

    keys.forEach((name, index) => {
      const listItem = items[index];
      const link = listItem.children[0];
      expect(link.props.href).toBe(getContactHref(name, props.contacts[name]));
      expect(link.children[0].type).toBe('i');
    });
  });
});
