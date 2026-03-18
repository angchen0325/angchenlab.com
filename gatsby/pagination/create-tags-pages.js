'use strict';

const _ = require('lodash');
const path = require('path');
const siteConfig = require('../../config.js');
const { tagPagePath } = require('../../src/utils/page-paths');

module.exports = async (graphql, actions) => {
  const { createPage } = actions;
  const { postsPerPage } = siteConfig;

  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: {
          frontmatter: { template: { eq: "post" }, draft: { ne: true }, guestAuthor: { in: [null, ""] } }
        }
      ) {
        edges {
          node {
            frontmatter {
              date
              slug
              tags
            }
          }
        }
      }
    }
  `);

  const postsByTag = {};

  result.data.allMarkdownRemark.edges.forEach(edge => {
    const { date, slug, tags = [] } = edge.node.frontmatter;

    tags.forEach(tag => {
      if (!postsByTag[tag]) {
        postsByTag[tag] = [];
      }

      postsByTag[tag].push({ date, slug });
    });
  });

  _.each(postsByTag, (posts, tag) => {
    const sortedSlugs = [...posts]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map(post => post.slug);
    const numPages = Math.ceil(sortedSlugs.length / postsPerPage);
    const tagSlug = `/tag/${_.kebabCase(tag)}/`;

    for (let i = 0; i < numPages; i += 1) {
      createPage({
        path: tagPagePath(tagSlug, i + 1),
        component: path.resolve('./src/templates/tag-template.js'),
        context: {
          tag,
          tagSlug,
          currentPage: i + 1,
          postSlugs: sortedSlugs.slice(i * postsPerPage, (i + 1) * postsPerPage),
          hasPrevPage: i !== 0,
          hasNextPage: i !== numPages - 1,
          numPages,
        },
      });
    }
  });
};
