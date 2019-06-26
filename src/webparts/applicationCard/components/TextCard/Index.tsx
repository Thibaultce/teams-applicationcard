import * as React from 'react';
import styles from './TextCard.module.scss';

export interface ITextCardProps {
    content: string;
}

export interface ITextCardState {
}

export default class TextCard extends React.Component<ITextCardProps, ITextCardState> {
  constructor(props: ITextCardProps) {
    super(props);

    this.state = {
    };
  }

  public render() {
    return (
      <div className={styles.textCard}>
          <p dangerouslySetInnerHTML={{__html: this.props.content}}></p> 
      </div>
    );
  }
}
