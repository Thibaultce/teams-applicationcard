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
            <div className={styles.vb}>
                <span className={styles.project}>{this.props.name}</span><br />
                <span>{this.props.version}</span><br />
                <span className={styles.client}>{this.props.client}</span><br /><br/>
                <span><a href={this.props.editUrl} className={styles.update} target="_blank">Update Card</a></span>
            </div> <br />
        </div>
        
        
    );
  }
}
