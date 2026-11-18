# Projeto 7º Semestre de Ciência da Computação 2025 — Paraíso Patinhas

Site institucional responsivo para apresentar a iniciativa de resgate, cuidado e adoção responsável de animais.

## Executar localmente

```powershell
py -m pip install -r requirements.txt
py app.py
```

Acesse `http://127.0.0.1:5000`.

## Publicação

O projeto usa `templates/` para páginas HTML e `static/` para CSS, JavaScript e imagens.

Este projeto usa Flask. O GitHub Pages não executa aplicações Flask, então o push para o GitHub não publica o site. Para disponibilizá-lo por uma URL pública, é necessário hospedá-lo em um serviço compatível com Python e Flask. Ainda não há uma URL de produção configurada neste repositório.

Para publicar no Render, envie este repositório ao GitHub e crie um novo Blueprint no Render conectado a ele. O arquivo `render.yaml` configura a instalação e a inicialização do app; após o deploy, o Render fornece a URL pública.

## Estrutura

```text
app.py                  Backend Flask
requirements.txt        Dependências Python
templates/index.html    Página HTML
static/css/style.css    Estilos
static/js/app.js        Interações e chatbot
static/img/             Imagens
```
