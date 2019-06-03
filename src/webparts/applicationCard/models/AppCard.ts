import { Guid } from "@microsoft/sp-core-library";

export interface IAppCard {
    Id: Guid;
    Name?: string;
    Version?: string;
    Customer?: string;
    Description?: string;
    Technologies?: IListItem[];
    TeamName?: string;
    TeamMembers?: IListItem[];
    Environments?: IListItem[];
    DevLinks?: IListItem[];
}

export interface IListItem {
    Text: string;
    Url?: string;
    Description?: string;
}