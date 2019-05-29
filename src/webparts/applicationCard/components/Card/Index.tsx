import * as React from 'react';
import styles from './Card.module.scss';

export interface ICardProps {
  cardTitle: string;
  cardIcon?: string;
}

export interface ICardState {
}

export default class Box extends React.Component<ICardProps, ICardState> {
  constructor(props: ICardProps) {
    super(props);

    this.state = {
    }
  }

  public render() {
    let iconPath = this.props.cardIcon && "../../../../../assets/" + this.props.cardIcon;

    return (
      <div className={styles.card}>
        <div className={styles.cardTitle}>
          {iconPath && <img src= { iconPath } />}
          <span>{this.props.cardTitle}</span>
        </div>
        <div className={styles.cardBody}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
