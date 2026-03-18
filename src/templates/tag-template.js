// @flow
import { graphql, Link } from 'gatsby';
import React from 'react';

import Feed from '../components/Feed';
import Layout from '../components/Layout';
import Page from '../components/Page';
import Pagination from '../components/Pagination';
import Sidebar from '../components/Sidebar';
import TemplateWrapper from '../components/TemplateWrapper';
import { buildTagDescription } from './tag-description';
import { tagPagePath } from '../utils/page-paths';

type Props = {|
  +data: Object,
  +location: Object,
  +pageContext: Object,
|};

const metaDescriptions = {
  Colors:
    'Colors posts about color as a bridge between optics, materials, structure, and human perception.',
  'Inverse Design':
    'Inverse Design posts about starting from a target optical response and working backward to the structure that can produce it.',
  Optics:
    'Optics posts about imaging, refraction, system behavior, and the physical intuition behind light-based devices.',
  Photonics:
    'Photonics posts about how structure, materials, and device constraints shape the behavior of light.',
  Semiconductors:
    'Semiconductors posts about the physics, materials, and engineering of semiconductors and their role in photonics.',
};

// 0 if guest author, 1 otherwise
function edgeHasGuestAuthorValue(e) {
  return e.node.frontmatter.guestAuthor ? 0 : 1;
}

const TagTemplate = ({ data, pageContext, location }: Props) => {
  const { title: siteTitle, subtitle: siteSubtitle } = data.site.siteMetadata;
  const {
    tag,
    tagSlug,
    currentPage,
    hasPrevPage,
    hasNextPage,
    numPages,
    postSlugs = [],
  } = pageContext || {};

  let { edges } = data.allMarkdownRemark;
  edges = postSlugs
    .map(slug => edges.find(edge => edge.node.fields.slug === slug))
    .filter(Boolean);

  const pageTitle =
    currentPage > 1
      ? `${tag} Articles - Page ${currentPage} - ${siteTitle}`
      : `${tag} Articles - ${siteTitle}`;

  edges.sort((a, b) => edgeHasGuestAuthorValue(b) - edgeHasGuestAuthorValue(a));

  return (
    <TemplateWrapper>
      <Layout title={pageTitle} description={metaDescriptions[tag] || siteSubtitle}>
        <Sidebar location={location} />
        <Page
          title={`${tag}${currentPage > 1 ? ` - Page ${currentPage}` : ''}`}
          subtitle={
            <Link to="/tags/">← Back to All Tags</Link>
          }
          description={buildTagDescription(tag, edges)}
        >
          <Feed edges={edges} />
          <Pagination
            currentPage={currentPage}
            pagePath={page => tagPagePath(tagSlug, page)}
            hasPrevPage={hasPrevPage}
            hasNextPage={hasNextPage}
            numPages={numPages}
          />
        </Page>
      </Layout>
    </TemplateWrapper>
  );
};

export const Head = ({ data, pageContext }: Props) => {
  const { title: siteTitle, subtitle: siteSubtitle } = data.site.siteMetadata;
  const { tag, currentPage } = pageContext;
  const pageTitle =
    currentPage > 1
      ? `${tag} Articles - Page ${currentPage} - ${siteTitle}`
      : `${tag} Articles - ${siteTitle}`;

  return (
    <>
      <html lang="en" />
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescriptions[tag] || siteSubtitle} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescriptions[tag] || siteSubtitle} />
    </>
  );
};

export const query = graphql`
  query TagPage($postSlugs: [String]!) {
    site {
      siteMetadata {
        title
        subtitle
      }
    }
    allMarkdownRemark(filter: { frontmatter: { slug: { in: $postSlugs } } }) {
      edges {
        ...FeedFragment
      }
    }
  }
`;

export default TagTemplate;
