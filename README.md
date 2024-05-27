# GeoStatDashboard

O GeoStatDashboard é um sistema que coleta e apresenta dados dos estados e municípios do Brasil por meio de gráficos e tabelas. Além disso, oferece uma API para o consumo externo desses dados, possibilitando a integração com outros sistemas de forma eficiente e simplificada.


### Requisitos

Certifique-se de ter os seguintes requisitos instalados para que o projeto possa ser instalado corretamente.

Intalação com o apt-get:

- python3
- pip
- postgresql

Instalação com o pip:

- virtualenv


### Instalação

Criando um ambiente virtual.

`> virtualenv venv`

Acessando o ambiente virtual.

`> source venv/bin/activate`

Instalando o requirements.txt.

`> pip install -r requirements.txt`


### Configurando dotenv

Na raiz do projeto crie um arquivo .env

`> gedit .env`

Observações:(configurações padão do .env estão dentro do aquivo .env.exemple).


### Configurando DB Postgres

Dentro do .env configure as informações do banco de dados.


### Realizando migração padrão

Crie as tabelas no banco.

`> python3 manage.py migrate`


### Coletando dados 

Este projeto utiliza dados do IBGE que são coletados em um dataframe como o seguite comando:

`> python3 manage.py get_dateframe_counties`

Observações:(O script que contem a aplicação esta em api/management/commands).


### Populando o banco de dados

Com o dataframe gerado vamos popular o banco de dados.

`> python3 manage.py load_dataframe_counties`

### Rodando o projeto

Agora basta rodar a Aplicação.

`> python3 manage.py runserver`


## Usabilidade

O GeoStatDashboard fornece um interface de usuário com: cadastro, login, e logout.

Cadastre um usuário e senha para ter acesso a platafoma.

Observações:( Esse mesmo usuário e senha serão usados para consumir a API de forma Externa).


### Dashboard

A Dashboard fornece:

- Gráfico que contém o número de municípios de cada estado do Brasil.

- filtragem por região (Norte, Nordeste, Centro-Oeste, Sudeste e Sul).

- Tipo de grafico (Barra, Linha, Rosquinha, Área polar, Radar).

- Gráfico interativo que ao clicar em um estado abre uma tabela contendo todos os municipios deste estado.


### API

Para utilizar a API é necessario um token de acesso.


##### API Get Token

`/api/token/`

parametros necessario:

```
method: 'POST'

headers: {Content-Type: 'application/json'}

body: {'username: 'userName', password: 'password'}
```

resposta:

```
{
    "refresh": "eyJhbGciOiJIUzI1N...",
    "access": "eyJhbGciOiJIUzI1Ni..."
}
```


##### API Refresh Token

`/api/token/refresh/`

parametros necessario:

```removing spaces and cleaning up the code a little more
method: 'POST'

headers: {Content-Type: 'application/json'}

body: {refresh: 'refreshToken'}
```

resposta:

```
{
    "access": "eyJhbGciOiJIUzI1Ni..."
}
```


##### API States

`/api/states/`


parametros necessario:

```
method: 'GET'

headers: {
    Content-Type: 'application/json', '
    Authorization': `Bearer ${accessToken}`
}
```

resposta:

```
[
    {
        "id": 29,
        "name": "Acre",
        "region": "Norte",
        "uf": "AC",
        "county_count": 22
    },
    ...
]
```

##### API Counties

`/api/counties/?uf=${uf}&page=${page}&page_size=${pageSize}`


parametros necessario:

```
method: 'GET'

headers: {
    Content-Type: 'application/json', '
    Authorization': `Bearer ${accessToken}`
}
```

resposta:

```
{
    "count": 645,
    "next": "http://127.0.0.1:8000/api/counties/?page=2&page_size=2&uf=SP",
    "previous": null,
    "results": [
        {
            "name": "Adamantina"
        },
        {
            "name": "Adolfo"
        }
    ],
    "total_pages": 323,
    "current_page": 1
}
```
