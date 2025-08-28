const bcrypt = require('bcrypt');

async function gerarSenhaHash(senhaPura) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(senhaPura, saltRounds);
  console.log('O hash da sua senha é:');
  console.log(hash);
}

gerarSenhaHash('senhateste123'); 