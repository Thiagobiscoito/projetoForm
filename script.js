//pegar endpoit do mocjiapi
const url = 'https://67f33a4bec56ec1a36d53015.mockapi.io/api/v1/usuarios';


//PEGAR OS DADOS DO FORMULARIO E INSERIR COM O POST
let formData = document.getElementById('formData');

formData.addEventListener("submit", (event) => {
    event.preventDefault()

    let nome = document.getElementById('nome').value;
    let email = document.getElementById('email').value;

    //transformar os dados em objeto    
    const data = {
        nome: nome,
        email: email
    };

    let forValido = true;

    if (nome.trim() == "") {
        document.querySelector('#campoObrigatorio').style.display = 'inline';
        forValido = false;
        return
    } else {
        document.querySelector('#campoObrigatorio').style.display = 'none';
    }

    if (forValido) {
        fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data)
        })

            .then(response => {
                if (!response.ok) {
                    throw 'Requisição chegou no servidor, mas servidor retornou com erro' + response.statusText;
                }
                return response.json();
            })

            .then(data => {
                console.log('Usuário cadastrado com sucesso: ', data);
                let tagMensagens = document.querySelector("#mensagens");
                tagMensagens.textContent = "";
                tagMensagens.style.display = "none";
                event.target.reset();
            })

            .catch(error => {
                console.error(error);
                let tagMensagens = document.querySelector("#mensagens");
                tagMensagens.textContent = 'Ocorreu um erro no cadastro', + error;
                tagMensagens.style.display = "inline";
            })
    }
});