import { SlashCommandBuilder, time } from 'discord.js';
import { dataSource } from '../../config/db.js';

export const data = new SlashCommandBuilder()
    .setName('register')
    .setDescription('Registration for membership');

export async function execute(interaction) {
    const response = await interaction.reply({
        content: 'By reacting with ✅ to this message, you agree to the terms and policy!',
        withResponse: true
    });
    const { message } = response.resource;

    try {

        await message.react('✅');
        const filter = (reaction, user) => ['✅'].includes(reaction.emoji.name) && user.id === interaction.user.id;
        const collected = await message.awaitReactions(({ filter, max: 1, time: 15_000, errors: ['time'] }));
        const reaction = collected.first();
        if (reaction) {
            // Find the role
            const role = interaction.guild.roles.cache.find(
                r => r.name.toLowerCase() === 'customer'
            );

            if (!role) {
                return interaction.followUp({
                    content: "⚠️ Couldn't find a role named `Customer`.",
                    ephemeral: true,
                });
            }

            // Add role to the user
            const member = await interaction.guild.members.fetch(interaction.user.id);
            await member.roles.add(role);

            // Save to database
            const memberRepository = dataSource.getRepository('Member');

            // Prevent duplicate entries
            const existing = await memberRepository.findOneBy({
                discordId: interaction.user.id,
            });
            if (!existing) {
                const newMember = memberRepository.create({
                    discordId: interaction.user.id,
                    name: interaction.user.username,
                });
                await memberRepository.save(newMember);

            }
            return interaction.followUp({
                content: existing ? 'You are already a member!' : `✅ Welcome, ${interaction.user.username}! You are now a registered customer.`,
                ephemeral: true
            });
        }


    } catch (error) {
        console.error('Reaction error:', error.message);
        return interaction.followUp({
            content: '⏰ You did not react in time. Please try again.',
            ephemeral: true,
        });
    }
}
