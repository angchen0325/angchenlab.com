// @flow
import React from 'react';

import { getContactHref } from '../../utils';
import styles from './Contacts.module.scss';

type Props = {|
  +contacts: Object,
|};

const CONTACT_ICON_CLASSES = {
  twitter: 'fa-brands fa-x-twitter',
  facebook: 'fa-brands fa-square-facebook',
  github: 'fa-brands fa-github',
  email: 'fa-solid fa-envelope',
};

const Contacts = ({ contacts }: Props) => (
  <div className={styles['contacts']}>
    <ul className={styles['contacts__list']}>
      {Object.keys(contacts).map(name => (
        <li className={styles['contacts__list-item']} key={name}>
          <a
            className={styles['contacts__list-item-link']}
            href={getContactHref(name, contacts[name])}
            rel="noopener noreferrer"
            target="_blank"
          >
            <i
              className={`${styles['contacts__list-item-icon']} ${CONTACT_ICON_CLASSES[name] || 'fa-solid fa-link'}`}
              aria-hidden="true"
            />
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default Contacts;
