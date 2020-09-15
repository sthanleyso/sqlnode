const { Op } = require('sequelize');
const User = require('../models/User');

module.exports = {
  async show(req, res) {
    // Encontrar todos os usuários com email terminados com @gmail.com
    // Desses usuários, buscar todos que moram na "Rua João Batista de Castro Filho"
    // Desses usuários, buscar as tecnologias que começam com React

    const users = await User.findAll({
      attributes: ['name', 'email'],
      where: {
        email: {
          [Op.iLike]: '%@gmail.com',
        },
      },
      include: [
        {
          association: 'addresses',
          where: { street: 'Rua João Batista de Castro Filho' },
        }, // endereços
        {
          association: 'techs',
          required: false,
          where: {
            name: {
              [Op.iLike]: 'React%',
            },
          },
        }, // tecnologias
      ],
    });

    return res.json(users);
  },
};
