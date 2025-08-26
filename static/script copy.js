const apiUrl = 'http://localhost:8000/api/';

        // Função para carregar as categorias
        async function getCategorias() {
            try {
                const response = await fetch(apiUrl + 'categorias/');
                const categorias = await response.json();

                const tbody = document.getElementById('categorias-table').getElementsByTagName('tbody')[0];
                tbody.innerHTML = ''; // Limpar antes de adicionar as novas categorias

                categorias.forEach(categoria => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${categoria.nome}</td>
                    `;
                    tbody.appendChild(tr);
                });
            } catch (error) {
                console.error('Erro ao carregar categorias:', error);
            }
        }

        // Função para criar nova categoria
        async function criarCategoria(event) {
            event.preventDefault();

            const nome = document.getElementById('nome_categoria').value;

            const fd = new FormData();
            fd.append('nome', nome);

            try {
                const response = await fetch(apiUrl + 'categorias/', {
                    method: 'POST',
                    body: fd
                });

                if (!response.ok) {
                    throw new Error('Erro ao cadastrar categoria');
                }

                const categoriaCriada = await response.json();
                console.log('Categoria criada com sucesso:', categoriaCriada);

                // Atualizar a tabela com a nova categoria
                const tbody = document.getElementById('categorias-table').getElementsByTagName('tbody')[0];
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${categoriaCriada.nome}</td>
                `;
                tbody.appendChild(tr);

                // Limpar o campo
                document.getElementById('nome_categoria').value = '';
            } catch (error) {
                console.error('Erro ao criar categoria:', error);
                alert('Ocorreu um erro ao criar a categoria. Detalhes: ' + error.message);
            }
        }

        // Inicialização da página
        document.addEventListener('DOMContentLoaded', () => {
            getCategorias(); // Carregar categorias existentes

            // Enviar formulário sem recarregar a página
            document.getElementById('submit-categoria-btn').addEventListener('click', criarCategoria);
        });

        const apiUrl = 'http://localhost:8000/api/';

        // Carregar categorias
        async function getCategorias() {
            try {
                const response = await fetch(apiUrl + 'categorias/');
                const categorias = await response.json();

                const select = document.getElementById('categoria_id');
                select.innerHTML = '<option value="">Selecione uma categoria</option>';

                categorias.forEach(categoria => {
                    const option = document.createElement('option');
                    option.value = categoria.id;
                    option.textContent = categoria.nome;
                    select.appendChild(option);
                });
            } catch (error) {
                console.error('Erro ao carregar categorias:', error);
                const select = document.getElementById('categoria_id');
                select.innerHTML = '<option value="">Erro ao carregar categorias</option>';
            }
        }

        // Buscar produtos e atualizar a tabela
        async function getProdutos() {
            try {
                const response = await fetch(apiUrl + 'produtos/');
                const produtos = await response.json();

                const tbody = document.getElementById('produtos-table').getElementsByTagName('tbody')[0];
                tbody.innerHTML = ''; // Limpar antes de adicionar os novos produtos

                produtos.forEach(produto => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${produto.nome}</td>
                        <td>${produto.descricao}</td>
                        <td>R$ ${produto.preco}</td>
                        <td>${produto.categoria.nome}</td>
                        <td>${produto.imagem ? `<img src="${produto.imagem}" style="max-height:60px;">` : ''}</td>
                    `;
                    tbody.appendChild(tr);
                });
            } catch (error) {
                console.error('Erro ao carregar produtos:', error);
            }
        }

        // Função para enviar os dados do produto
        async function criarProduto(event) {
            event.preventDefault();

            const nome = document.getElementById('nome').value;
            const descricao = document.getElementById('descricao').value;
            const preco = document.getElementById('preco').value;
            const categoriaId = document.getElementById('categoria_id').value;
            const imagem = document.getElementById('imagem').files[0];

            const fd = new FormData();
            fd.append('nome', nome);
            fd.append('descricao', descricao);
            fd.append('preco', preco);
            fd.append('categoria_id', categoriaId);
            if (imagem) fd.append('imagem', imagem);

            try {
                const response = await fetch(apiUrl + 'produtos/', {
                    method: 'POST',
                    body: fd
                });

                if (!response.ok) {
                    throw new Error('Erro ao cadastrar produto');
                }

                const produtoCriado = await response.json();
                console.log('Produto criado com sucesso:', produtoCriado);

                // Atualizar a tabela com o novo produto
                const tbody = document.getElementById('produtos-table').getElementsByTagName('tbody')[0];
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${produtoCriado.nome}</td>
                    <td>${produtoCriado.descricao}</td>
                    <td>R$ ${produtoCriado.preco}</td>
                    <td>${produtoCriado.categoria.nome}</td>
                    <td>${produtoCriado.imagem ? `<img src="${produtoCriado.imagem}" style="max-height:60px;">` : ''}</td>
                `;
                tbody.appendChild(tr);

                // Limpar os campos manualmente
                document.getElementById('nome').value = '';
                document.getElementById('descricao').value = '';
                document.getElementById('preco').value = '';
                document.getElementById('categoria_id').value = '';
                document.getElementById('imagem').value = '';  // Limpar o campo de imagem
                document.getElementById('file-name').textContent = 'Nenhum arquivo selecionado'; // Limpar o nome do arquivo
            } catch (error) {
                console.error('Erro ao criar produto:', error);
                alert('Ocorreu um erro ao criar o produto. Detalhes: ' + error.message);
            }
        }

        // Inicialização da página
        document.addEventListener('DOMContentLoaded', () => {
            getCategorias();
            getProdutos();

            // Enviar formulário sem recarregar a página
            document.getElementById('submit-btn').addEventListener('click', criarProduto);
        });