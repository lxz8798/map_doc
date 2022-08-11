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
  baseUrl: '/',
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
        title: '地图方法使用说明文档',
        logo: {
          alt: 'Logo',
          src: 'img/logo_black.png',
        },
        items: [
          {
            to: '/docs/category/comp',
            label: 'VUE通用组件',
            position: 'left',
            className: 'navbar_comp'
          },
          {
            to: '/docs/category/api',
            label: '接口',
            position: 'left',
            className: 'navbar_api'
          },
          {
            to: '/docs/category/types',
            label: '类型',
            position: 'left',
            className: 'navbar_types'
          },
          {
            to: '/docs/mapping',
            label: '字典',
            position: 'left',
            className: 'navbar_mapping'
          },
          {
            href: 'http://106.13.81.120:8090/lixz/from_vue2_null_project',
            label: 'JD-VUE2.0空白框架',
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
            label: 'JD-VUE3.0监测项目',
            position: 'right',
            className: 'navbar_jc'
          }
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'VUE通用组件',
            items: [
              {
                label: '地图',
                to: '/docs/api/Ainit',
              },
            ],
          },
          {
            title: '文档',
            items: [
              {
                label: '地图',
                to: '/docs/api/Ainit',
              },
            ],
          },
          {
            title: '类型',
            items: [
              {
                label: '渲染点相关',
                to: '/docs/api/Bpoint',
              },
              {
                label: '渲染线相关',
                to: '/docs/api/Cline',
              },
              {
                label: '渲染面相关',
                to: '/docs/api/Dpolygon',
              },
            ],
          },
          {
            title: '字典',
            items: [
              {
                label: '目标详情',
                to: '/docs/mapping',
              }
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} ${docOption.title}, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
