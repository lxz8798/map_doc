import React from 'react';
import clsx from 'clsx';

import styles from './index.module.scss';

// VUE版本展示列表
const featuresList = [
	{
		label: 'VUE2.0',
		des: '',
		code: ``
	},
	{
		label: 'VUE3.0',
		des: '',
		code: ``
	}
]

function Feature({Svg, title, description}) {
  return (
    // <div className={clsx('col col--4')}>
    //   <div className="text--center">
    //     <Svg className={styles.featureSvg} role="img" />
    //   </div>
    //   <div className="text--center padding-horiz--md">
    //     <h3>{title}</h3>
    //     <p>{description}</p>
    //   </div>
    // </div>
		<></>
  );
}

export default function MapTypes() {
	return (
		<div className={styles.mapTypesBox}>
			<div className='row'>
				{
					featuresList.map((props, idx) => (<Feature key={idx} {...props} />))
				}
			</div>
		</div>
	)
}