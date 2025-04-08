import {ChannelType, VoiceState} from "discord.js";
import {logWarn} from "../loggers";
import {Data} from "../data";
import tokens from "../tokens";

export const onVoiceUpdate = async (oldState: VoiceState, newState: VoiceState, data: Data) => {
    try {
        if (newState.channel == null) {
            return;
        }
        const isStage = newState.channel.type == ChannelType.GuildStageVoice;
        const invite = data.getSpeakerStatus(newState.channelId!, newState.member!.id);
        if ((isStage && newState.requestToSpeakTimestamp == null)) {
            if (invite.canSpeak && newState.suppress) {
                await newState.setSuppressed(false);
            }
        }
        let isMod = false;
        for (let role of newState.member!.roles.cache) {
            if (tokens.Mods.includes(role[0])) {
                isMod = true;
                break;
            }
        }
        if (!invite.canJoin && !isMod) {
            await newState.disconnect("Joined opposing team's stage")
        }
    } catch (e) {
        await logWarn("voiceUpdateError", oldState.client);
    }
}