// @flow
import { graphql } from 'gatsby';
import React from 'react';

import Feed from '../components/Feed';
import Layout from '../components/Layout';
import Page from '../components/Page';
import Sidebar from '../components/Sidebar';
import TemplateWrapper from '../components/TemplateWrapper';

type Props = {|
  +data: Object,
  +location: Object,
  +pageContext: Object,
|};

const ArchiveTemplate = ({ data, pageContext, location }: Props) => {
  const { title: siteTitle, subtitle: siteSubtitle } = data.site.siteMetadata;
  const { edges } = data.allMarkdownRemark;

  return (
    <TemplateWrapper>
      <Layout
        title={`Blog Archive - ${siteTitle}`}
        description={`An archive of all my blog posts. ${siteSubtitle}`}
      >
        <Sidebar location={location} />
        <Page>
          <Feed edges={edges} shortened={true} />
        </Page>
      </Layout>
    </TemplateWrapper>
  );
};

export const Head = ({ data }: Props) => {
  const { title: siteTitle, subtitle: siteSubtitle } = data.site.siteMetadata;
  const title = `Blog Archive - ${siteTitle}`;
  const description = `An archive of all my blog posts. ${siteSubtitle}`;

  return (
    <>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </>
  );
};
export const query = graphql`
  query ArchiveTemplate {
    site {
      siteMetadata {
        title
        subtitle
      }
    }
    allMarkdownRemark(
      filter: {
        frontmatter: {
          template: { eq: "post" }
          draft: { ne: true }
          guestAuthor: { in: [null, ""] }
        }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        ...FeedFragment
      }
    }
  }
`;

export default ArchiveTemplate;
