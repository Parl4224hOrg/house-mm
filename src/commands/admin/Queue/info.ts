import {SubCommand} from "../../../interfaces/Command";
import {SlashCommandSubcommandBuilder} from "discord.js";
import {logError} from "../../../loggers";
import {queueInfoEmbeds} from "../../../embeds/queueEmbed";
import {queues} from "../../../utility/options";

export const info: SubCommand = {
    data: new SlashCommandSubcommandBuilder()
        .setName('info')
        .setDescription('returns info about a queue')
        .addStringOption(queues),
    run: async (interaction, data) => {
        try {
            await interaction.deferReply({ephemeral: true});
            const response = await data.getQueueInfo(interaction.options.getString('queue', true));
            await interaction.followUp({ephemeral: true, content: response.message, embeds: queueInfoEmbeds(response.data)})
        } catch (e) {
            await logError(e, interaction)
        }
    },
    name: 'info'
}