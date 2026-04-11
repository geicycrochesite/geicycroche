# 📚 DOCUMENTAÇÃO - ÍNDICE GERAL

Bem-vindo! Este é o guia central para toda a documentação do projeto **Artesanato E-commerce**.

---

## 🚀 Começar Aqui

**Novo no projeto?** Siga esta ordem:

1. **[README.md](README.md)** ← Leia primeiro
   - Visão geral do projeto
   - Tecnologias utilizadas
   - Como rodar localmente

2. **[SETUP_GUIDE.md](SETUP_GUIDE.md)** ← Próximo
   - Passo a passo de instalação
   - Solução de problemas comuns
   - Debug tips

3. **[API_REFERENCE.md](API_REFERENCE.md)** ← Depois
   - Endpoint reference
   - Exemplos com cURL
   - Fluxo típico

---

## 📖 Documentos Disponíveis

### 📌 Documentação Principal

| Documento | Para Quem | Conteúdo |
|-----------|----------|---------|
| [README.md](README.md) | Todos | Visão geral, tecnologias, como rodar, estrutura |
| [.env.example](.env.example) | Setup | Variáveis de ambiente necessárias |
| [SETUP_GUIDE.md](SETUP_GUIDE.md) | Novo dev | Passo a passo, troubleshooting, debug |
| [API_REFERENCE.md](API_REFERENCE.md) | Desenvolvedor | Endpoints, exemplos, fluxo |
| [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md) | Dev senior | Padrões, boas práticas, workflows |
| [SECURITY_GUIDE.md](SECURITY_GUIDE.md) | Dev/DevOps | Segurança, compliance LGPD, deploy |

---

## 🎯 Por Perfil

### 👤 Designer / Product

Leia:
- [README.md](README.md) - Para entender o produto
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Para rodar localmente

### 💻 Frontend Developer

Leia:
- [README.md](README.md)
- [SETUP_GUIDE.md](SETUP_GUIDE.md)
- [API_REFERENCE.md](API_REFERENCE.md) - Endpoints que vai usar
- [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md) - Padrões de código

### ⚙️ Backend Developer

Leia:
- [README.md](README.md)
- [SETUP_GUIDE.md](SETUP_GUIDE.md)
- [API_REFERENCE.md](API_REFERENCE.md)
- [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md)
- [SECURITY_GUIDE.md](SECURITY_GUIDE.md)

### 🔒 DevOps / Infra

Leia:
- [README.md](README.md) - Stack tecnológico
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Deploy section
- [SECURITY_GUIDE.md](SECURITY_GUIDE.md) - Security checklist
- [.env.example](.env.example) - Variáveis necessárias

### 📊 Project Manager

Leia:
- [README.md](README.md) - Para comunicar com stakeholders
- [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md) - Métricas, QA checklist

---

## 🔍 Tópicos por Documento

### README.md contém:
- ✅ Visão geral do projeto
- ✅ Tecnologias utilizadas
- ✅ Como rodar o projeto
- ✅ Estrutura de pastas
- ✅ Fluxo do sistema
- ✅ Variáveis de ambiente explicadas
- ✅ Boas práticas
- ✅ Problemas conhecidos e soluções

### SETUP_GUIDE.md contém:
- ✅ Checklist de setup
- ✅ Pré-requisitos
- ✅ Passo a passo de instalação
- ✅ Problemas comuns e soluções
- ✅ Debug tips com exemplos
- ✅ Como ver dados do banco
- ✅ Deploy em diferentes plataformas

### API_REFERENCE.md contém:
- ✅ Referência de todos os endpoints
- ✅ Request/response examples
- ✅ Códigos de erro
- ✅ Validações
- ✅ Exemplos com cURL
- ✅ Fluxo típico de uma compra
- ✅ Status de pagamento

### DEVELOPMENT_GUIDE.md contém:
- ✅ Padrões de código (React, TypeScript, API)
- ✅ Boas práticas
- ✅ Estrutura de testes
- ✅ Performance tips
- ✅ Git workflow
- ✅ Deploy checklist
- ✅ Debugging
- ✅ Links de recursos

### SECURITY_GUIDE.md contém:
- ✅ Avisos de segurança críticos
- ✅ CEP fixo (risco médio)
- ✅ Sem autenticação (risco alto)
- ✅ localStorage (risco baixo)
- ✅ Checklist de segurança
- ✅ Rate limiting
- ✅ LGPD compliance
- ✅ Headers recomendados
- ✅ Resposta a incidentes
- ✅ Exemplo de rota segura

---

## ❓ Perguntas Frequentes

### "Como faço X?"

Procure por **[README.md](README.md)** primeiro. Se não encontrar, vá para **[SETUP_GUIDE.md](SETUP_GUIDE.md)**.

### "Qual endpoint preciso chamar?"

Veja **[API_REFERENCE.md](API_REFERENCE.md)**.

### "Como codifico Y feature?"

Leia **[DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md)** para padrões. Então **[SECURITY_GUIDE.md](SECURITY_GUIDE.md)** para segurança.

### "Algo não está funcionando"

1. Vá para [SETUP_GUIDE.md](SETUP_GUIDE.md) > Problemas Comuns
2. Use os Debug Tips
3. Procure nos logs
4. Teste com cURL ([API_REFERENCE.md](API_REFERENCE.md))

### "Vou fazer deploy"

Siga checklist em [SECURITY_GUIDE.md](SECURITY_GUIDE.md) > Checklist de Deploy.

---

## 📞 Links Rápidos

**Configuração:**
- [Como configurar variáveis de ambiente](README.md#variáveis-de-ambiente)
- [Instalar pela primeira vez](SETUP_GUIDE.md#checklist-de-setup)

**Development:**
- [Padrões de código](DEVELOPMENT_GUIDE.md#padrões-de-código)
- [Estrutura de projeto](README.md#estrutura-de-pastas)

**APIs:**
- [Lista de endpoints](API_REFERENCE.md)
- [Exemplos com cURL](API_REFERENCE.md#exemplos-com-curl)

**Segurança:**
- [Checklist pré-deploy](SECURITY_GUIDE.md#checklist-de-deploy)
- [Avisos críticos](SECURITY_GUIDE.md#avisos-críticos)

---

## 🗂️ Estrutura de Arquivos Documentação

```
raiz/
├── README.md          ← COMECE AQUI
├── .env.example       ← Variáveis necessárias
├── SETUP_GUIDE.md     ← Instalação e troubleshooting
├── API_REFERENCE.md   ← Endpoints
├── DEVELOPMENT_GUIDE.md ← Padrões e boas práticas
├── SECURITY_GUIDE.md  ← Segurança e checklist deploy
├── DOCS_INDEX.md      ← Este arquivo
│
├── src/               ← Código da aplicação
├── prisma/            ← Banco de dados
├── public/            ← Assets estáticos
└── package.json       ← Dependências
```

---

## ✅ Checklist de Onboarding

Se você é novo no projeto:

- [ ] Ler [README.md](README.md) completamente
- [ ] Executar [SETUP_GUIDE.md](SETUP_GUIDE.md) passo a passo
- [ ] Conseguir rodar `npm run dev`
- [ ] Acessar http://localhost:3000 com sucesso
- [ ] Entender o fluxo em [README.md#fluxo-do-sistema](README.md#fluxo-do-sistema)
- [ ] Revisar [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md)
- [ ] Estar pronto para começar! 🎉

---

## 🎓 Recursos Externos

Principais tecnologias usadas:

- **Next.js:** https://nextjs.org/docs
- **React:** https://react.dev
- **TypeScript:** https://www.typescriptlang.org/docs
- **Prisma:** https://www.prisma.io/docs
- **TailwindCSS:** https://tailwindcss.com/docs
- **Mercado Pago API:** https://docs.mercadopago.com
- **Melhor Envio API:** https://www.melhorenvio.com.br/api

---

## 💬 Contribuindo com a Documentação

Encontrou algo errado ou faltando?

1. Corrija diretamente se souber
2. Abra uma issue descrevendo o problema
3. Faça um PR com melhorias

**Lembre-se:** Documentação boa = código melhor! 📝

---

## 📝 Histórico de Documentação

| Data | O que foi feito |
|------|-----------------|
| 2025-01-15 | Criação da documentação completa |
| - | - |

---

**Última atualização:** 15/01/2025

**Versão do README:** 1.0
**Versão do Setup:** 1.0
**Versão da API:** 1.0
**Versão de Dev:** 1.0
**Versão de Segurança:** 1.0

---

## 🎯 Próximos Passos

1. **Escolha seu caminho** baseado no seu perfil (veja "Por Perfil" acima)
2. **Leia os documentos na ordem recomendada**
3. **Setup o ambiente localmente**
4. **Faça seu primeiro PR!**

Boa sorte! `npm run dev` 🚀
