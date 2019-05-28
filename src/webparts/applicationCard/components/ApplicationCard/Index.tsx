import * as React from 'react';
import styles from './ApplicationCard.module.scss';
import { IApplicationCardProps } from './IApplicationCardProps';
import TitleBox from '../TitleBox';
import Box from '../Box';

export default class ApplicationCard extends React.Component<IApplicationCardProps, {}> {
  public render(): React.ReactElement<IApplicationCardProps> {
    return (
      <div className={styles.applicationCard}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.columnLeft}>
              <TitleBox></TitleBox>
              <Box></Box>
              <Box></Box>
            </div>
            <div className={styles.columnRight}>
              <Box></Box>
              <Box></Box>
              <Box></Box>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
