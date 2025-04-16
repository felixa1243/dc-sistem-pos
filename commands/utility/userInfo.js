import { SlashCommandBuilder } from "discord.js";
export const data = new SlashCommandBuilder()
    .setName('user')
    .setDescription('Display user info');
export async function execute(interaction) {
    interaction.reply(`Name : ${interaction.user.username}\nDate Joined: ${interaction.member.joinedAt}`)
}