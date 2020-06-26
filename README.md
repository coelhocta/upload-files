# Django 3.0.7 & Angular 9.1.9 File Uploader

Instruções:

## Clonar o projeto

Para clonar o projeto execute o seguinte comando: `git clone https://github.com/coelhocta/upload-files.git`

## Criar um ambiente isolado para o projeto

Criar uma virtualenv: `virtualenv venv`
entrar na venv: `source venv/Scripts/activate`

## Iniciar o BackEnd

Entre na pasta backend e execute os seguintes comandos:

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

## Iniciar o FrontEnd

Abra um novo terminal:
verifique se está dentro da venv, se não estiver, digite: `source venv/Scripts/activate`
e digite os seguintes comandos:

```bash
cd frontend
npm install
npm start
```

## Para verificar se tudo funcionou

Abra o navegador e digite: `http://localhost:4200`

Faça um upload de arquivo e verifique se o arquivo está na pasta: `backend/media` do servidor.
