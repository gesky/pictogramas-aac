# Pictogramas AAC

Gerador de frases com pictogramas ARASAAC para comunicação aumentativa e alternativa (CAA).

## O que faz

- Digite uma frase em português
- Cada palavra é automaticamente associada ao pictograma ARASAAC correspondente
- Pictogramas aparecem visualmente acima de cada palavra
- Salve o resultado como imagem PNG para usar em materiais terapêuticos

## Como publicar no GitHub Pages

### 1. Crie o repositório

1. Acesse [github.com](https://github.com) e faça login
2. Clique em **New repository**
3. Nome sugerido: `pictogramas-aac`
4. Deixe como **Public**
5. Clique em **Create repository**

### 2. Suba os arquivos

Opção A — pelo site do GitHub:
1. Abra o repositório criado
2. Clique em **Add file → Upload files**
3. Arraste todos os arquivos desta pasta
4. Clique em **Commit changes**

Opção B — pelo terminal (Git):
```bash
cd pictogramas-aac
git init
git add .
git commit -m "primeiro commit"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/pictogramas-aac.git
git push -u origin main
```

### 3. Ative o GitHub Pages

1. No repositório, clique em **Settings**
2. No menu lateral, clique em **Pages**
3. Em **Source**, selecione **Deploy from a branch**
4. Em **Branch**, selecione **main** e pasta **/ (root)**
5. Clique em **Save**
6. Aguarde 1–2 minutos e acesse: `https://SEU_USUARIO.github.io/pictogramas-aac`

## Estrutura dos arquivos

```
pictogramas-aac/
├── index.html      # Página principal
├── style.css       # Estilos
├── app.js          # Lógica do app
├── dic.js          # Dicionário PT-BR → IDs ARASAAC
├── manifest.json   # Configuração PWA
└── README.md       # Este arquivo
```

## Créditos

Pictogramas de **Sergio Palao** para [ARASAAC](https://arasaac.org) (Centro Aragonés para la Comunicación Aumentativa y Alternativa), Governo de Aragão, Espanha.  
Licença: [CC BY-NC-SA](https://creativecommons.org/licenses/by-nc-sa/4.0/)
