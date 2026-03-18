// @flow
import loadable from '@loadable/component';
import { graphql, StaticQuery } from 'gatsby';
import React from 'react';

import Contacts from '../Contacts';
import Copyright from '../Copyright';
import DisplayIf from '../DisplayIf';

const CarbonAd = loadable(() => import('../CarbonAd'));

type Props = {
  +mobile?: boolean,
  +desktop?: boolean,
  +hideAd?: boolean,
};

type PureProps = Props & {
  +data: Object,
};

export const PureMovableSidebarContent = ({
  mobile,
  desktop,
  hideAd,
  data,
}: PureProps) => {
  const { author, copyright } = data.site.siteMetadata;
  return (
    <DisplayIf mobile={mobile} desktop={desktop}>
      {desktop && !hideAd && <CarbonAd />}
      <Contacts contacts={author.contacts} />
      <Copyright copyright={copyright} />
    </DisplayIf>
  );
};

export const MovableSidebarContent = (props: Props) => (
  <StaticQuery
    query={graphql`
      query MovableSidebarContentQuery {
        site {
          siteMetadata {
            author {
              contacts {
                twitter
                facebook
                github
                email
              }
            }
            copyright
          }
        }
      }
    `}
    render={data => <PureMovableSidebarContent {...props} data={data} />}
  />
);

export default MovableSidebarContent;
