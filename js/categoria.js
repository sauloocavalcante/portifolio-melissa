const params = new URLSearchParams(window.location.search);
const categoria = params.get('categoria');

fetch('data/conteudos.json')
    .then(response => response.json())
    .then(conteudos => {

        const itens = conteudos
            .filter(item => item.categoria === categoria)
            .sort((a, b) => new Date(b.data) - new Date(a.data));

        document.getElementById('titulo-categoria').textContent =
            nomeCategoria(categoria);

        const lista = document.getElementById('lista-conteudos');

        itens.forEach(item => {

            const card = document.createElement('article');

            card.className = 'conteudo-card';

            card.innerHTML = `
                <img src="${item.imagem}" alt="${item.titulo}" id="foto-conteudo">

                <div class="conteudo-info">

                    <span class="categoria-tag">
                        ${categoria.replace('-', ' ')}
                    </span>

                    <div class="texto">
                        <h3>${item.titulo}</h3>
                    </div>

                    <span class="data">
                        ${formatarData(item.data)}
                    </span>

                    <p>
                        ${item.resumo || ''}
                    </p>

                    <a href="${criarLink(item)}" class="card-link">
                        Ler conteúdo completo →
                    </a>

                </div>
            `;

            lista.appendChild(card);
        });
    });


function nomeCategoria(categoria) {

    const nomes = {
        'materias': 'Matérias',
        'reportagens': 'Reportagens',
        'artigos-opiniao': 'Artigos de opinião',
        'resenhas': 'Resenhas',
        'cronicas': 'Crônicas'
    };

    return nomes[categoria] || 'Conteúdos';
}


function formatarData(data) {

    return new Date(data + 'T00:00:00')
        .toLocaleDateString('pt-BR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
}


function criarLink(item) {

    if (item.tipo === 'externo') {
        return item.link;
    }

    return `conteudo.html?id=${item.id}`;
}