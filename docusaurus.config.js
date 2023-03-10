// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */

const docOption = {
  remote: 'master',
  branchName: 'lixz',
  title: "JD_PUBLIC_MAP_DOC"
}

const config = {
  title: docOption.title,
  tagline: 'Dinosaurs are cool',
  url: 'http://192.168.1.99:8080',
  baseUrl: '/mapdoc/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: docOption.remote, // Usually your GitHub org/user name. 
  projectName: docOption.title, // Usually your repo name.
  deploymentBranch: docOption.branchName,

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
      }),
    ],
  ],

  plugins: ['docusaurus-plugin-sass'],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: '??????????????????????????????',
        logo: {
          alt: 'Logo',
          src: 'img/logo_black.png',
        },
        items: [
          {
            to: '/docs/category/????????????',
            label: 'VUE????????????',
            position: 'left',
            className: 'navbar_comp'
          },
          {
            to: '/docs/category/????????????',
            label: '??????',
            position: 'left',
            className: 'navbar_api'
          },
          {
            to: '/docs/category/??????',
            label: '??????',
            position: 'left',
            className: 'navbar_types'
          },
          {
            href: 'http://106.13.81.120:8090/lixz/from_vue2_null_project',
            label: 'JD-VUE2.0????????????',
            position: 'right',
            className: 'navbar_vue2'
          },
          {
            href: 'http://106.13.81.120:8090/lixz/jd_map_fn',
            label: 'JD-MAP-FN',
            position: 'right',
            className: 'navbar_map_fn'
          },
          {
            href: 'http://106.13.81.120:8090/development/RD_No_Three/JD2022S004_TFZHJT_GROUP/ZHJTJC_GROUP/ZHJTJC_F/commits/dev',
            label: 'JD-VUE3.0????????????',
            position: 'right',
            className: 'navbar_jc'
          }
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'VUE????????????',
            items: [
              {
                label: '??????',
                to: '/docs/category/?????????',
              },
            ],
          },
          {
            title: '??????',
            items: [
              {
                label: '???????????????',
                to: '/docs/api/Ainit',
              },
            ],
          },
          {
            title: '??????',
            items: [
              {
                label: '???????????????',
                to: '/docs/api/Bpoint',
              },
              {
                label: '???????????????',
                to: '/docs/api/Cline',
              },
              {
                label: '???????????????',
                to: '/docs/api/Dpolygon',
              },
            ],
          },
          {
            title: '??????',
            items: [
              {
                label: '????????????',
                to: '/mapdoc/docs/category/??????',
              }
            ],
          },
        ],
        copyright: `Copyright ?? ${new Date().getFullYear()} ${docOption.title}, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
