import * as React from 'react';
import styles from './ApplicationCard.module.scss';
import ProjectCard from '../ProjectCard';
import Card from '../Card';
import TextCard from '../TextCard';
import Api from '../../Api';
import { IAppCard } from '../../models/AppCard';
import ListCard from '../ListCard';


export interface IApplicationCardProps {
  api: Api;
}

export interface IApplicationCardState {
  project: IAppCard;
}

export default class ApplicationCard extends React.Component<IApplicationCardProps, IApplicationCardState> {

  /**
   *
   */
  constructor(props) {
    super(props);

    this.state = {
      project: null
    }

  }

  public componentDidMount() {
    this.props.api.getProjectDetails().then(project => {
      this.setState({
        project
      })
    });
    
  }

  public render(): React.ReactElement<IApplicationCardProps> {

    const {
      project
    } = this.state;

    return (
      <div className={styles.applicationCard}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.columnLeft}>
              <ProjectCard name={project && project.Name} client={project && project.Customer} version={project && project.Version}></ProjectCard>
              <Card cardTitle={project && project.TeamName} cardIcon="team">
                <ListCard ListItems={project != null && project.TeamMembers}></ListCard>
              </Card>
              <Card cardTitle="Technologies" cardIcon="technologies">
                <ListCard ListItems={project != null && project.Technologies}></ListCard>
              </Card>
              {
                project != null && project.Environments != null && project.Environments.length > 0
                  ? <Card cardTitle="Environments" cardIcon="environment">
                    <ListCard ListItems={project != null && project.Environments}></ListCard>
                  </Card>
                  : <React.Fragment></React.Fragment>
              }
              {
                project != null && project.DevLinks != null && project.DevLinks.length > 0
                  ? <Card cardTitle="Developers' corner" cardIcon="geek">
                    <ListCard ListItems={project != null && project.DevLinks}></ListCard>
                  </Card>
                  : <React.Fragment></React.Fragment>
              }
            </div>
            <div className={styles.columnRight}>
              <Card cardTitle="Description" cardIcon="description">
                <TextCard content={project && project.Description}></TextCard>
              </Card>
              {/* <Card cardTitle="Architecture"></Card> */}
              <div className={styles.row}>
                <div className={styles.column3}>
                  <Card cardTitle="Architecture" cardIcon="link"></Card>
                </div>
                <div className={styles.column3}>
                  <Card cardTitle="Specification"  cardIcon="link"></Card>
                </div>
                <div className={styles.column3}>
                  <Card cardTitle="Mockups"  cardIcon="link"></Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
