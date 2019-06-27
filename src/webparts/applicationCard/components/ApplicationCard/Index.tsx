import * as React from 'react';
import styles from './ApplicationCard.module.scss';
import ProjectCard from '../ProjectCard';
import Card from '../Card';
import TextCard from '../TextCard';
import Api from '../../Api';
import { IAppCard } from '../../models/AppCard';
import ListCard from '../ListCard';
import * as microsoftTeams from "@microsoft/teams-js";


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
    microsoftTeams.initialize();
    this.state = {
      project: null
    };

  }

  public componentDidMount() {
    this.props.api.getProjectDetails().then(project => {
      this.setState({
        project
      });
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
              <ProjectCard name={project && project.Name} client={project && project.Customer} version={project && project.Version} editUrl={project && project.EditLink}></ProjectCard>
              <Card cardTitle={project && project.TeamName} cardIcon="team">
                <ListCard ListItems={project != null && project.TeamMembers}></ListCard>
              </Card>
              <Card cardTitle="Technologies" cardIcon="technologies">
                <ListCard ListItems={project != null && project.Technologies}></ListCard>
              </Card>
              {
                project != null && project.Environments != null && project.Environments.length > 0
                  ? <Card cardTitle="Environments" cardIcon="environment">
                    <TextCard content={project && project.Environments}></TextCard>
                  </Card>
                  : <React.Fragment></React.Fragment>
              }
              {
                project != null && project.DevCorner != null && project.DevCorner.length > 0
                  ? <Card cardTitle="Developers' corner" cardIcon="geek">
                    <TextCard content={project && project.DevCorner}></TextCard>
                  </Card>
                  : <React.Fragment></React.Fragment>
              }
            </div>
            <div className={styles.columnRight}>
              <Card cardTitle="Description" cardIcon="description">
                <TextCard content={project && project.Description}></TextCard>
              </Card>
              <Card cardTitle="Architecture" cardIcon="architecture">
                <TextCard content={project && project.Architecture}></TextCard>
              </Card>
              <div className={styles.row}>
                <div className={styles.column3}>
                <Card cardTitle={project != null && project.Folder1.Name} cardIcon="link">
                    <ListCard ListItems={project != null && project.Folder1.Items}></ListCard>
                  </Card>
                </div>
                <div className={styles.column3}>
                <Card cardTitle={project != null && project.Folder2.Name} cardIcon="link">
                    <ListCard ListItems={project != null && project.Folder2.Items}></ListCard>
                  </Card>
                </div>
                <div className={styles.column3}>
                  <Card cardTitle={project != null && project.Folder3.Name} cardIcon="link">
                    <ListCard ListItems={project != null && project.Folder3.Items}></ListCard>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
