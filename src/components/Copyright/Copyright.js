// @flow
import React from 'react';

import styles from './Copyright.module.scss';

type Props = {|
  +copyright: string,
|};

const Copyright = ({ copyright }: Props) => {
  const baseText = copyright.replace(/\s+\d{4}$/, '').trim();
  const currentYear = new Date().getFullYear();
  const text = `${baseText || copyright} ${currentYear}`.trim();
  return <p className={styles['copyright']}>{text}</p>;
};

export default Copyright;
