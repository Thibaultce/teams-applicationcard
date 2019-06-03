import * as React from 'react';

export interface ITextCardProps {
    content: string;
}

export interface ITextCardState {
}

export default class TextCard extends React.Component<ITextCardProps, ITextCardState> {
  constructor(props: ITextCardProps) {
    super(props);

    this.state = {
    }
  }

  public render() {
    return (
      <div>
          <p>{this.props.content}</p> 
      </div>
    );
  }
}
