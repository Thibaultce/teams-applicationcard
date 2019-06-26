import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import ApplicationCard, { IApplicationCardProps } from './components/ApplicationCard';
import Api from './Api';

export interface IApplicationCardWebPartProps {
}

export default class ApplicationCardWebPart extends BaseClientSideWebPart<IApplicationCardWebPartProps> {

  private _api: Api;

  protected onInit(): Promise<any> {
    let retVal: Promise<any> = Promise.resolve();
    
    if (this.context.microsoftTeams) {
      retVal = new Promise((resolve, reject) => {
        this.context.microsoftTeams.getContext(c => {
          this._api = new Api(this.context, c);
          resolve();
        });
      });
    }
    else{
      this._api = new Api(this.context, null);
    }
    return retVal;
  }

  public render(): void {
    const element: React.ReactElement<IApplicationCardProps > = React.createElement(
      ApplicationCard,
      {
        api: this._api
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  // protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
  //   return {
  //     pages: [
  //       {
  //         // header: {
  //         //   description: strings.PropertyPaneDescription
  //         // },
  //         // groups: [
  //         //   {
  //         //     groupName: "Folders",
  //         //     groupFields: [
  //         //       PropertyPaneTextField('folder1', {
  //         //         label: "Folder path 1"
  //         //       }),
  //         //       PropertyPaneTextField('folder2', {
  //         //         label: "Folder path 2"
  //         //       }),
  //         //       PropertyPaneTextField('folder3', {
  //         //         label: "Folder path 3"
  //         //       })
  //         //     ]
  //         //   }
  //         // ]
  //       //}
  //     ]
  //   };
  // }
}
