import * as microsoftTeams from '@microsoft/teams-js';
import { IAppCard } from './models/AppCard';
import { Guid } from '@microsoft/sp-core-library';

export default class Api {
    private _teamsContext?: microsoftTeams.Context;

    constructor(teamsContext?:microsoftTeams.Context) {
        this._teamsContext = teamsContext;
    }

    public getTeamName(): string {
        return this._teamsContext != null ? this._teamsContext.teamName : "SharePoint";
    }

    public getProjectDetails(): IAppCard {
        return { 
            Id: Guid.parse("59089073-21b1-45f4-8c49-fabf1a94ca19"),
            Name: 'Coucou',
            Customer: 'ClientC',
            Version: '24.2.2',
            Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lacinia ligula mauris, et dignissim dui condimentum at. Morbi at porttitor dolor, eget ullamcorper quam. Pellentesque ac turpis quis turpis iaculis pharetra tincidunt non turpis. Aenean sagittis dapibus tincidunt. In a nisl fringilla, sagittis lorem quis, pretium nisl. Aenean hendrerit erat nec orci interdum, convallis euismod quam sollicitudin. Suspendisse efficitur felis sapien, dapibus faucibus sapien scelerisque eget. Etiam elementum sit amet nulla in vestibulum. Ut in enim et turpis sodales pulvinar. Nullam mollis eleifend pulvinar. Mauris consectetur libero et malesuada bibendum. Donec vel ornare quam. Mauris et quam lectus. Donec vel felis eu diam tincidunt bibendum et vitae mauris.',
            TeamName: "Digital Factory",
            TeamMembers: [
                {
                    Text: "Thibault Ceulemans",
                    Description: "Software Architect"
                },
                {
                    Text: "Eléna Even",
                    Description: "UX Expert"
                }
            ],
            Technologies: [
                {
                    Text: "Asp.Net Core"
                },
                {
                    Text: "Azure SQL"
                }
            ],
            DevLinks: [
                {
                    Text: "Azure DevOps",
                    Url: "http://google.com"
                }
            ]
            
        };
    }
}