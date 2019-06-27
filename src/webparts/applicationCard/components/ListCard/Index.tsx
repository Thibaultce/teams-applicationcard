import * as React from 'react';
import { IListItem, ListItemType } from '../../models/AppCard';
import styles from './ListCard.module.scss';
import * as microsoftTeams from "@microsoft/teams-js";
import { Guid } from '@microsoft/sp-core-library';

export interface IListCardProps {
    ListItems: IListItem[];
}

export interface IListCardState {

}

export default class ListCard extends React.Component<IListCardProps, IListCardState> {
    private _tenantId: string;

    constructor(props: IListCardProps) {
        super(props);
        this.state = {
        };
    }

    public componentDidMount() {
        microsoftTeams.getContext((context) => {
            this._tenantId = context.tid;
        });
    }

    openFile(e, fileId: Guid, fileType: string, url: string) {
        e.preventDefault();
        microsoftTeams.executeDeepLink("https://teams.microsoft.com/l/file/" + fileId + "?tenantId=" + this._tenantId + "&fileType=" + fileType + "&objectUrl=" + encodeURIComponent(url));
    }

    public render() {
        return (
            <div>
                <ul className={styles.list}>
                    {
                        this.props.ListItems && this.props.ListItems.sort((a, b) => (a.Text > b.Text) ? 1 : -1).map((listItem, index) => {

                            if (listItem.Type == ListItemType.Link) {
                                return <li key={index}><a href={listItem.Url} target="_blank">{listItem.Text}</a>{listItem.Description && <span>{listItem.Description}</span>}</li>;
                            }
                            else if (listItem.Type == ListItemType.File) {
                                return <li key={index}><a href="#" onClick={(e) => this.openFile(e, listItem.Id, listItem.Extension, listItem.Url)}>{listItem.Text}</a></li>;
                            }
                            else {
                                return <li key={index}>{listItem.Text}{listItem.Description && <span>{listItem.Description}</span>}</li>;
                            }
                        })
                    }
                </ul>
            </div>
        );
    }
}
