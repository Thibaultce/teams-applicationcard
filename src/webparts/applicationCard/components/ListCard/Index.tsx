import * as React from 'react';
import { IListItem } from '../../models/AppCard';
import styles from './ListCard.module.scss';

export interface IListCardProps {
    ListItems: IListItem[];
}

export interface IListCardState {

}

export default class ListCard extends React.Component<IListCardProps, IListCardState> {
    constructor(props: IListCardProps) {
        super(props);

        this.state = {

        }
    }

    public render() {
        return (
            <div>
                <ul className={styles.list}>
                    {
                        this.props.ListItems && this.props.ListItems.map(function (listItem, index) {
                            var item = listItem.Url != null ? <a href={listItem.Url}>{listItem.Text}</a> : listItem.Text;
                            return <li key={index}>{item}{listItem.Description && <span>{listItem.Description}</span>}</li>
                        })
                    }
                </ul>
            </div>
        );
    }
}
