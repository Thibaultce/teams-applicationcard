import { Guid } from "@microsoft/sp-core-library";

export interface IAppCard {
    Id: Guid;
    Name?: string;
    Version?: string;
    Customer?: string;
    Description?: string;
    Architecture?: string;
    Technologies?: IListItem[];
    TeamName?: string;
    TeamMembers?: IListItem[];
    Environments?: string;
    DevCorner?: string;
}

export interface IListItem {
    Text: string;
    Url?: string;
    Description?: string;
}