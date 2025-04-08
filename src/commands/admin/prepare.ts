import {Command} from "../../interfaces/Command";
import {SlashCommandBuilder} from "@discordjs/builders";
import tokens from "../../tokens";
import {logError} from "../../loggers";
import {TextChannel} from "discord.js";
import {
    MapTestSignupView,
    regionSelectView,
    signUpView,
    sndFILLReadyView,
    SNDFILLReadyView2,
    SNDFILLReadyView3
} from "../../views/staticViews";

export const prepare: Command = {
    data: new SlashCommandBuilder()
        .setName('prepare')
        .setDescription('prepares static views')
        .addStringOption(option => option
            .setName('view')
            .setDescription('view to prepare')
            .setRequired(true)
            .addChoices(
                {name: 'SND Ready', value: 'snd_ready'},
                {name: "Sign Up", value: "signup"},
                {name: "Info", value: "info"},
                {name: "cleanup", value: "c"},
                {name: 'Clear', value: 'c2'},
                {name: "Region", value: 'region'},
                {name: "Map Test", value: "map"},
            )
        ),
    run: async (interaction) => {
        try {
            await interaction.deferReply({ephemeral: true});
            const view = interaction.options.getString('view')!
            if (interaction.channel!.isSendable()) {
                switch (view) {
                    case 'snd_ready': {
                        await interaction.channel!.send({
                            components: [sndFILLReadyView(), SNDFILLReadyView2(), SNDFILLReadyView3()],
                            content: 'Ready up for SND'
                        });
                        await interaction.followUp({ephemeral: true, content: 'prepared snd _ready up view'})
                    }
                        break;
                    case 'signup': {
                        await interaction.channel!.send({components: [signUpView()], content: tokens.SignUpMessage})
                        await interaction.followUp({ephemeral: true, content: 'prepared sign up view'})
                    }
                        break;
                    case 'info': {
                        await interaction.channel!.send({content: tokens.InfoMessage})
                        await interaction.followUp({ephemeral: true, content: 'prepared info view'})
                    }
                        break;
                    case 'c': {
                        const roles = await interaction.guild!.roles.fetch();
                        for (let role of roles.values()) {
                            if (role.name.includes('team') || role.name.includes('match')) {
                                await role.delete();
                            }
                        }
                        await interaction.followUp({ephemeral: true, content: "done"});
                    }
                        break;
                    case 'c2': {
                        const channel = interaction.channel as TextChannel;
                        await channel.bulkDelete(100, true);
                        await interaction.followUp({ephemeral: true, content: "done"})
                    }
                        break;
                    case 'region': {
                        await interaction.channel!.send({
                            components: [regionSelectView()],
                            content: tokens.RegionSelectMessage
                        });
                        await interaction.followUp({ephemeral: true, content: 'prepared region select view'})
                    }
                        break;
                    case 'map': {
                        await interaction.channel!.send({
                            components: [MapTestSignupView()],
                            content: "Use this button to toggle whether or not to be notified about map tests"
                        });
                        await interaction.followUp({ephemeral: true, content: 'prepared map testing view'});
                    }
                        break;
                    default:
                        break;
                }
            }
        } catch (e) {
            await logError(e, interaction)
        }
    },
    name: 'prepare',
    allowedRoles: [tokens.LeadModRole],
}
