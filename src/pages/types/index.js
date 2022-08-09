/*
 * @Author: lixz lixz@qq.com
 * @LastEditTime: 2022-08-09 18:02:25
 * @FilePath: \map-doc\src\pages\types\index.js
 * @Description: 地图目标类型页面
 * 有需要可以联:lxz8798(微信号)或9544605@qq.com
 */
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.scss';

export default function mapInit() {
	const {siteConfig} = useDocusaurusContext();
	return (
		<Layout 
				title={`Hello from ${siteConfig.title}`}
				description="这个页面描述地图如何初始化"
			>
			
		</Layout>
	)
}