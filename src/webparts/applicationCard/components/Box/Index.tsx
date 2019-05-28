import * as React from 'react';
import styles from './Box.module.scss';

export interface IBoxProps {
}

export interface IBoxState {
}

export default class Box extends React.Component<IBoxProps, IBoxState> {
  constructor(props: IBoxProps) {
    super(props);

    this.state = {
    }
  }

  public render() {
    return (
      <div className={styles.box}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lacinia ligula mauris, et dignissim dui condimentum at. Morbi at porttitor dolor, eget ullamcorper quam. Pellentesque ac turpis quis turpis iaculis pharetra tincidunt non turpis. Aenean sagittis dapibus tincidunt. In a nisl fringilla, sagittis lorem quis, pretium nisl. Aenean hendrerit erat nec orci interdum, convallis euismod quam sollicitudin. Suspendisse efficitur felis sapien, dapibus faucibus sapien scelerisque eget. Etiam elementum sit amet nulla in vestibulum. Ut in enim et turpis sodales pulvinar. Nullam mollis eleifend pulvinar. Mauris consectetur libero et malesuada bibendum. Donec vel ornare quam. Mauris et quam lectus. Donec vel felis eu diam tincidunt bibendum et vitae mauris. </p>
      </div>
    );
  }
}
