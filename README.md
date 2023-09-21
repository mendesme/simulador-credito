<h1>Simulador de Crédito</h1>

## Descrição

API responsável por simulação de empréstimo.

---

## Demonstração

Demonstração em:

https://simulador-credito.onrender.com/api/simulacao

https://github.com/mendesme/simulador-credito

---

## Exemplo de Uso

Chamada à API por método **POST** com o seguinte modelo de objeto JSON:

```
Exemplo:

https://simulador-credito.onrender.com/api/simulacao
```
```json
{
    "valorDesejado": 900.00,
    "prazo": 5
}
```
**OU**

Chamada à API por método **GET** com o seguinte modelo de query string:

```
https://simulador-credito.onrender.com/api/simulacao?valorDesejado=900&prazo=5
```

---

## Tecnologias Utilizadas

- NodeJS (v18)
- Typescript

---
## Instruções de Uso

### Instalar Dependências
```bash
npm install
```

### Iniciar o Servidor em Ambiente de Desenvolvimento -
```bash
npm run dev

http://localhost:3000/api/simulacao
```

### Build para Produção
```bash
npm run build
```

### Iniciar o Servidor em Ambiente de Produção
```bash
npm run start
```

---
