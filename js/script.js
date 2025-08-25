document.addEventListener("DOMContentLoaded", () => {
    fetchUsuarios();
});

function fetchUsuarios(){
    fetch("http://localhost:8000/api/usuarios/")
    .then(res => res.json())
    .then(data => renderUsuarios(data))
    .catch(err => console.error("Erro ao buscar Usuarios", err));
}

function renderUsuarios(usuarios){

    const container = document.getElementById("usuarios-container");
    container.innerHTML = "";

    produtos.forEach(usuario => {
        const card = document.createElement("div");
        card.className = "usuar";
        card.innerHTML = `
            <h2>${usuario.nome}</h2>
            <p>${usuario.turma}</p>
            <p>${usuario.telefone}</p>
            <p>${usuario.email}</p>
            <p><strong> Modalidade: </strong> ${usuario.modalidade.nome}</p>
        `;
        container.appendChild(card);
    });
    
}