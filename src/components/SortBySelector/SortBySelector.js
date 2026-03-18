// @flow
import classnames from 'classnames/bind';
import { Link } from 'gatsby';
import React from 'react';

import { topPostsPagePath } from '../../utils/page-paths';
import styles from './SortBySelector.module.scss';

const cx = classnames.bind(styles);

type Props = $ReadOnly<{|
  sortByNew: boolean,
|}>;

const SortBySelector = ({ sortByNew }: Props) => (
  <div className={styles['root']}>
    <ul>
      <li>
        <Link className={cx({ link: true, selected: sortByNew })} to="/">
          New
        </Link>
      </li>
      <li>
        <Link className={cx({ link: true, selected: !sortByNew })} to={topPostsPagePath(1)}>
          Top
        </Link>
      </li>
    </ul>
  </div>
);

export default SortBySelector;
