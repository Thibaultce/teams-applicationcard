import { Guid } from "@microsoft/sp-core-library";

export interface IAppCard {
    Id: Guid;
    SpId: number;
    EditLink: string;
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
    Folder1?: IFolder;
    Folder2?: IFolder;
    Folder3?: IFolder;
}

export interface IListItem {
    Text: string;
    Url?: string;
    Description?: string;
}

export interface IFolder {
    Name: string;
    Items: IListItem[];
}