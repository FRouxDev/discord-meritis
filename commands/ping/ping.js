import { SlashCommandBuilder } from 'discord.js';

const command = {
  data: new SlashCommandBuilder().setName('ping').setDescription('Une commande de ping'),
  async execute(interaction) {
    await interaction.reply('Pong !');
  },
};

export default command;
