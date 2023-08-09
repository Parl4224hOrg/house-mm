import {Interaction} from "discord.js";
import {Command} from "../interfaces/Command";
import {Button} from "../interfaces/Button";
import {StringSelectMenu} from "../interfaces/SelectMenu";

export const commandPermission = async (interaction: Interaction, command: Command | Button | StringSelectMenu) => {
    let valid = false;
    let limited = false;
    if (command.limiter) {
        if (command.limiter.take(interaction.user.id)) {
            limited = true;
        }
    }
    if (command.allowedUsers && !limited) {
        if (command.allowedUsers.includes(interaction.user.id)) {
            valid = true;
        }
    } else if (command.allowedRoles && !limited) {
        const member = await interaction.guild!.members.fetch(interaction.user.id);
        for (let role of command.allowedRoles) {
            if (member!.roles.cache.has(role)) {
                valid = true;
                break;
            }
        }
    } else if (command.allowedChannels && !limited) {
        if (command.allowedChannels.includes(interaction.channelId!)) {
            valid = true;
        }
    } else {
        valid = true;
    }
    return {valid: valid, limited: limited};
}