import * as microsoftTeams from '@microsoft/teams-js';
import { IAppCard, IListItem } from './models/AppCard';
import { Guid } from '@microsoft/sp-core-library';

import { sp } from '@pnp/sp';
import { setup } from "@pnp/common";

export default class Api {
    private _teamsContext?: microsoftTeams.Context;

    constructor(teamsContext?: microsoftTeams.Context) {
        this._teamsContext = teamsContext;
        setup({
            spfxContext: teamsContext
        });
    }

    public getTeamName(): string {
        return this._teamsContext != null ? this._teamsContext.teamName : "SharePoint";
    }

    private getUserTitle = async (id: number): Promise<string> => {
        const user = await sp.web.siteUsers.getById(id).get();
        return user.Title;
    }

    public getProjectDetails = async (): Promise<IAppCard> => {
        let channelId = 'SharePoint context';
        let channelName = 'SharePoint context';
        if (this._teamsContext) {
            channelId = this._teamsContext.channelId;
            channelName = this._teamsContext.channelName;
        }

        const projects = (await sp.web.lists
            .getByTitle("Projects")
            .items
            .get()
        ).filter((e) => e.TeamsChannelIdentifier === channelId);

        let project;
        if (projects.length == 0) {
            // Creates project if it does not exists
            const addProject = await sp.web.lists
                .getByTitle("Projects")
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

        const members = project.ACTeamMembersId.map((x: number) => this.getUserTitle(x));
        await Promise.all(members).then((completed) => {
            result.TeamMembers = completed.map(x => <IListItem>{
                Text: x
            })
        }
        );

        return result;
    }
}