import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';

const Playgrounds = [
    {
      name: '🆕 CodeSandbox',
      image: require('../../../static/img/vuecomp/list1.png'),
      url: '#',
      description: (
        <Translate id="playground.codesandbox.description">
          CodeSandbox is a popular playground solution. Runs Docusaurus in a
          remote Docker container.
        </Translate>
      ),
    }
];

function PlaygroundCard({name, image, url, description}) {
    return (
      <div className="col col--6 margin-bottom--lg">
        <div className={clsx('card')}>
          <div className={clsx('card__image')}>
            asdcasdcas
            <Link to={url}>
                <img href={image} width="350" height="250" />
            </Link>
          </div>
          <div className="card__body">
            <h3>{name}</h3>
            <p>{description}</p>
          </div>
          <div className="card__footer">
            <div className="button-group button-group--block">
              <Link className="button button--secondary" to={url}>
                <Translate id="playground.tryItButton">Try it now!</Translate>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
}

export function PlaygroundCardsRow() {
    return (
        <div className="row">
          ssssss
        </div>
    );
}