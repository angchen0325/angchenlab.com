import { graphql, Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import React from 'react';

import Layout from '../components/Layout';
import MovableSidebarContent from '../components/MovableSidebarContent';
import Page from '../components/Page';
import Sidebar from '../components/Sidebar';
import TemplateWrapper from '../components/TemplateWrapper';

const TagsListTemplate = ({ data, location }) => {
  const { title, subtitle } = data.site.siteMetadata;
  const { group } = data.allMarkdownRemark;
  const sortedTags = [...group].sort((a, b) => a.fieldValue.localeCompare(b.fieldValue));

  return (
    <TemplateWrapper>
      <Layout title={`Tags - ${title}`} description={subtitle}>
        <Sidebar location={location} />
        <Page title="Tags" subtitle={<Link to="/">← Back to Home</Link>}>
          <ul>
            {sortedTags.map(tag => (
              <li key={tag.fieldValue}>
                <Link to={`/tag/${kebabCase(tag.fieldValue)}/`}>
                  {tag.fieldValue} ({tag.totalCount})
                </Link>
              </li>
            ))}
          </ul>
        </Page>
      </Layout>
      <MovableSidebarContent mobile />
    </TemplateWrapper>
  );
};

export const Head = ({ data }) => {
  const { title, subtitle } = data.site.siteMetadata;
  return (
    <>
      <html lang="en" />
      <title>{`Tags - ${title}`}</title>
      <meta name="description" content={subtitle} />
      <meta property="og:title" content={`Tags - ${title}`} />
      <meta property="og:description" content={subtitle} />
    </>
  );
};
export const query = graphql`
  query TagsListQuery {
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
    ) {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`;

export default TagsListTemplate;
