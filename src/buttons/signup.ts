import {Button} from "../interfaces/Button";
import {ButtonBuilder} from "@discordjs/builders";
import {ButtonStyle} from "discord.js";
import {logError} from "../loggers";
import {register} from "../modals/register";
import tokens from "../tokens";

export const signup: Button = {
    data: new ButtonBuilder()
        .setLabel('Sign Up')
        .setCustomId('sign-up')
        .setStyle(ButtonStyle.Success),
    run: async (interaction) => {
        try {
            const member = await interaction.guild!.members.fetch(interaction.user);
            await member.roles.add(tokens.Player);
            await interaction.reply({
                ephemeral: true,
                content: `Go to <#${tokens.RegionSelect}> to select a region (required)\nGo to <#${tokens.SNDReadyChannel}> to ready up or use \`/ready 5v5\`\nTo change your registered id use \`/register\` or the button above`,
            });
        } catch (e) {
            await logError(e, interaction);
        }
    },
    id: 'sign-up',
}