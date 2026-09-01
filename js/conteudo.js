const params = new URLSearchParams(window.location.search);
const id = params.get('id');

fetch('data/conteudos.json')
    .then(response => response.json())
    .then(conteudos => {

        const item = conteudos.find(conteudo => conteudo.id === id);

        if (!item) {
            document.getElementById('conteudo').innerHTML =
                '<h1>Conteúdo não encontrado.</h1>';

            return;
        }

        document.getElementById('conteudo-titulo').textContent =
            item.titulo;

        document.getElementById('conteudo-data').textContent =
            formatarData(item.data);

        document.getElementById('conteudo-imagem').src =
            item.imagem;


        if (item.tipo === 'interno') {

            fetch(item.link)
                .then(response => response.text())
                .then(markdown => {

                    document.getElementById('conteudo-texto').innerHTML =
                        marked.parse(markdown.replace(/&#x20;/g, ' '));

                });

        }

    });


function formatarData(data) {

    return new Date(data + 'T00:00:00')
        .toLocaleDateString('pt-BR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
}