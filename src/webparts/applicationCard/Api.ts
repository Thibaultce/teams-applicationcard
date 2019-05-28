import * as microsoftTeams from '@microsoft/teams-js';

export default class Api {
    private _teamsContext?: microsoftTeams.Context;

    constructor(teamsContext?:microsoftTeams.Context) {
        this._teamsContext = teamsContext;
    }

    public getTeamName(): string {
        return this._teamsContext != null ? this._teamsContext.teamName : "SharePoint";
      }
}