import {EmbedBuilder} from "discord.js";
import {GameUser} from "../interfaces/Game";
import {GameInt} from "../database/models/GameModel";
import {GameController} from "../controllers/GameController";
import {Data} from "../data";
import {MapInt} from "../database/models/MapModel";

export const matchFinalEmbed = (game: GameInt, users: GameUser[], mapData: MapInt) => {
    const embed = new EmbedBuilder();

    embed.setTitle(`Match ${game.matchId} ${game.map.toUpperCase()} ${game.queueId}`);
    if (game.winner == 0) {
        embed.setDescription(`Team A wins against Team B ${game.scoreA}-${game.scoreB}`);
    } else if (game.winner == 1) {
        embed.setDescription(`Team B wins against Team A ${game.scoreB}-${game.scoreA}`);
    } else {
        embed.setDescription(`Team A and B draw ${game.scoreA}-${game.scoreB}`);
    }

    let teamA = '';
    let teamB = '';

    for (let user of users) {
        if (user.team == 0) {
            teamA += `<@${user.discordId}>\n`;
        } else {
            teamB += `<@${user.discordId}>\n`;
        }
    }

    embed.setFields([
        {
            name: `Team A: ${game.sides[0]}`,
            value: teamA,
            inline: true,
        },
        {
            name: `Team B: ${game.sides[1]}`,
            value: teamB,
            inline: true,
        },
    ]);

    embed.setImage(mapData.imageURL);

    return embed.toJSON();
}

export const matchConfirmEmbed = (scores: number[]) => {
    const embed = new EmbedBuilder()

    embed.setTitle('Accept Scores')
    embed.setDescription('If these score are incorrect resubmit using the buttons on the initial message that is pinned')
    embed.setFields([
        {
           name: 'Team A',
           value: String(scores[0]),
           inline: true ,
        },{
            name: 'Team B',
            value: String(scores[1]),
            inline: true,
        }
    ])

    return embed.toJSON();
}

export const teamsEmbed = async (users: GameUser[], matchNumber: number, queue: string, map: MapInt, sides: string[]) => {
    const embed = new EmbedBuilder()

    let teamA = '';
    let teamB = '';

    for (let user of users) {
        if (user.team == 0) {
            teamA += `<@${user.discordId}>\n`
        } else {
            teamB += `<@${user.discordId}>\n`
        }
    }

    embed.setTitle(`${queue.toUpperCase()}-Match-${matchNumber}: ${map.name.toUpperCase()}`);
    embed.setFields([
        {
            name: `Team A: ${sides[0]}`,
            value: teamA,
            inline: true,
        },
        {
            name: `Team B: ${sides[1]}`,
            value: teamB,
            inline: true,
        },
    ])

    embed.setImage(map.imageURL);

    return embed.toJSON();

}

export const gameEmbed = (game: GameController) => {
    const embed = new EmbedBuilder()
    embed.setTitle(`Match ${game.matchNumber}-${game.map}`);
    embed.setDescription(`Game started <t:${game.startTime}:R>`);
    if (game.state >= 1) {
        let teamA = "";
        let teamB = "";
        for (let user of game.users) {
            if (user.team == 0) {
                teamA += `<@${user.discordId}>\n`;
            } else {
                teamB += `<@${user.discordId}>\n`;
            }
        }
        embed.addFields({
            name: `Team A-${game.sides[0]}`,
            value: teamA,
            inline: true,
        }, {
            name: `Team B-${game.sides[1]}`,
            value: teamB,
            inline: true,
        });
    } else {
        let accepted = "";
        let noAccepted = "";
        for (let user of game.users) {
            if (user.accepted) {
                accepted += `<@${user.discordId}>\n`;
            } else {
                noAccepted += `<@${user.discordId}>\n`;
            }
        }
        embed.addFields({
            name: `Accepted`,
            value: accepted,
            inline: true,
        }, {
            name: `Not Accepted`,
            value: noAccepted,
            inline: true,
        });
    }

    return embed.toJSON();
}
