import React from 'react';
import renderer from 'react-test-renderer';

import TagsListTemplate from './tags-list-template';

describe('TagsListTemplate', () => {
  const props = {
    data: {
      allMarkdownRemark: {
        group: [
          {
            fieldValue: 'zeta',
            totalCount: 2,
          },
          {
            fieldValue: 'alpha',
            totalCount: 1,
          },
        ],
      },
      site: {
        siteMetadata: {
          title: 'test',
          subtitle: 'test',
        },
      },
    },
  };

  it('renders correctly', () => {
    const tree = renderer.create(<TagsListTemplate {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
