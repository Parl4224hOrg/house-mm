import {Command} from "../../interfaces/Command";
import {SlashCommandBuilder} from "@discordjs/builders";
import {reason, userOption} from "../../utility/options";
import tokens from "../../tokens";
import {logError} from "../../loggers";
import {createActionUser} from "../../modules/constructors/createAction";
import {Actions} from "../../database/models/ActionModel";
import {getUserByUser} from "../../modules/getters/getUser";
import {updateUser} from "../../modules/updaters/updateUser";

export const reverseCooldown: Command = {
    data: new SlashCommandBuilder()
        .setName('reverse_cooldown')
        .setDescription('Reverses a cooldown given by a bot')
        .addUserOption(userOption('User to reverse cooldown of'))
        .addStringOption(reason),
    run: async (interaction, data) => {
        try {
            const dbUser = await getUserByUser(interaction.options.getUser('user', true), data);
            dbUser.banCounter--;
            dbUser.banUntil = 0;
            if (dbUser.banCounter < 0) {
                dbUser.banCounter = 0;
            }
            await updateUser(dbUser, data);
            await interaction.reply({ephemeral: false, content: `<@${dbUser.id}> cooldown reversed`});
            await createActionUser(Actions.ReverseCooldown, interaction.user.id, dbUser.id, interaction.options.getString('reason', true), 'Bot cooldown reversed');
        } catch (e) {
            await logError(e, interaction);
        }
    },
    name: 'reverse_cooldown',
    allowedRoles: [tokens.ModRole, tokens.AdminRole],
}