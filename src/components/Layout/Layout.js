import React from 'react';

import styles from './Layout.module.scss';

export const PureLayout = ({ children }) => <div className={styles.layout}>{children}</div>;

export const Layout = props => <PureLayout {...props} />;

export default Layout;
