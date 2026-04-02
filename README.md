# Landing Page (Pronta para GitHub)

Projeto de landing page estatica em HTML, CSS e JavaScript.

## Estrutura

```
.
├─ index.html
├─ assets/
│  ├─ css/
│  │  └─ styles.css
│  └─ js/
│     ├─ config.js
│     └─ script.js
└─ reference/
   └─ original-scrape/
```

## Como editar rapido

Arquivo principal para personalizacao:

- `assets/js/config.js`

Campos mais importantes:

- `brandName`
- `brandLogo` (logo local: `./assets/media/logo.png`)
- `heroTitle`
- `weeklyPrice`, `monthlyPrice`, `yearlyPrice`
- `links.weekly`, `links.monthly`, `links.yearly`, `links.support`
- `videoUrl`
- `videoPoster` (opcional, para video local)
- `galleryImages`

## Trocar logo da marca

1. Exporte sua logo sem fundo em PNG.
2. Salve como `assets/media/logo.png`.
3. Atualize a pagina (`Ctrl + F5`).

## Usar video do seu computador

1. Coloque o arquivo em `assets/media/` (exemplo: `assets/media/meu-video.mp4`).
2. Edite `assets/js/config.js`:

```js
videoUrl: "./assets/media/meu-video.mp4",
videoPoster: "./assets/media/capa-video.jpg"
```

Se quiser voltar para Vimeo/YouTube, basta colocar uma URL de embed novamente em `videoUrl`.

## Rodar localmente

Opcao 1:

- Abrir o `index.html` no navegador.

Opcao 2 (recomendado):

- Usar extensao Live Server no VS Code.

## Subir para o GitHub

1. Crie um repositorio no GitHub.
2. No terminal da pasta do projeto:

```bash
git init
git add .
git commit -m "feat: landing page organizada"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_REPO.git
git push -u origin main
```

## Publicar no GitHub Pages

1. No repositorio, abra `Settings > Pages`.
2. Em `Build and deployment`, selecione:
   - `Source`: `Deploy from a branch`
   - `Branch`: `main` e pasta `/ (root)`
3. Salve e aguarde o link publico.

## Observacao sobre `reference/original-scrape`

Essa pasta guarda os arquivos de referencia usados na analise da pagina original.
Se quiser um repo mais limpo, voce pode remover essa pasta antes do `git push`.
