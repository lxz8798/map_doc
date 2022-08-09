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