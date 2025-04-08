import {Command} from "../interfaces/Command";
import {SlashCommandBuilder} from "@discordjs/builders";
import {SlashCommandStringOption} from "discord.js";
import {logError} from "../loggers";
import {getUserByUser} from "../modules/getters/getUser";
import {updateUser} from "../modules/updaters/updateUser";
import tokens from "../tokens";

export const register: Command = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription("Register a steam id 64")
        .addStringOption(new SlashCommandStringOption()
            .setName('id')
            .setDescription("Id to register")
            .setRequired(true)),
    run: async (interaction, data) => {
        try {
            const dbUser = await getUserByUser(interaction.user, data);
            let registered = true;
            if (dbUser.steamId == null) {
                registered = false;
            }
            dbUser.steamId = interaction.options.getString('id', true);
            await updateUser(dbUser, data);
            if (!registered) {
                const member = await interaction.guild!.members.fetch(interaction.user);
                await member.roles.add(tokens.Player);
                await interaction.reply({
                    ephemeral: true,
                    content: `You have registered please go to <#${tokens.RegionSelect}> to select your region`
                });
            } else {
                await interaction.reply({ephemeral: true, content: "You have updated your registered id"})
            }
        } catch (e) {
            await logError(e, interaction);
        }
    },
    name: 'register',
}