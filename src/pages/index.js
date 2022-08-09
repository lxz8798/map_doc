/*
 * @Author: lixz lixz@qq.com
 * @LastEditTime: 2022-08-09 10:00:05
 * @FilePath: \map-doc\src\pages\index.js
 * @Description: 
 * 有需要可以联:lxz8798(微信号)或9544605@qq.com
 */
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import MapInit from '../components/mapInit/';
import MapTypes from '../components/mapTypes/';
import styles from './index.module.scss';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="这个文档是九鼎内部为前端小伙伴提供的开发文档，主旨在与快速开发与地图有关的应用。 <head />">
      <main>
        <div className={styles.mapBoxPage}>
          <MapInit></MapInit>
          <MapTypes></MapTypes>
        </div>
      </main>
    </Layout>
  );
}
