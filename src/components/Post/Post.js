// @flow
import { graphql } from 'gatsby';
import * as React from 'react';

import Author from '../Author';
import Content from '../Content';
import Discuss from '../Discuss';
import Comments from './Comments';
import styles from './Post.module.scss';
import Tags from './Tags';

type PostType = {
  +fields: Object,
  +frontmatter: {
    +description: string,
    +discussLinkTwitter?: string,
    +discussLinkHN?: string,
    +discussLinkReddit?: string,
    +guestAuthor?: ?string,
    +guestCoAuthor?: ?boolean,
    +guestAuthorLink?: ?string,
    +img: string,
    +slug: string,
    +tags?: string,
    +title: string,
  },
  +html: string,
};

type Props = {|
  +post: PostType,
  +prevPost?: PostType,
  +nextPost?: PostType,
  +contentFooter?: React.Node,
  +hideDescription?: boolean,
|};

const Post = ({ post, contentFooter, hideDescription }: Props) => {
  const {
    tags,
    title,
    description,
    slug,
    discussLinkTwitter,
    discussLinkHN,
    discussLinkReddit,
    guestAuthor,
    guestCoAuthor,
    guestAuthorLink,
  } = post.frontmatter;
  const { dateFormatted, dateModifiedFormatted } = post.fields;

  const { html } = post;

  return (
    <div className={styles['post']}>
      <Content
        html={html}
        title={title}
        subtitle={hideDescription ? null : description}
        dateFormatted={dateFormatted}
        dateModifiedFormatted={dateModifiedFormatted}
        footer={contentFooter}
        guestAuthor={guestAuthor}
        guestCoAuthor={guestCoAuthor}
        guestAuthorLink={guestAuthorLink}
      />

      <div className={styles['post__viewSource']}>
        <p>
          <i>
            This blog is{' '}
            <a
              href="https://github.com/angchen0325/angchenlab.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              open-source on GitHub
            </a>
            .
          </i>
        </p>
      </div>

      <div className={styles['post__footer']}>
        {tags && <Tags tags={tags} tagSlugs={post.fields.tagSlugs} />}
        <div className={styles['post__authorContainer']}>
          <Author showBio showTwitter />
        </div>
        <Discuss twitter={discussLinkTwitter} hn={discussLinkHN} reddit={discussLinkReddit} />
      </div>

      <div className={styles['post__comments']}>
        <Comments />
      </div>
    </div>
  );
};

export const fragment = graphql`
  fragment PostFragment on MarkdownRemark {
    ...ContentFragment
    frontmatter {
      ...DiscussFragment
    }
  }
`;

export default Post;
