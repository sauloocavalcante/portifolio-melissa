fetch('data/conteudos.json')
    .then(response => response.json())
    .then(conteudos => {

        const categorias = [
            'reportagens',
            'materias',
            'artigos-opiniao',
            'resenhas',
            'cronicas'
        ];

        categorias.forEach(categoria => {

            const container = document.getElementById(categoria);

            if (!container) return;

            const itens = conteudos
                .filter(item => item.categoria === categoria)
                .sort((a, b) => new Date(b.data) - new Date(a.data))
                .slice(0, 3);

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

                container.appendChild(card);
            });
        });
    });


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