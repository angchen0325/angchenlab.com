'use strict';

module.exports = {
  url: 'https://angchenlab.com',
  title: 'Ang Chen\'s Lab',
  subtitle:
    'An optical physicist fueled by blogging about optics, photonics, semiconductors, colors and more topics.',
  copyright: '© Ang Chen',
  postsPerPage: 6,
  googleAnalyticsMeasurementId: process.env.GA_MEASUREMENT_ID || 'G-00R0DX958Z',
  menu: [
    {
      label: 'About',
      icon: 'fa-solid fa-house',
      path: '/',
    },
    {
      label: 'Projects',
      icon: 'fa-solid fa-diagram-project',
      path: '/projects/',
    },
    {
      label: 'Blog',
      icon: 'fa-solid fa-blog',
      path: '/blog/',
    },
    {
      label: 'Tags',
      icon: 'fa-solid fa-tags',
      path: '/tags/',
    },
    {
      label: 'CV',
      icon: 'fa-solid fa-file-lines',
      path: '/cv/',
    },
  ],
  author: {
    name: 'Ang Chen',
    photo: '/photo.png',
    photoLarge: '/photo_large.png',
    bio: 'An optical physicist fueled by blogging about <a href="/tag/optics/">optics</a>, <a href="/tag/photonics/">photonics</a>, <a href="/tag/semiconductors/">semiconductors</a>, <a href="/tag/colors/">colors</a> and <a href="/tags/">more topics</a>.',
    contacts: {
      email: 'chenang@outlook.com',
      github: 'angchen0325',
      twitter: 'angchen0325',
      facebook: 'angchen0325',
    },
  },
  previewImage: '/photo_large.png',
};
