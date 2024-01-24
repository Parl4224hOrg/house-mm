import {Command} from "../../interfaces/Command";
import {SlashCommandBuilder} from "@discordjs/builders";
import {userOptional} from "../../utility/options";
import {logError} from "../../loggers";
import {getUserByUser} from "../../modules/getters/getUser";
import {getStats} from "../../modules/getters/getStats";

export const ratingChange: Command = {
    data: new SlashCommandBuilder()
        .setName('rating_change')
        .setDescription("View rating change for last game played")
        .addUserOption(userOptional("User to view rating change of")),
    run: async (interaction, data) => {
        try {
            let user = interaction.options.getUser('user');
            let self = false;
            if (!user) {
                self = true;
                user = interaction.user;
            }

            const dbUser = await getUserByUser(user, data);
            const stats = await getStats(dbUser._id, "SND");
            if (stats.gamesPlayed < 11) {
                await interaction.reply({ephemeral: true, content: "This user has not played enough games to use this feature yet"});
            } else {
                if (self) {
                    await interaction.reply({content: `Your rating changed by ${stats.ratingChange.toFixed(1)} last game`});
                } else {
                    await interaction.reply({content: `${user.username}'s rating changed by ${stats.ratingChange.toFixed(1)} last game`});
                }
            }
        } catch (e) {
            await logError(e, interaction);
        }
    },
    name: 'rating_change',
}