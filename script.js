document.addEventListener('DOMContentLoaded', () => {
    const linksContainer = document.getElementById('links');
    const searchInput = document.getElementById('search');
    const modal = document.getElementById('tiktokModal');
    const closeModal = document.getElementById('closeModal');

    modal.style.display = 'flex';

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    const livros = [
        {
            nome: "48 Leis Do Poder",
            link: "https://fir3.net/Z5H4x",
            foto: "https://trechos.org/wp-content/uploads/2021/09/Livro-As-48-Leis-do-Poder-por-Robert-Greene.jpg",
            descricao: "Um guia estratégico sobre poder, manipulação e influência, baseado em lições históricas e filosóficas. Robert Greene apresenta 48 leis práticas para navegar por dinâmicas sociais e alcançar o sucesso em ambientes competitivos, com exemplos de figuras históricas."
        },
        {
            nome: "Mais Esperto Que o Diabo",
            link: "https://fir3.net/E0c5L",
            foto: "https://livraria.funep.org.br/wp-content/uploads/2021/12/MAIS-ESPERTO-QUE-O-DIABO_THIAGONIGRO_SELO2021.png",
            descricao: "Escrito por Napoleon Hill, este livro revela, por meio de uma alegórica conversa com o 'Diabo', os segredos por trás do fracasso e do sucesso. Explora armadilhas mentais que limitam o potencial humano e oferece insights para superá-las e alcançar objetivos."
        }
    ];

    renderLivros(livros);

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const filteredLivros = livros.filter(livro =>
            livro.nome.toLowerCase().includes(query) ||
            livro.descricao.toLowerCase().includes(query)
        );
        renderLivros(filteredLivros);
    });

    function renderLivros(livros) {
        linksContainer.innerHTML = '';
        livros.forEach(livro => {
            const linkElement = document.createElement('a');
            linkElement.href = livro.link;
            linkElement.target = '_blank';
            linkElement.className = 'card flex items-center p-5 rounded-xl shadow-xl hover:bg-purple-700';
            linkElement.innerHTML = `
                <img src="${livro.foto}" alt="${livro.nome}" class="w-20 h-20 object-cover rounded-lg mr-5">
                <div>
                    <h2 class="text-2xl font-semibold text-purple-100">${livro.nome}</h2>
                    <p class="text-sm text-gray-300">${livro.descricao}</p>
                </div>
            `;
            linksContainer.appendChild(linkElement);
        });

        const cards = document.querySelectorAll('.card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        cards.forEach(card => observer.observe(card));
    }
});
