'use strict';

const path = require('path');
const createTagsPages = require('./pagination/create-tags-pages.js');
const createPostsPages = require('./pagination/create-posts-pages.js');

const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  createPage({
    path: '/tags/',
    component: path.resolve('./src/templates/tags-list-template.js'),
  });

  createPage({
    path: '/archive/',
    component: path.resolve('./src/templates/archive-template.js'),
  });

  // Posts and pages from markdown
  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              template
              prev
              next
              seriesSlugs
              frontSlug
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  const { edges } = result.data.allMarkdownRemark;

  edges.forEach(edge => {
    // Skip -end files, which are appended on to their corresponding primary files.
    const frontSlug = edge.node.frontmatter.frontSlug;
    if (frontSlug) {
      return;
    }

    const { slug } = edge.node.fields;
    const prev = edge.node.frontmatter.prev;
    const next = edge.node.frontmatter.next;
    const seriesSlugs = edge.node.frontmatter.seriesSlugs || [];
    const template = edge.node.frontmatter.template;
    createPage({
      path: slug,
      component: path.resolve(`./src/templates/${template}-template.js`),
      context: { slug, prev, next, seriesSlugs },
    });
  });

  // Feeds
  await createTagsPages(graphql, actions);
  await createPostsPages(graphql, actions);
};

module.exports = createPages;
