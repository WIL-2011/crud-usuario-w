const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})



function perguntar(texto, callback) {

    rl.question(texto, callback);
}

let usuarios = [];
let id = 1;

// 1) CADASTRAR USUÁRIO

function cadastrarUsuario() {

    console.log("\nCadastrar Usuário");


    perguntar("Nome: ", (nome) => {

        perguntar("cpf: ", (cpf) => {

            perguntar("Idade: ", (idadeStr) => {

                

                    nome = nome.trim();

                    cpf = cpf.trim();

                    const idade = Number(idadeStr);

                    

                    if (!nome || !cpf || Number.isNaN(idade)) {

                        console.log("ERRO: Dados inválidos!");

                        return menu();
                    }

                    usuarios.push({

                        id: id++,

                        nome,

                        cpf,

                        idade,

                        
                    });

                    console.log("Usuário cadastrado com sucesso!");

                    menu();

                });

            });

        });

    };



// 2) LISTAR USUÁRIOS
function listarUsuarios() {

    if (usuarios.length === 0) {

        console.log("Nenhum usuário cadastrado.");

        return menu();
    }

    console.log("\nLista de Usuários:");

    for (let u of usuarios) {
        console.log(
            "ID:", u.id,
            "| Nome:", u.nome,
            "| cpf:", u.cpf,
            "| Idade:", u.idade,
        );
    }
    menu();
}

// 3) BUSCAR USUÁRIO POR ID
function visualizarUsuario() {

    perguntar("\nDigite o ID: ", (idStr) => {

        const ID = Number(idStr);

        if (Number.isNaN(ID)) {

            console.log("ID inválido");

            return menu();
        }

        const pos = acharIndicePorId(ID);

        if (pos === -1) {

            console.log("Usuário não encontrado");


            return menu();
        }

        console.log(usuarios[pos]);

        menu();
    });
}

// 4) EDITAR USUÁRIO
function editarUsuario() {

    perguntar("\nDigite o ID: ", (idStr) => {

        const ID = Number(idStr);

        const pos = acharIndicePorId(ID);

        if (pos === -1) {

            console.log("Usuário não encontrado");

            return menu();
        }

        const usuario = usuarios[pos];

        perguntar(`Novo nome (${usuario.nome}): `, (n) => {

            perguntar(`Novo cpf (${usuario.cpf}): `, (e) => {

                perguntar(`Nova idade (${usuario.idade}): `, (i) => {

                    if (n.trim()) usuario.nome = n.trim();
                    if (e.trim()) usuario.cpf = e.trim();
                    if (i.trim() && !Number.isNaN(Number(i))) {
                        usuario.idade = Number(i);
                    }

                    console.log("Usuário atualizado!");
                    menu();
                });
            });
        });
    });
}

// 5) DELETAR USUÁRIO
function deletarUsuario() {

    perguntar("\nDigite o ID: ", (idStr) => {

        const ID = Number(idStr);

        const pos = acharIndicePorId(ID);

        if (pos === -1) {

            console.log("Usuário não encontrado");

            return menu();
        }

        usuarios.splice(pos, 1);

        console.log("Usuário deletado!");

        menu();
    });
}

function acharIndicePorId(ID) {
    return usuarios.findIndex(u => u.id === ID);
}

function mostrarMenu() {
    console.log("\n=====================");
    console.log("    CRUD USUÁRIOS    ");
    console.log("1) Cadastrar usuário");
    console.log("2) Listar usuários");
    console.log("3) Visualizar usuário (ID)");
    console.log("4) Editar usuário");
    console.log("5) Deletar usuário");
    console.log("0) Sair");
    console.log("=====================");
}

function menu() {
    mostrarMenu();

    perguntar("Escolha uma opção: ", (opcao) => {
        opcao = opcao.trim();

        switch (opcao) {
            case "1": return cadastrarUsuario();
            case "2": return listarUsuarios();
            case "3": return visualizarUsuario();
            case "4": return editarUsuario();
            case "5": return deletarUsuario();
            case "0":
                rl.close();
                break;
            default:
                console.log("Opção inválida!");
                menu();
        }
    });
}

menu();
