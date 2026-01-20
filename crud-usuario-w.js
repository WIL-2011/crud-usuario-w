const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

function mostraMenu() {
    console.log("\n=====================");
    console.log("    CRUD USUARIOS  ");
    console.log("1) cadastrar usuario");
    console.log("2) Listar usuario");
    console.log("3) visualizar usuario (por ID");
    console.log("4) Editar usuario");
    console.log("5) Deletar usuario");
    console.log("0) Sair");
    console.log("=======================");
}


function menu() {
    mostrarMenu();

    perguntar("Escolha uma opção:",(opção) => {
        opcao = opcao.trim();

        switch (opcao) {
        case "1": return cadastrarUsuario();
        case "2": return ListarUsuario();
        case "3": return visualizarUsuario();
        case "4": return EditarUsuario();
        case "5": return deletarUsuario();
        
        }
    })
}