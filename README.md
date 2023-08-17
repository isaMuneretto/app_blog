# app_blog
Desenvolvimento de uma API RESTful(se comunica com um servidor para acessar  manipular os dados, através dos métodos CRUD) e integração com o banco de dados MySQL.

**Documentação da API de Blog**

----------

### **Introdução**

Esta API permite a gestão de usuários e posts para um sistema de blog simples.

----------

### **Base URL**

```
http://localhost:8081/
```

----------

### **Endpoints**

#### **Usuários**

1.  **Criar um usuário**

-   **URL:**  `/usuario`
-   **Método:**  `POST`
-   **Body:**

```json
{
    "nome": "Blog da Alura",
    "email": "https://www.alura.com"
}

```

-   **Resposta de Sucesso:**

```json
{
    "id": 1,
    "nome": "Blog da Alura",
    "email": "https://www.alura.com.br",
    "data_criacao": "2023-08-14 20:57:08",
    "data_atualizacao": "2023-08-14 20:57:08"
}

```

2.  **Listar todos os usuários**

-   **URL:**  `/usuario`
    
-   **Método:**  `GET`
    
-   **Resposta de Sucesso:**
    

```json
[
    {
        "id": 1,
	    "nome": "Blog da Alura",
	    "email": "https://www.alura.com.br",
	    "data_criacao": "2023-08-14 20:57:08",
	    "data_atualizacao": "2023-08-14 20:57:08"
    },
    ...
]

```

3.  **Obter um usuário pelo ID**

-   **URL:**  `/usuario/:id`
    
-   **Método:**  `GET`
    
-   **Resposta de Sucesso:**
    

```json
{
	    "id": 1,
	    "nome": "Blog da Alura",
	    "email": "https://www.alura.com.br",
	    "data_criacao": "2023-08-14 20:57:08",
	    "data_atualizacao": "2023-08-14 20:57:08"
}

```
3.  **Alterar um parâmetro do usuário pelo ID**

-   **URL:**  `/usuario/:id`
    
-   **Método:**  `PUT`
-   **Body:**
```json
{
	"email": "https://www.alura.com"
}
```

-   **Resposta de Sucesso:**
    
```json
{
		"message":  "Usuário atualizado com sucesso."
}
```

3.  **Deletar um post pelo ID**

-   **URL:**  `/usuario/:id`
    
-   **Método:**  `DELETE`
    
-   **Resposta de Sucesso:**
    

```json
{
		"message": "Usuário deletado com sucesso."
}
```

#### **Posts**

1.  **Criar um post**

-   **URL:**  `/post`
-   **Método:**  `POST`
-   **Body:**

```json
{
    "titulo": "Linux: o que é esse sistema operacional, como instalar e um guia para iniciar",
    "conteudo": "O Linux é uma tecnologia que se refere ao kernel...",
    "autor_id": 1
}

```

-   **Resposta de Sucesso:**

```json
{
    "id": 1,
    "titulo": "Linux: o que é esse sistema operacional, como instalar e um guia para iniciar",
    "conteudo": "O Linux é uma tecnologia que se refere ao kernel...",
    "autor_id": 1,
    "data_publicacao": "2023-08-14 21:03:29",
    "data_atualizacao": "2023-08-14 21:03:29"
}

```

2.  **Listar todos os posts**

-   **URL:**  `/post`
    
-   **Método:**  `GET`
    
-   **Resposta de Sucesso:**
    

```json
[
    {
        "id": 1,
	    "titulo": "Linux: o que é esse sistema operacional, como instalar e um guia para iniciar",
	    "conteudo": "O Linux é uma tecnologia que se refere ao kernel...",
	    "autor_id": 1,
	    "data_publicacao": "2023-08-14 21:03:29",
	    "data_atualizacao": "2023-08-14 21:03:29"
    },
    ...
]

```

3.  **Obter um post pelo ID**

-   **URL:**  `/post/:id`
    
-   **Método:**  `GET`
- 
-   **Resposta de Sucesso:**
    

```json
{
    "id": 1,
   	"titulo": "Linux: o que é esse sistema operacional, como instalar e um guia para iniciar",
	"conteudo": "O Linux é uma tecnologia que se refere ao kernel...",
	"autor_id": 1,
	"data_publicacao": "2023-08-14 21:03:29",
	"data_atualizacao": "2023-08-14 21:03:29"
}

```

3.  **Alterar um parâmetro do post pelo ID**

-   **URL:**  `/post/:id`
    
-   **Método:**  `PUT`
-   **Body:**

```json
{
	"conteudo": "O Linux é uma tecnologia que se refere ao kernel."
}
```

-   **Resposta de Sucesso:**
    

```json
{
	"message": "Post atualizado com sucesso."
}
```
3.  **Deletar um usuário pelo ID**

-   **URL:**  `post/:id`
    
-   **Método:**  `DELETE`
    
-   **Resposta de Sucesso:**
    

```json
{
	"message": "Post deletado com sucesso."
}
```

----------

Esse é um exemplo simplificado de documentação de API. Em ambientes de produção, ferramentas como Swagger ou Postman podem ser utilizadas para criar e gerenciar documentações mais robustas, interativas e detalhadas.
