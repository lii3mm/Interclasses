const apiUrl = 'http://localhost:8000/api/';

    // Função para carregar as categorias
    async function getModalidades() {
        try {
            const response = await fetch(apiUrl + 'modalidades/');
            const modalidades = await response.json();

            const tbody = document.getElementById('modalidades-table').getElementsByTagName('tbody')[0];
            tbody.innerHTML = ''; // Limpar antes de adicionar as novas modalidades

            modalidades.forEach(modalidade => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${modalidade.id}</td>0  
                `;
                tbody.appendChild(tr);
            });
        } catch (error) {
            console.error('Erro ao carregar modalidades:', error);
        }
    }

    // Função para criar nova modalidade
    async function criarModalidade(event) {
        event.preventDefault();

        const nome = document.getElementById('nome_modalidade').value;

        const fd = new FormData();
        fd.append('nome', nome);

        try {
            const response = await fetch(apiUrl + 'modalidades/', {
                method: 'POST',
                body: fd
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar modalidade');
            }

            const modalidadeCriada = await response.json();
            console.log('Modalidade criada com sucesso:', modalidadeCriada);

            // Atualizar a tabela com a nova modalidade
            const tbody = document.getElementById('modalidades-table').getElementsByTagName('tbody')[0];
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${modalidadeCriada.nome}</td>
            `;
            tbody.appendChild(tr);

            // Limpar o campo
            document.getElementById('nome_modalidade').value = '';
        } catch (error) {
            console.error('Erro ao criar modalidade:', error);
            alert('Ocorreu um erro ao criar a modalidade. Detalhes: ' + error.message);
        }
    }

    // Inicialização da página
    document.addEventListener('DOMContentLoaded', () => {
        getModalidades(); // Carregar modalidades existentes

        // Enviar formulário sem recarregar a página
        document.getElementById('submit-modalidade-btn').addEventListener('click', criarModalidade);
    });

const apiUrl = 'http://localhost:8000/api/';

        // Carregar modalidades
        async function getModalidades() {
            try {
                const response = await fetch(apiUrl + 'modalidades/');
                const modalidades = await response.json();

                const select = document.getElementById('modalidade_id');
                select.innerHTML = '<option value="">Selecione uma modalidade</option>';

                modalidades.forEach(modalidade => {
                    const option = document.createElement('option');
                    option.value = modalidade.id;
                    option.textContent = modalidade.nome;
                    select.appendChild(option);
                });
            } catch (error) {
                console.error('Erro ao carregar modalidades:', error);
                const select = document.getElementById('modalidade_id');
                select.innerHTML = '<option value="">Erro ao carregar modalidades</option>';
            }
        }

        // Buscar usuarios e atualizar a tabela
        async function getUsuarios() {
            try {
                const response = await fetch(apiUrl + 'usuarios/');
                const usuarios = await response.json();

                const tbody = document.getElementById('usuarios-table').getElementsByTagName('tbody')[0];
                tbody.innerHTML = ''; // Limpar antes de adicionar os novos usuarios

                usuarios.forEach(usuario => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${usuario.nome}</td>
                        <td>${usuario.turma}</td>
                        <td>R$ ${usuario.email}</td>
                        <td>${usuario.modalidade.id}</td>
                    `;
                    tbody.appendChild(tr);
                });
            } catch (error) {
                console.error('Erro ao carregar usuarios:', error);
            }
        }

        // Função para enviar os dados do usuario
        async function criarUsuario(event) {
            event.preventDefault();

            const nome = document.getElementById('nome').value;
            const turma = document.getElementById('turma').value;
            const email = document.getElementById('email').value;
            const modalidadeId = document.getElementById('modalidade_id').value;


            const fd = new FormData();
            fd.append('nome', nome);
            fd.append('turma', turma);
            fd.append('email', email);
            fd.append('modalidade_id', modalidadeId);

            try {
                const response = await fetch(apiUrl + 'usuarios/', {
                    method: 'POST',
                    body: fd
                });

                if (!response.ok) {
                    throw new Error('Erro ao cadastrar usuario');
                }

                const usuarioCriado = await response.json();
                console.log('Usuario criado com sucesso:', usuarioCriado);

                // Atualizar a tabela com o novo usuario
                const tbody = document.getElementById('usuarios-table').getElementsByTagName('tbody')[0];
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${usuarioCriado.nome}</td>
                    <td>${usuarioCriado.turma}</td>
                    <td>R$ ${usuarioCriado.email}</td>
                    <td>${usuarioCriado.categoria.id}</td>
                `;
                tbody.appendChild(tr);

                // Limpar os campos manualmente
                document.getElementById('nome').value = '';
                document.getElementById('turma').value = '';
                document.getElementById('email').value = '';
                document.getElementById('modalidade_id').value = '';
            } catch (error) {
                console.error('Erro ao criar usuario:', error);
                alert('Ocorreu um erro ao criar o usuario. Detalhes: ' + error.message);
            }
        }

        // Inicialização da página
        document.addEventListener('DOMContentLoaded', () => {
            getModalidades();
            getUsuarios();

            // Enviar formulário sem recarregar a página
            document.getElementById('submit-btn').addEventListener('click', criarUsuario);
        });


