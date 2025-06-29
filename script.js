// Get elements
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
const categoryBtns = document.querySelectorAll('.category-btn');
const bookGrid = document.getElementById('book-grid');
const searchInput = document.querySelector('.search-input');
const sortBySelect = document.querySelector('select');
const footerCategoryLinks = document.querySelectorAll('footer a[data-category]');

let books = []; // Will store book data loaded from JSON

// --- Dark mode toggle ---
darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('darkMode', 'enabled');
    } else {
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('darkMode', 'disabled');
    }
    // Reapply category button styles after dark mode toggle
    updateCategoryButtonStyles();
});

// Check for saved dark mode preference on page load
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Function to update category button styles based on dark mode and active state
function updateCategoryButtonStyles() {
    categoryBtns.forEach(b => {
        if (!b.classList.contains('active')) {
            if (!body.classList.contains('dark-mode')) {
                b.classList.add('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300');
                b.classList.remove('bg-blue-500', 'text-white', 'bg-blue-100', 'text-blue-700', 'bg-gray-700', 'hover:bg-gray-600');
            } else {
                b.classList.add('bg-gray-700', 'text-gray-200', 'hover:bg-gray-600');
                b.classList.remove('bg-blue-100', 'text-blue-700', 'bg-gray-200', 'text-gray-700', 'hover:bg-gray-300', 'bg-blue-500', 'text-white');
            }
        } else {
            // Active button styles
            if (!body.classList.contains('dark-mode')) {
                b.classList.add('bg-blue-100', 'text-blue-700');
                b.classList.remove('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300', 'bg-blue-500', 'text-white', 'bg-gray-700', 'hover:bg-gray-600');
            } else {
                b.classList.add('bg-blue-500', 'text-white'); // Stronger blue for dark mode active
                b.classList.remove('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300', 'bg-blue-100', 'text-blue-700', 'bg-gray-700', 'hover:bg-gray-600');
            }
        }
    });
}

// --- Filter and Search functionality ---
let currentCategory = 'Todos';
let currentSearchTerm = '';
let currentSortOrder = 'Mais recentes';

async function loadBooks() {
    try {
        const response = await fetch('config/books.json');
        // Verifica se a resposta HTTP foi bem-sucedida (status 200-299)
        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }
        books = await response.json(); // Tenta parsear o JSON
        filterAndSortBooks();
    } catch (error) {
        console.error('Erro ao carregar os livros:', error); // Mostrará o erro detalhado aqui
        bookGrid.innerHTML = '<p class="text-red-500 text-center col-span-full">Não foi possível carregar os livros. Tente novamente mais tarde.</p>';
    }
}

function renderBooks(booksToShow) {
    bookGrid.innerHTML = booksToShow.map(book => `
        <a href="${book.link}" target="_blank" class="book-card block bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 relative hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div class="h-48 overflow-hidden">
                <img src="${book.foto}"
                     alt="${book.nome}" class="w-full h-full object-cover transition-transform duration-300 hover:scale-105">
            </div>
            <div class="p-4">
                <h3 class="text-lg font-semibold text-gray-800 mb-2 transition-colors duration-300">${book.nome}</h3>
                <p class="text-gray-600 text-sm mb-4 transition-colors duration-300">${book.descricao.substring(0, 70)}...</p>
            </div>

            <div class="book-overlay">
                <p class="text-white text-sm mb-4">${book.descricao}</p>
                <div class="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors duration-300">
                    Baixar Livro <i class="fas fa-download ml-1"></i>
                </div>
            </div>
        </a>
    `).join('');
}

function filterAndSortBooks() {
    let filteredBooks = books;

    // Filter by category
    if (currentCategory !== 'Todos') {
        filteredBooks = filteredBooks.filter(book => book.category === currentCategory);
    }

    // Filter by search term
    if (currentSearchTerm) {
        const lowerCaseSearchTerm = currentSearchTerm.toLowerCase();
        filteredBooks = filteredBooks.filter(book =>
            book.nome.toLowerCase().includes(lowerCaseSearchTerm) ||
            book.descricao.toLowerCase().includes(lowerCaseSearchTerm) ||
            book.category.toLowerCase().includes(lowerCaseSearchTerm)
        );
    }

    // Sort books
    filteredBooks.sort((a, b) => {
        if (currentSortOrder === 'A-Z') {
            return a.nome.localeCompare(b.nome);
        } else if (currentSortOrder === 'Z-A') {
            return b.nome.localeCompare(a.nome);
        } else if (currentSortOrder === 'Mais recentes') {
            // Supondo que você pode ter uma data de adição no futuro
            // Por enquanto, manterá a ordem original se não houver data
            return 0;
        }
        // Adicionar outras lógicas de ordenação aqui se necessário (ex: 'Mais populares')
        return 0; // Default no change
    });

    renderBooks(filteredBooks);
}


// Event Listeners for top category buttons
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        updateCategoryButtonStyles(); // Reapply styles to ensure correct active/inactive appearance

        currentCategory = btn.textContent.trim();
        filterAndSortBooks();
    });
});

// Event listener for search input
searchInput.addEventListener('input', () => {
    currentSearchTerm = searchInput.value;
    filterAndSortBooks();
});

// Event listener for sort by select
sortBySelect.addEventListener('change', (e) => {
    currentSortOrder = e.target.value;
    filterAndSortBooks();
});

// Event listeners for footer category links
footerCategoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default link behavior
        const categoryToFilter = link.dataset.category;

        // Simulate click on the corresponding header category button
        categoryBtns.forEach(btn => {
            if (btn.textContent.trim() === categoryToFilter) {
                btn.click(); // Trigger the click event on the header button
                btn.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Scroll to the category buttons
            } else if (btn.textContent.trim() === "Todos" && categoryToFilter === "Todos") {
                 btn.click(); // Handle "Todos" if needed, though footer has specific categories
            }
        });
    });
});

// Initial load of books and rendering
loadBooks();
updateCategoryButtonStyles(); // Initial style application for category buttons
