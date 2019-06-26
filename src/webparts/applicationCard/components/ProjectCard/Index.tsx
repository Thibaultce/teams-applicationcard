import * as React from 'react';
import styles from './ProjectCard.module.scss';

export interface IProjectCardProps {
  name: string;
  version: string;
  client: string;
  editUrl: string;
}

export default class ProjectCard extends React.Component<IProjectCardProps> {
  constructor(props: IProjectCardProps) {
    super(props);

    this.state = {
    };
  }

  public render() {

    const icon: any = require('../../assets/project.png');

    return (
        <div className={styles.projectCard}>
          <div className={styles.centered}>
            {<img src={icon} />}
          </div>
          <div className={styles.description}>
            <span className={styles.projectName}>{this.props.name}</span>
            <span className={styles.version}>{this.props.version}</span>
            <span className={styles.customer}>{this.props.client}</span>
          </div>
          <div>
            <a href={this.props.editUrl} target="_blank">Edit</a>
          </div>
        </div>
    );
  }
}
