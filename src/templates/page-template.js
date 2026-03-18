// @flow
import { graphql } from 'gatsby';
import React from 'react';

import Layout from '../components/Layout';
import MovableSidebarContent from '../components/MovableSidebarContent';
import Page from '../components/Page';
import Sidebar from '../components/Sidebar';
import TemplateWrapper from '../components/TemplateWrapper';

type Props = {|
  +data: Object,
|};

const PageTemplate = ({ data, pageContext }: Props) => {
  const { title: siteTitle, subtitle: siteSubtitle } = data.site.siteMetadata;

  const {
    title: pageTitle,
    description: pageDescription,
    hideAd,
    noIndex,
  } = data.markdownRemark.frontmatter;

  const { html: pageBody } = data.markdownRemark;

  const metaDescription = pageDescription !== null ? pageDescription : siteSubtitle;

  return (
    <TemplateWrapper>
      <Layout title={`${pageTitle} - ${siteTitle}`} description={metaDescription}>
        <Sidebar hideAd={hideAd} location={{ pathname: data.markdownRemark.fields.slug }} />
        <Page title={pageTitle}>
          <div dangerouslySetInnerHTML={{ __html: pageBody }} />
        </Page>
      </Layout>
      <MovableSidebarContent mobile hideAd={hideAd} />
    </TemplateWrapper>
  );
};

export const Head = ({ data }: Props) => {
  const { title: siteTitle, subtitle: siteSubtitle } = data.site.siteMetadata;
  const {
    title: pageTitle,
    description: pageDescription,
    noIndex,
  } = data.markdownRemark.frontmatter;
  const metaDescription = pageDescription !== null ? pageDescription : siteSubtitle;

  return (
    <>
      <html lang="en" />
      <title>{`${pageTitle} - ${siteTitle}`}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={`${pageTitle} - ${siteTitle}`} />
      <meta property="og:description" content={metaDescription} />
      {noIndex && <meta name="robots" content="noindex" />}
    </>
  );
};
export const query = graphql`
  query PageBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        subtitle
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        title
        date
        description
        hideAd
        noIndex
      }
    }
  }
`;

export default PageTemplate;
