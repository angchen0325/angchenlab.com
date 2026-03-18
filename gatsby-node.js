'use strict';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

exports.createPages = require('./gatsby/create-pages');
exports.onCreateNode = require('./gatsby/on-create-node');
exports.onCreateWebpackConfig = ({ actions, getConfig, stage }) => {
  const stagesWithCssExtraction = new Set(['develop', 'build-javascript']);

  if (!stagesWithCssExtraction.has(stage)) {
    return;
  }

  const config = getConfig();

  config.plugins = config.plugins.map(plugin => {
    if (plugin && plugin.constructor && plugin.constructor.name === 'MiniCssExtractPlugin') {
      return new MiniCssExtractPlugin({
        ...plugin.options,
        ignoreOrder: true,
      });
    }

    return plugin;
  });

  actions.replaceWebpackConfig(config);
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    type MarkdownRemarkFields {
      dateFormatted: String
      dateModifiedFormatted: String
      frontSlug: String
      slug: String
      tagSlugs: [String]
      categorySlug: String
      readingTime: ReadingTime
    }

    type ReadingTime {
      words: Int
      minutes: Int
      text: String
    }

    type MarkdownRemarkFrontmatter {
      asyncScript: String
      canonical: String
      category: String
      date: Date @dateformat
      dateModified: Date @dateformat
      description: String
      descriptionLong: String
      discussLinkTwitter: String
      discussLinkHN: String
      discussLinkReddit: String
      draft: Boolean
      guestAuthor: String
      guestAuthorLink: String
      guestCoAuthor: Boolean
      hideAd: Boolean
      img: String
      isML: Boolean
      isSeries: Boolean
      isWeb: Boolean
      language: String
      noIndex: Boolean
      slug: String
      tags: [String]
      template: String
      title: String
      translationKey: String
      twitterEmbed: Boolean
      popularity: Float
      prev: String
      next: String
      usesKatex: Boolean
      frontSlug: String
      seriesSlugs: [String]
    }
  `);
};
