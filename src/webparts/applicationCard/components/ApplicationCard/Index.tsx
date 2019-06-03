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
                  <Card cardTitle="Architecture" cardIcon="link">
                    <ListCard ListItems={project != null && project.ArchitectureLinks}></ListCard>
                  </Card>
                </div>
                <div className={styles.column3}>
                  <Card cardTitle="Specification" cardIcon="link">
                  <ListCard ListItems={project != null && project.SpecificationLinks}></ListCard>
                  </Card>
                </div>
                <div className={styles.column3}>
                  <Card cardTitle="Mockups" cardIcon="link">
                  <ListCard ListItems={project != null && project.MockupLinks}></ListCard>
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
