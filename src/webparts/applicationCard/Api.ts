import * as microsoftTeams from '@microsoft/teams-js';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IAppCard, IListItem, ListItemType } from './models/AppCard';
import { Guid } from '@microsoft/sp-core-library';
import { sp } from '@pnp/sp';
import { setup } from "@pnp/common";

export default class Api {

    private _teamsContext?: microsoftTeams.Context;
    private _webPartContext?: WebPartContext;

    private _projectListName: string = 'Application Cards';
    private _sharePointContextName: string = 'SharePoint context';

    constructor(con?: WebPartContext, teamsContext?: microsoftTeams.Context) {

        this._teamsContext = teamsContext;
        this._webPartContext = con;

        setup({
            spfxContext: con
        });
    }

    private getUserTitle = async (id: number): Promise<string> => {
        const user = await sp.web.siteUsers.getById(id).get();
        return user.Title;
    }

    private getFiles = async (type: string): Promise<IListItem[]> => {
        const folderRelativeUrl = this._teamsContext != null
            ? this._teamsContext.channelRelativeUrl
            : this._webPartContext.pageContext.web.serverRelativeUrl + '/Shared Documents/' + this._sharePointContextName;

        const files = await sp.web
            .getFolderByServerRelativePath(folderRelativeUrl + type)
            .files.get();

        const parseAbsoluteUrl = this._webPartContext.pageContext.web.absoluteUrl.replace(this._webPartContext.pageContext.web.serverRelativeUrl, '');
        
        return files.map(x => <IListItem>{
            Type: ListItemType.File,

            Id: x.UniqueId,
            Text: x.Name,
            Url: parseAbsoluteUrl + x.ServerRelativeUrl,
            Extension: x.Name.split('.').pop()
        });
    }

    public getProjectDetails = async (): Promise<IAppCard> => {
        let channelId = this._sharePointContextName;
        let channelName = this._sharePointContextName;

        if (this._teamsContext) {
            channelId = this._teamsContext.channelId;
            channelName = this._teamsContext.channelName;
        }

        const projects = (await sp.web.lists
            .getByTitle(this._projectListName)
            .items
            .get()
        ).filter((e) => e.ACTeamsChannelIdentifier === channelId);

        let project;
        if (projects.length == 0) {
            // Creates project if it does not exists
            const addProject = await sp.web.lists
                .getByTitle(this._projectListName)
                .items
                .add({
                    Title: channelName,
                    ACTeamsChannelIdentifier: channelId
                });
            project = addProject.data;
        }
        else {
            project = projects[0];
        }
        
        let result: IAppCard = {
            Id: Guid.parse(project.GUID),
            SpId: project.Id,
            EditLink: this._webPartContext.pageContext.web.absoluteUrl + '/Lists/' + this._projectListName.replace(' ', '') + '/DispForm.aspx?ID=' + project.Id,
            Name: project.Title,
            Customer: project.Company,
            Version: project.ACVersion,
            Description: project.ACDescription,
            Architecture: project.ACArchitecture,
            TeamName: project.ACTeam,
            DevCorner: project.ACDevCorner
        };

        if (project.ACTechnologies != null){
            result.Technologies = project.ACTechnologies.map(x => <IListItem>{
                Type: ListItemType.Normal,
                Text: x.Label.split(":").pop()
            });
        }

        if (project.ACTeamMembersId != null){
            const members = project.ACTeamMembersId.map((x: number) => this.getUserTitle(x));
            await Promise.all(members).then((completed) => {
                result.TeamMembers = completed.map(x => <IListItem>{
                    Type: ListItemType.Normal,
                    Text: x
                });
            });
        }    

        result.Folder1 = { Name: project.ACFolder1, Items: await this.getFiles(project.ACFolder1)};
        result.Folder2 = { Name: project.ACFolder2, Items: await this.getFiles(project.ACFolder2)};
        result.Folder3 = { Name: project.ACFolder3, Items: await this.getFiles(project.ACFolder3)};

        return result;
    }
}