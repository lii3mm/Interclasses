const apiUrl = 'http://localhost:8000/api/';

// -------------------- MODALIDADES --------------------
async function getModalidades() {
    try {
        const response = await fetch(apiUrl + 'modalidades/');
        const modalidades = await response.json();

        const select = document.getElementById("modalidade");
        if (select) {
            // Mantém apenas o placeholder
            select.innerHTML = `<option value="" disabled selected hidden>Selecione uma modalidade</option>`;
            modalidades.forEach(mod => {
                const option = document.createElement('option');
                option.value = mod.id;
                option.textContent = mod.nome;
                select.appendChild(option);
            });
        }
    } catch (err) {
        console.error("Erro ao carregar modalidades:", err);
    }
}

// -------------------- FORMULÁRIO --------------------
async function enviarFormulario(e) {
    e.preventDefault();

    const nome = document.querySelector("nome").value.trim();
    const turma = document.getElementById("turma").value.trim();
    const telefone = document.querySelector("telefone").value.trim();
    const email = document.getElementById("email").value.trim();
    const modalidade_id = document.getElementById("modalidade").value;

    if (!nome || !turma || !telefone || !email || !modalidade_id) {
        alert("Preencha todos os campos obrigatórios!");
        return;
    }

    try {
        const response = await fetch(apiUrl + "usuarios/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                nome, 
                turma,
                telefone,
                email,
                modalidade_id 
            })
        });
        
        const data = await response.json();
        console.log("Resposta backend:", data);
        alert("Formulário enviado com sucesso!");
        document.querySelector("box-formulario").reset();
    } catch (err) {
        console.error(err);
        alert("Erro ao enviar formulário.");
    }
}

// -------------------- INICIALIZAÇÃO --------------------
document.addEventListener('DOMContentLoaded', () => {
    getModalidades();

    const form = document.querySelector("box-formulario");
    if (form) form.addEventListener("submit", enviarFormulario);
});
