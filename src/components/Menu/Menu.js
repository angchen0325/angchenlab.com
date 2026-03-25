import classNames from 'classnames/bind';
import { graphql, Link, StaticQuery } from 'gatsby';
import React from 'react';

import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

export const isMenuItemActive = (itemPath, pathname = '') => {
  if (!pathname) {
    return false;
  }

  if (itemPath === '/') {
    return pathname === '/';
  }

  if (itemPath === '/blog/') {
    return pathname === '/blog/' || pathname.startsWith('/blog/page/') || pathname.startsWith('/blog/top/');
  }

  if (itemPath === '/tags/') {
    return pathname === '/tags/' || pathname.startsWith('/tag/');
  }

  return pathname === itemPath;
};

const getMenuItemClassName = (itemPath, pathname, bold) =>
  cx({
    'menu__list-item-link': true,
    bold,
    'menu__list-item-link--active': isMenuItemActive(itemPath, pathname),
  });

export const PureMenu = ({ data, horizontal, bold, noMargin, location }) => {
  const { menu } = data.site.siteMetadata;
  const pathname = location ? location.pathname : '';
  return (
    <nav
      className={cx({
        menu: true,
        horizontal,
        'no-margin': noMargin,
      })}
    >
      <ul className={styles['menu__list']}>
        {menu.map(item => (
          <li className={styles['menu__list-item']} key={item.path}>
            <Link
              to={item.path}
              className={getMenuItemClassName(item.path, pathname, bold)}
              getProps={({ location: currentLocation }) => ({
                className: getMenuItemClassName(item.path, currentLocation.pathname, bold),
              })}
            >
              {item.icon && (
                <span className={styles['menu__list-item-icon-wrap']}>
                  <i className={cx('menu__list-item-icon', item.icon)} aria-hidden="true" />
                </span>
              )}
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export const Menu = props => (
  <StaticQuery
    query={graphql`
      query MenuQuery {
        site {
          siteMetadata {
            menu {
              label
              icon
              path
            }
          }
        }
      }
    `}
    render={data => <PureMenu {...props} data={data} />}
  />
);

export default Menu;
