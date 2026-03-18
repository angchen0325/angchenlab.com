// @flow
import { graphql } from 'gatsby';
import React from 'react';

import Layout from '../components/Layout';
import NavHeader from '../components/NavHeader';
import PlatformContext from '../components/PlatformContext';
import Post from '../components/Post';
import Series from '../components/Series';
import TableOfContents from '../components/TableOfContents';
import TemplateWrapper from '../components/TemplateWrapper';

type Props = {|
  +data: Object,
  +pageContext: Object,
|};

const PostTemplate = ({ data, pageContext }: Props) => {
  const { author, title: siteTitle, subtitle: siteSubtitle, url: siteUrl } = data.site.siteMetadata;
  const { edges } = data.allMarkdownRemark;
  const { slug } = pageContext;

  const findNodeBySlug = targetSlug =>
    targetSlug
      ? edges.find(
          edge =>
            edge.node.frontmatter.slug === targetSlug || edge.node.fields.slug === targetSlug
        )?.node
      : null;

  const slugNode = findNodeBySlug(slug);

  if (!slugNode) {
    throw new Error(`Post data not found for slug: ${slug || '(undefined)'}`);
  }

  const {
    asyncScript,
    canonical,
    category,
    date,
    dateModified,
    img: imgUrl,
    isSeries,
    title: postTitle,
    description,
    descriptionLong,
    twitterEmbed,
  } = slugNode.frontmatter;

  let wordCount = slugNode.fields.readingTime.words;
  if (data.seriesEnd) {
    wordCount += data.seriesEnd.fields.readingTime.words;
  }

  return (
    <TemplateWrapper>
      <NavHeader />
      <Layout
        title={`${postTitle} - ${siteTitle}`}
        description={descriptionLong || description || siteSubtitle}
      >
        {isSeries ? (
          <Series htmlEnd={data.seriesEnd.html} series={slugNode} seriesPosts={data.seriesPosts} />
        ) : (
          <Post post={slugNode} />
        )}
      </Layout>
      <PlatformContext
        threshold={1200}
        render={isMobile => !isMobile && <TableOfContents headings={slugNode.headings} />}
      />
    </TemplateWrapper>
  );
};

export const Head = ({ data, pageContext }: Props) => {
  const { author, title: siteTitle, subtitle: siteSubtitle, url: siteUrl } = data.site.siteMetadata;
  const { edges } = data.allMarkdownRemark;
  const { slug } = pageContext;
  const slugNode = edges.find(
    edge => edge.node.frontmatter.slug === slug || edge.node.fields.slug === slug
  )?.node;

  if (!slugNode) {
    return null;
  }

  const {
    asyncScript,
    canonical,
    category,
    date,
    dateModified,
    img: imgUrl,
    title: postTitle,
    description,
    descriptionLong,
    twitterEmbed,
  } = slugNode.frontmatter;
  let wordCount = slugNode.fields.readingTime.words;
  if (data.seriesEnd) {
    wordCount += data.seriesEnd.fields.readingTime.words;
  }
  const title = `${postTitle} - ${siteTitle}`;
  const metaDescription = descriptionLong || description || siteSubtitle;

  return (
    <>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="article" />
      <meta property="og:image" content={imgUrl} />
      {canonical && <link rel="canonical" href={canonical} />}
      {twitterEmbed && <script async defer src="https://platform.twitter.com/widgets.js" charSet="utf-8" />}
      {asyncScript && <script async src={asyncScript} />}
      <script type="application/ld+json">
        {`{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "image": "${imgUrl}",
  "url": "${siteUrl + slug}",
  "headline": "${postTitle}",
  "description": "${metaDescription}",
  "wordcount": "${wordCount}",
  "dateCreated": "${date}",
  "datePublished": "${date}",
  "dateModified": "${dateModified || date}",
  "inLanguage": "en-US",
  "mainEntityOfPage": "True",
  "articleBody": "${slugNode.excerpt}",
  "articleSection": "${category}",
  "author": {
    "@type": "Person",
    "name": "${author.name}",
    "url": "${siteUrl}"
  },
  "publisher": {
    "@type": "Organization",
    "name": "${author.name}",
    "url": "${siteUrl}",
    "logo": {
      "@type": "ImageObject",
      "url": "${siteUrl}${author.photoLarge}",
      "width": "1024",
      "height": "1024"
    }
  }
}`}
      </script>
    </>
  );
};

export const fragment = graphql`
  fragment PostTemplateFragment on Query {
    site {
      siteMetadata {
        author {
          name
          photoLarge
        }
        url
        subtitle
        title
      }
    }
    allMarkdownRemark(filter: { frontmatter: { slug: { in: [$slug, $prev, $next] } } }) {
      edges {
        node {
          ...PostFragment
          ...TableOfContentsFragment
          excerpt(pruneLength: 5000)
          fields {
            slug
            tagSlugs
            readingTime {
              words
            }
          }
          frontmatter {
            asyncScript
            canonical
            category
            description
            descriptionLong
            img
            isSeries
            seriesSlugs
            tags
            title
            twitterEmbed
          }
        }
      }
    }
    seriesEnd: markdownRemark(fields: { frontSlug: { eq: $slug } }) {
      html
      fields {
        readingTime {
          words
        }
      }
    }
    seriesPosts: allMarkdownRemark(filter: { frontmatter: { slug: { in: $seriesSlugs } } }) {
      edges {
        node {
          fields {
            dateFormatted
            dateModifiedFormatted
          }
          frontmatter {
            date
            description
            img
            slug
            title
          }
        }
      }
    }
  }
`;

export const query = graphql`
  query PostBySlug($slug: String!, $prev: String, $next: String, $seriesSlugs: [String]) {
    ...PostTemplateFragment
  }
`;

export default PostTemplate;
