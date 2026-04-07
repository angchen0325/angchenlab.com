// @flow
const getContactHref = (name: string, contact: string) => {
  let href;

  switch (name) {
    case 'email':
      href = `mailto:${contact}`;
      break;
    case 'github':
      href = `https://github.com/${contact}`;
      break;
    case 'twitter':
      href = `https://x.com/${contact}`;
      break;
    case 'facebook':
      href = `https://www.facebook.com/${contact}`;
      break;
    default:
      href = contact;
      break;
  }

  return href;
};

export default getContactHref;
