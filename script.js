document.addEventListener('DOMContentLoaded', () => {
    const linksContainer = document.getElementById('links');
    const searchInput = document.getElementById('search');
    const modal = document.getElementById('tiktokModal');
    const closeModal = document.getElementById('closeModal');
    const categoryFilters = document.querySelectorAll('.category-filter');
    const sidebar = document.getElementById('sidebar');
    const hamburger = document.getElementById('hamburger');

    modal.style.display = 'flex';

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    hamburger.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    let livros = [];

    // Fetch books from JSON file
    fetch('/config/books.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            livros = data;
            renderLivros(livros); // Initial render after loading
        })
        .catch(error => {
            console.error('Error loading books.json:', error);
            // Fallback to empty list or alert user if needed
            livros = [];
            renderLivros(livros);
        });

    let currentCategory = 'all';

    function renderLivros(livros) {
        linksContainer.innerHTML = '';
        const categories = [...new Set(livros.map(livro => livro.category))];

        categories.forEach(category => {
            const categoryBooks = livros.filter(livro => livro.category === category);
            if (categoryBooks.length === 0) return;

            const categorySection = document.createElement('div');
            categorySection.className = 'mb-8';
            const categoryTitle = document.createElement('h2');
            categoryTitle.className = 'category-title';
            categoryTitle.textContent = category;
            categorySection.appendChild(categoryTitle);

            const booksContainer = document.createElement('div');
            booksContainer.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';
            categoryBooks.forEach(livro => {
                const linkElement = document.createElement('a');
                linkElement.href = livro.link;
                linkElement.target = '_blank';
                linkElement.className = 'card flex flex-col p-5 rounded-xl shadow-xl hover:bg-gray-700';
                linkElement.innerHTML = `
                    <img src="${livro.foto}" alt="${livro.nome}" class="w-full h-48 object-cover rounded-lg mb-4">
                    <div>
                        <h3 class="text-xl font-semibold text-gray-100">${livro.nome}</h3>
                        <p class="text-sm text-gray-400">${livro.descricao}</p>
                    </div>
                `;
                booksContainer.appendChild(linkElement);
            });

            categorySection.appendChild(booksContainer);
            linksContainer.appendChild(categorySection);
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

    function filterBooks() {
        const query = searchInput.value.toLowerCase();
        const filteredLivros = livros.filter(livro =>
            (livro.nome.toLowerCase().includes(query) ||
            livro.descricao.toLowerCase().includes(query) ||
            livro.category.toLowerCase().includes(query)) &&
            (currentCategory === 'all' || livro.category === currentCategory)
        );
        renderLivros(filteredLivros);
    }

    searchInput.addEventListener('input', filterBooks);

    categoryFilters.forEach(button => {
        button.addEventListener('click', () => {
            categoryFilters.forEach(btn => btn.classList.remove('bg-gray-700'));
            button.classList.add('bg-gray-700');
            currentCategory = button.dataset.category;
            filterBooks();
            sidebar.classList.remove('active'); // Close sidebar after selection
        });
    });
});