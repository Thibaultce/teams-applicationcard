import * as microsoftTeams from '@microsoft/teams-js';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IAppCard, IListItem } from './models/AppCard';
import { Guid } from '@microsoft/sp-core-library';
import { sp } from '@pnp/sp';
import { setup } from "@pnp/common";

export default class Api {

    private _teamsContext?: microsoftTeams.Context;
    private _webPartContext?: WebPartContext;

    private _projectListName: string = 'Projects';
    private _sharePointContext: string = 'SharePoint context';

    constructor(teamsContext?: microsoftTeams.Context, con?: WebPartContext) {

        this._teamsContext = teamsContext;
        this._webPartContext = con;
console.log(con);
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
            : this._webPartContext.pageContext.web.serverRelativeUrl + '/Shared Documents/' + this._sharePointContext;

        const files = await sp.web
            .getFolderByServerRelativePath(folderRelativeUrl + '/' + type)
            .files.get();

        return files.map(x => <IListItem>{
            Text: x.Name,
            Url: x.ServerRelativeUrl
        });
    }

    public getProjectDetails = async (): Promise<IAppCard> => {
        let channelId = this._sharePointContext;
        let channelName = this._sharePointContext;

        if (this._teamsContext) {
            channelId = this._teamsContext.channelId;
            channelName = this._teamsContext.channelName;
        }

        const projects = (await sp.web.lists
            .getByTitle(this._projectListName)
            .items
            .get()
        ).filter((e) => e.TeamsChannelIdentifier === channelId);

        let project;
        if (projects.length == 0) {
            // Creates project if it does not exists
            const addProject = await sp.web.lists
                .getByTitle(this._projectListName)
                .items
                .add({
                    Title: channelName,
                    TeamsChannelIdentifier: channelId
                });
            project = addProject.data;
        }
        else {
            project = projects[0];
        }


        console.log(project); 
        let result: IAppCard = {
            Id: Guid.parse(project.GUID),
            SpId: project.Id,
            EditLink: this._webPartContext.pageContext.web.absoluteUrl + '/Lists/' + this._projectListName + '/DispForm.aspx?ID=' + project.Id,
            Name: project.Title,
            Customer: project.Company,
            Version: project.ProjectVersion,
            Description: project.ACDescription,
            Architecture: project.ACArchitecture,
            TeamName: project.ACTeam,
            Technologies: project.ACTechnologies0.map(x => <IListItem>{
                Text: x.Label
            }),
            DevCorner: project.ACDevCorner
        };

        if (project.ACTeamMembersId != null){
            const members = project.ACTeamMembersId.map((x: number) => this.getUserTitle(x));
            await Promise.all(members).then((completed) => {
                result.TeamMembers = completed.map(x => <IListItem>{
                    Text: x
                })
            });
        }    

        result.ArchitectureLinks = await this.getFiles('Architecture');
        result.SpecificationLinks = await this.getFiles('Specifications');
        result.MockupLinks = await this.getFiles('Mockups');

        return result;
    }
}