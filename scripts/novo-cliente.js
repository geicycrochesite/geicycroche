const crypto = require('crypto')

function gerarSlug(nome) {
  return nome
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '')
}

function gerarSecret() {
  return crypto.randomBytes(32).toString('hex')
}

function gerarEnv({ nome, dominio }) {
  const storeId = gerarSlug(nome)

  return `
DATABASE_URL="COLOCAR_DATABASE_AQUI"
JWT_SECRET="${gerarSecret()}"
ASAAS_API_KEY="COLOCAR_ASAAS_KEY_AQUI"
NEXT_PUBLIC_SITE_URL="https://${dominio}"
NEXT_PUBLIC_STORE_ID="${storeId}"
SETUP_ADMIN_KEY="${gerarSecret()}"
`.trim()
}

// ===== INPUT =====
const nome = process.argv[2]
const dominio = process.argv[3]

if (!nome || !dominio) {
  console.log('\n❌ Uso:')
  console.log('node scripts/novo-cliente.js "Nome da Loja" dominio.com\n')
  process.exit(1)
}

const storeId = gerarSlug(nome)
const env = gerarEnv({ nome, dominio })

console.log('\n🚀 CLIENTE GERADO:\n')

console.log('📛 Nome:', nome)
console.log('🆔 STORE_ID:', storeId)
console.log('🌐 Domínio:', dominio)

console.log('\n📦 Nome do projeto:')
console.log(`${storeId}-store`)

console.log('\n🔐 .env:')
console.log('-------------------------')
console.log(env)
console.log('-------------------------')

console.log('\n✅ Próximos passos:')
console.log('1. Criar banco')
console.log('2. Criar conta Asaas')
console.log('3. Colar .env')
console.log('4. Deploy na Vercel\n')

// node scripts/novo-cliente.js "Nome da Loja" dominio.com