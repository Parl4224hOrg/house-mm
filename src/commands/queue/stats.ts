import {Command} from "../../interfaces/Command";
import {SlashCommandBuilder} from "@discordjs/builders";
import {userOption} from "../../utility/options";
import tokens from "../../tokens";
import {logError} from "../../loggers";
import {getUserByUser} from "../../modules/getters/getUser";
import {getRankNumber, getStats} from "../../modules/getters/getStats";
import {statsEmbed} from "../../embeds/statsEmbed";

export const stats: Command = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Displays a users stats')
        .addUserOption(userOption('User to display stats of').setRequired(false)),
    run: async (interaction, data) => {
        try {
            let user = interaction.options.getUser('user');
            if (!user) {
                user = interaction.user;
            }
            const dbUser = await getUserByUser(user, data);
            // const queueId = interaction.options.getString('queue', true)
            const queueId = "SND";
            // @ts-ignore
            if (queueId != "ALL") {
                const stats = await getStats(dbUser._id, queueId);
                await interaction.reply({ephemeral: false, embeds: [statsEmbed(stats, dbUser, user.username, await getRankNumber(dbUser._id, queueId), user.avatarURL()!)]});
            } else {
                await interaction.reply({ephemeral: true, content: 'getting stats for all is not currently supported'});
            }
        } catch (e) {
            await logError(e, interaction);
        }
    },
    name: 'stats',
    allowedChannels: [tokens.SNDChannel],
}