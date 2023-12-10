import {EmbedBuilder} from "discord.js";
import {GameUser} from "../interfaces/Game";
import tokens from "../tokens";
import {GameInt} from "../database/models/GameModel";
import {getUserById} from "../modules/getters/getUser";

export const matchFinalEmbed = (game: GameInt, users: GameUser[]) => {
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

    if (game.map.toLowerCase() == 'mirage') {
        embed.setImage(tokens.Images.Mirage);
    } else if (game.map.toLowerCase() == 'dust 2') {
        embed.setImage(tokens.Images.Dust2);
    } else if (game.map.toLowerCase() == 'cache') {
        embed.setImage(tokens.Images.Cache);
    } else if (game.map.toLowerCase() == 'oilrig') {
        embed.setImage(tokens.Images.Oilrig);
    } else if (game.map.toLowerCase() == 'inferno') {
        embed.setImage(tokens.Images.Inferno);
    } else if (game.map.toLowerCase() == 'overpass') {
        embed.setImage(tokens.Images.Overpass);
    } else if (game.map.toLowerCase() == 'vertigo') {
        embed.setImage(tokens.Images.Vertigo);
    }

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

export const teamsEmbed = async (users: GameUser[], matchNumber: number, queue: string, map: string, sides: string[]) => {
    const embed = new EmbedBuilder()

    let teamA = '';
    let teamB = '';

    for (let user of users) {
        const dbUser = await getUserById(user.dbId);
        if (user.team == 0) {
            teamA += `<@${user.discordId}>:${dbUser.oculusName}\n`
        } else {
            teamB += `<@${user.discordId}>:${dbUser.oculusName}\n`
        }
    }

    embed.setTitle(`${queue.toUpperCase()}-Match-${matchNumber}: ${map.toUpperCase()}`);
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

    if (map.toLowerCase() == 'mirage') {
        embed.setImage(tokens.Images.Mirage);
    } else if (map.toLowerCase() == 'dust 2') {
        embed.setImage(tokens.Images.Dust2);
    } else if (map.toLowerCase() == 'cache') {
        embed.setImage(tokens.Images.Cache);
    } else if (map.toLowerCase() == 'oilrig') {
        embed.setImage(tokens.Images.Oilrig);
    } else if (map.toLowerCase() == 'inferno') {
        embed.setImage(tokens.Images.Inferno);
    } else if (map.toLowerCase() == 'overpass') {
        embed.setImage(tokens.Images.Overpass);
    } else if (map.toLowerCase() == 'vertigo') {
        embed.setImage(tokens.Images.Vertigo);
    }

    return embed.toJSON();

}
