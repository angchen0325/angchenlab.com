import React from 'react';
import renderer from 'react-test-renderer';

import TagTemplate, { buildTagDescription } from './tag-template';

describe('TagTemplate', () => {
  const baseProps = {
    data: {
      allMarkdownRemark: {
        group: [
          {
            fieldValue: 'test_0',
            totalCount: 1,
          },
          {
            fieldValue: 'test_1',
            totalCount: 2,
          },
        ],
        edges: [
          {
            node: {
              fields: {
                slug: '/test_0',
                categorySlug: '/test',
              },
              frontmatter: {
                date: '2016-09-01',
                description: 'test_0',
                category: 'test',
                title: 'test_0',
              },
            },
          },
          {
            node: {
              fields: {
                slug: '/test_1',
                categorySlug: '/test',
              },
              frontmatter: {
                date: '2016-09-01',
                description: 'test_1',
                category: 'test',
                title: 'test_1',
              },
            },
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
    pageContext: {
      tag: 'test',
      tagSlug: '/tag/test/',
      currentPage: 1,
      postSlugs: ['/test_0', '/test_1'],
      hasNextPage: true,
      hasPrevPage: true,
      numPages: 2,
    },
  };

  const buildProps = overrides => ({
    ...baseProps,
    ...overrides,
    data: {
      ...baseProps.data,
      ...(overrides && overrides.data),
    },
    pageContext: {
      ...baseProps.pageContext,
      ...(overrides && overrides.pageContext),
    },
  });

  it('renders correctly', () => {
    const tree = renderer.create(<TagTemplate {...baseProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a custom Colors description', () => {
    const descriptionTree = renderer.create(buildTagDescription('Colors', [])).toJSON();

    expect(JSON.stringify(descriptionTree)).toContain('Colors: Structure, Perception, and Design');
    expect(JSON.stringify(descriptionTree)).toContain('Closely related tags include');
    expect(JSON.stringify(descriptionTree)).not.toContain('Posts filed under Colors.');
  });

  it('renders a custom Inverse Design description', () => {
    const descriptionTree = renderer.create(buildTagDescription('Inverse Design', [])).toJSON();

    expect(JSON.stringify(descriptionTree)).toContain(
      'Inverse Design: Let the Target Drive the Geometry'
    );
    expect(JSON.stringify(descriptionTree)).toContain('Nearby viewpoints include');
    expect(JSON.stringify(descriptionTree)).not.toContain('Posts filed under Inverse Design.');
  });
});
