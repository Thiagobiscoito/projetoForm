//pegar endpoit do mocjiapi
const url = 'https://67f33a4bec56ec1a36d53015.mockapi.io/api/v1/usuarios';


//CHAMAR A FUNÇÃO
carregarUsuarios()

//FUNÇÃO PARA CARREGAR USUÁRIOS
function carregarUsuarios() {
    //PEGAR OS DADOS DA API COM O GET
    fetch(`${url}`)
        .then(response => {
            if (!response.ok) {
                throw 'Requisição chegou no servidor, mas servidor retornou com erro' + response.statusText;
            }
            return response.json();
        })

        .then(Usuarios => {
            console.log(Usuarios)

            //PEGANDO O ID DA TABELA
            let tagTabelaUsuarios = document.querySelector('#tabelaUsuarios');
            tagTabelaUsuarios.innerHTML = "" //LIMPANDO A TABELA PARA NÃO MOSTAR DADOS DUPLICADOS
            Usuarios.forEach(Usuario => {
                //CRIANDO OS ELEMENTOS DA LINH DA TABELA
                let tagTr = document.createElement('tr');

                //CRIANDO OS DADOS DA COLUNA NOME
                let tagTdNome = document.createElement('td');
                tagTdNome.textContent = Usuario.nome; //INSERINDO O DADO NA COLUNA

                //CRIANDO OS DADOS DA COLUNA EMAIL
                let tagTdEmail = document.createElement('td');
                tagTdEmail.textContent = Usuario.email; //INSERINDO O DADO NA COLUNA

                //CRIANDO A COLUNA DE BOTOES
                let tagTdOpcoes = document.createElement('td');

                //CRIAND OS BOTOES
                let tagButtonEditar = document.createElement('button');
                let tagImgEditar = document.createElement('img');
                tagImgEditar.src = 'img/editar.png';
                tagImgEditar.alt = 'editareditar';
                tagButtonEditar.appendChild(tagImgEditar); //ADICIONANDO IMG NO BOTAO

                let tagButtonExcluir = document.createElement('button');
                let tagImgExcluir = document.createElement('img');
                tagImgExcluir.src = 'img/excluir.png';
                tagImgExcluir.alt = 'excluir';
                tagButtonExcluir.appendChild(tagImgExcluir); //ADICIONANDO IMG NO BOTAO

                tagTdOpcoes.appendChild(tagButtonEditar); //ADICIONANDO O BOTAO NA COLUNA
                tagTdOpcoes.appendChild(tagButtonExcluir); //ADICIONANDO O BOTAO NA COLUNA

                //AQUI ADICIONAMOS AS COLUNAS AS LINHAS DA TABELA.
                tagTr.appendChild(tagTdNome); //ADICIONA AS COLUNAS
                tagTr.appendChild(tagTdEmail); //ADICIONA AS COLUNAS
                tagTr.appendChild(tagTdOpcoes); //ADICIONA AS COLUNAS

                tagTabelaUsuarios.appendChild(tagTr); //ADICIONA A LINHA
            });
        })

        .catch(error => {
            console.log(error)
        })
}

//PEGAR OS DADOS DO FORMULARIO E INSERIR COM O POST
let formData = document.getElementById('formData');

formData.addEventListener("submit", (event) => {
    event.preventDefault()

    let nome = document.getElementById('nome').value;
    let email = document.getElementById('email').value;

    //transformar os dados em objeto    
    const Usuario = {
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
            body: JSON.stringify(Usuario)
        })

            .then(response => {
                if (!response.ok) {
                    throw 'Requisição chegou no servidor, mas servidor retornou com erro' + response.statusText;
                }
                return response.json();
            })

            .then(Usuario => {
                console.log('Usuário cadastrado com sucesso: ', Usuario);
                let tagMensagenDeErro = document.querySelector("#mensagensDeErro");
                tagMensagenDeErro.textContent = "";
                tagMensagenDeErro.style.display = "none";
                event.target.reset()//LIMPA O FORMULARIO
                carregarUsuarios()//SE DER CERTO CARREGUE OS USUARIOS
            })

            .catch(error => {
                console.error(error);
                let tagMensagenDeErro = document.querySelector("#mensagensDeErro");
                tagMensagenDeErro.textContent = 'Ocorreu um erro no cadastro', + error;
                tagMensagenDeErro.style.display = "inline";
            })
    }
});