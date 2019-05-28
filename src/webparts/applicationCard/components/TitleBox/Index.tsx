import * as React from 'react';

export interface ITitleBoxProps {
}

export default class TitleBox extends React.Component<ITitleBoxProps> {
  constructor(props: ITitleBoxProps) {
    super(props);

    this.state = {
    }
  }

  public render() {
    return (
      <div>
        <h1>Test</h1>
      </div>
    );
  }
}
