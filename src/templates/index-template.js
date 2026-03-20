// @flow
import { graphql } from 'gatsby';
import React from 'react';

import Feed from '../components/Feed';
import Layout from '../components/Layout';
import MovableSidebarContent from '../components/MovableSidebarContent';
import Page from '../components/Page';
import Pagination from '../components/Pagination';
import Sidebar from '../components/Sidebar';
import SortBySelector from '../components/SortBySelector';
import TemplateWrapper from '../components/TemplateWrapper';
import { postPagePath, topPostsPagePath } from '../utils/page-paths';

type Props = {|
  +data: Object,
  +pageContext: Object,
  +location: Object,
|};

const IndexTemplate = ({ data, pageContext, location }: Props) => {
  const { author, title: siteTitle, subtitle: siteSubtitle, url: siteUrl } = data.site.siteMetadata;
  const { currentPage, hasNextPage, hasPrevPage, numPages, postSlugs, sortByNew } = pageContext;

  let { edges } = data.allMarkdownRemark;
  edges = postSlugs.map(slug => edges.filter(e => e.node.frontmatter.slug === slug)[0]);

  const pageTitle =
    currentPage > 1
      ? `${sortByNew ? '' : 'Top '}Posts - Page ${currentPage} - ${siteTitle}`
      : sortByNew
      ? `Blog - ${siteTitle}`
      : `Top Posts - ${siteTitle}`;

  const sameAs = [
    author.contacts.facebook && `https://www.facebook.com/${author.contacts.facebook}`,
    author.contacts.twitter && `https://x.com/${author.contacts.twitter}`,
    author.contacts.github && `https://github.com/${author.contacts.github}`,
  ].filter(Boolean);

  return (
    <TemplateWrapper>
      <Layout title={pageTitle} description={siteSubtitle}>
        <Sidebar location={location} />
        <Page
          title={currentPage > 1 ? `Page ${currentPage}` : ''}
          meta={<SortBySelector sortByNew={sortByNew} />}
        >
          <Feed edges={edges} />
          <Pagination
            currentPage={currentPage}
            pagePath={sortByNew ? postPagePath : topPostsPagePath}
            hasPrevPage={hasPrevPage}
            hasNextPage={hasNextPage}
            numPages={numPages}
          />
        </Page>
      </Layout>
      <MovableSidebarContent mobile />
    </TemplateWrapper>
  );
};

export const Head = ({ data, pageContext }: Props) => {
  const { author, title: siteTitle, subtitle: siteSubtitle, url: siteUrl } = data.site.siteMetadata;
  const { currentPage, sortByNew } = pageContext;
  const pageTitle =
    currentPage > 1
      ? `${sortByNew ? '' : 'Top '}Posts - Page ${currentPage} - ${siteTitle}`
      : sortByNew
      ? `Blog - ${siteTitle}`
      : `Top Posts - ${siteTitle}`;
  const sameAs = [
    author.contacts.facebook && `https://www.facebook.com/${author.contacts.facebook}`,
    author.contacts.twitter && `https://x.com/${author.contacts.twitter}`,
    author.contacts.github && `https://github.com/${author.contacts.github}`,
  ].filter(Boolean);

  return (
    <>
      <html lang="en" />
      <title>{pageTitle}</title>
      <meta name="description" content={siteSubtitle} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={siteSubtitle} />
      <script type="application/ld+json">
        {`{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "${author.name}",
  "url": "${siteUrl}",
  "sameAs": ${JSON.stringify(sameAs)}
}`}
      </script>
    </>
  );
};
export const query = graphql`
  query IndexTemplate($postSlugs: [String]!) {
    site {
      siteMetadata {
        author {
          name
          contacts {
            facebook
            twitter
            github
          }
        }
        title
        subtitle
        url
      }
    }
    allMarkdownRemark(filter: { frontmatter: { slug: { in: $postSlugs } } }) {
      edges {
        node {
          frontmatter {
            slug
          }
        }
        ...FeedFragment
      }
    }
  }
`;

export default IndexTemplate;
