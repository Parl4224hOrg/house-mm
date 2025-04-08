import {Modal} from "../interfaces/Modal";
import {
    ActionRowBuilder,
    ModalActionRowComponentBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle
} from "discord.js";
import {logError} from "../loggers";
import {getUserByUser} from "../modules/getters/getUser";
import {updateUser} from "../modules/updaters/updateUser";
export const reRegister: Modal = {
    data: new ModalBuilder()
        .setTitle("Register")
        .setCustomId("re-register-form")
        .setComponents([
            new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
                new TextInputBuilder()
                    .setCustomId('id')
                    .setLabel("SteamId64")
                    .setPlaceholder('76561197960287930')
                    .setMinLength(1)
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true)
            )
        ]),
    run: async (interaction, data) => {
        try {
            const name = interaction.fields.getTextInputValue('id');
            const dbUser = await getUserByUser(interaction.user, data);
            dbUser.steamId = name;
            await updateUser(dbUser, data);
            await interaction.reply({
                ephemeral: true,
                content: "You have updated your registered id",
            });
        } catch (e) {
            await logError(e, interaction);
        }
    },
    id: "re-register-form",
}