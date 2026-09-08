# Carlão com Giz na Mão

Aplicativo de conversa com foco no ensino de Matemática para alunos. Esta primeira versão entrega a interface completa e usa respostas locais de demonstração. A integração com inteligência artificial será adicionada na próxima etapa.

## O que já funciona

- interface responsiva para celular e computador;
- sugestões de assuntos de Matemática;
- envio de perguntas pelo botão ou pela tecla Enter;
- respostas demonstrativas para porcentagem, frações, equação e geometria;
- menu lateral e início de nova conversa;
- estrutura preparada para implantação na Vercel.

## Rodar no computador

```bash
npm install
npm run dev
```

Depois, abra `http://localhost:3000`.

## Publicar na Vercel

Importe este repositório na Vercel. O framework Next.js será reconhecido automaticamente; não é necessário alterar os comandos de instalação ou compilação.

## Próxima etapa

Na integração com IA, a função `getDemoAnswer` em `components/ChatApp.js` será substituída por uma chamada a uma rota segura do servidor. A chave da API nunca deve ser colocada diretamente no código do navegador.
