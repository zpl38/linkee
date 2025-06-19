document.addEventListener('DOMContentLoaded', () => {
    const linksContainer = document.getElementById('links');
    const searchInput = document.getElementById('search');
    const modal = document.getElementById('tiktokModal');
    const closeModal = document.getElementById('closeModal');
    const categoryFilters = document.querySelectorAll('.category-filter');
    const sidebar = document.getElementById('sidebar');
    const hamburger = document.getElementById('hamburger');
    const body = document.body;

    // Show modal initially
    modal.style.display = 'flex';

    // Close modal on click of 'x'
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal on click outside of modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        hamburger.classList.toggle('active'); // Toggle 'active' class on hamburger for X animation
    });

    // Close sidebar if clicking outside of it, but not on hamburger
    window.addEventListener('click', (event) => {
        // Check if sidebar is active and click is outside sidebar and hamburger
        if (sidebar.classList.contains('active') && !sidebar.contains(event.target) && !hamburger.contains(event.target)) {
            sidebar.classList.remove('active');
            hamburger.classList.remove('active'); // Revert hamburger icon
        }
    });

    // Enhanced star effect on mouse move using CSS custom properties
    body.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const moveX = (mouseX - centerX) * 0.05; // Adjust sensitivity for X
        const moveY = (mouseY - centerY) * 0.05; // Adjust sensitivity for Y

        // Set CSS custom properties
        body.style.setProperty('--star-offset-x', `${moveX}px`);
        body.style.setProperty('--star-offset-y', `${moveY}px`);
    });

    let livros = [];

    // Fetch books from JSON file
    fetch('config/books.json')
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

    function renderLivros(livrosToRender) {
        linksContainer.innerHTML = ''; 


        const categories = [...new Set(livrosToRender.map(livro => livro.category))].sort();

        if (currentCategory === 'all' && categories.length > 0) {
            const allBooksSection = document.createElement('div');
            allBooksSection.className = 'mb-8';
            const allBooksTitle = document.createElement('h2');
            allBooksTitle.className = 'category-title';
            allBooksTitle.textContent = 'Todas as Categorias';
            allBooksSection.appendChild(allBooksTitle);

            const allBooksContainer = document.createElement('div');
            allBooksContainer.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';
            livrosToRender.forEach(livro => {
                const linkElement = createBookCard(livro);
                allBooksContainer.appendChild(linkElement);
            });
            allBooksSection.appendChild(allBooksContainer);
            linksContainer.appendChild(allBooksSection);
        } else {
            categories.forEach(category => {
                const categoryBooks = livrosToRender.filter(livro => livro.category === category);
                if (categoryBooks.length === 0 && currentCategory !== category) return;

                const categorySection = document.createElement('div');
                categorySection.className = 'mb-8';
                const categoryTitle = document.createElement('h2');
                categoryTitle.className = 'category-title';
                categoryTitle.textContent = category;
                categorySection.appendChild(categoryTitle);

                const booksContainer = document.createElement('div');
                booksContainer.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';
                categoryBooks.forEach(livro => {
                    const linkElement = createBookCard(livro);
                    booksContainer.appendChild(linkElement);
                });

                categorySection.appendChild(booksContainer);
                linksContainer.appendChild(categorySection);
            });
        }


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

    function createBookCard(livro) {
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
        return linkElement;
    }

    function filterBooks() {
        const query = searchInput.value.toLowerCase();
        let filteredLivros = livros.filter(livro =>
            livro.nome.toLowerCase().includes(query) ||
            livro.descricao.toLowerCase().includes(query) ||
            livro.category.toLowerCase().includes(query)
        );

        if (currentCategory !== 'all') {
            filteredLivros = filteredLivros.filter(livro => livro.category === currentCategory);
        }
        renderLivros(filteredLivros);
    }

    searchInput.addEventListener('input', filterBooks);

    categoryFilters.forEach(button => {
        button.addEventListener('click', () => {
            categoryFilters.forEach(btn => btn.classList.remove('bg-gray-700'));
            button.classList.add('bg-gray-700');

            currentCategory = button.dataset.category;
            filterBooks();
            sidebar.classList.remove('active');
            hamburger.classList.remove('active'); 
        });
    });
    document.querySelector('.category-filter[data-category="all"]').classList.add('bg-gray-700');
});
