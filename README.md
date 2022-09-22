# One Piece API

[PT_BR]

## Clonando o projeto
```
  git clone https://github.com/YrllanBrandao/onepiece_api.git

```
### PORTA PADRÃO
```
  8080
```
## Instalando dependências
```
  npm install

```

## inciando o projeto

```
  node app.js
```

## Rotas para Akuma no mis
#### busca todas as akuma no mis
### Request

`GET /devilfruits`



### Response
```
    Thu, 22 Sep 2022 02:35:01 GMT
    Status: 200 OK
    Connection: keep-alive
    Content-Type: application/json
    Content-Length: 861

    {
        "id": 6,
        "picture": "gomugomu-no-mi.png",
        "japaneseName": "ゴムゴムの実\nヒトヒトの実 モデル“ニカ",
        "portugueseName": "gomugomu-no-mi",
        "englishName": "gomugomu-no-mi",
        "meaning": "Borracha\nHumano",
        "currentUser": "Monkey D. Luffy",
        "type": "Paramecia | Zoan mítica",
        "resume": "A Gomu Gomu no Mi, conhecida originalmente como a Hito Hito no Mi, Modelo)",
        "createdAt": "2022-09-22T01:41:31.000Z",
        "updatedAt": "2022-09-22T01:41:31.000Z"
    }
```
### busque por uma akuma no mi específica por nome ou por parte do nome
` essa consulta utiliza o operador LIKE`


### Request

`GET /devilfruit/NOME`



### Response
```
    Thu, 22 Sep 2022 02:35:01 GMT
    Status: 200 OK
    Connection: keep-alive
    Content-Type: application/json
    Content-Length: 861

    {
        "id": 6,
        "picture": "gomugomu-no-mi.png",
        "japaneseName": "ゴムゴムの実\nヒトヒトの実 モデル“ニカ",
        "portugueseName": "gomugomu-no-mi",
        "englishName": "gomugomu-no-mi",
        "meaning": "Borracha\nHumano",
        "currentUser": "Monkey D. Luffy",
        "type": "Paramecia | Zoan mítica",
        "resume": "A Gomu Gomu no Mi, conhecida originalmente como a Hito Hito no Mi, Modelo)",
        "createdAt": "2022-09-22T01:41:31.000Z",
        "updatedAt": "2022-09-22T01:41:31.000Z"
    }
```


