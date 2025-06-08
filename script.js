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
            "nome": "A Arte da Guerra",
            "link": "https://fir3.net/DFPC4LM",
            "foto": "https://www.lpm.com.br/livros/Imagens/arte_dauerra_nova_capa_9788525426642_9788525427960_g.jpg",
            "descricao": "Clássico atemporal de Sun Tzu, este livro apresenta estratégias de guerra que transcendem o campo de batalha, oferecendo lições valiosas sobre liderança, planejamento e tomada de decisão em situações de conflito e competição."
        },
        {
            "nome": "A Guerra da Arte",
            "link": "https://fir3.net/CUMqIo",
            "foto": "https://m.media-amazon.com/images/I/31sSNDPAlXL._SY342_.jpg",
            "descricao": "Escrito por Steven Pressfield, este livro explora a batalha interna contra a resistência criativa, oferecendo insights inspiradores para artistas, escritores e qualquer pessoa que busque superar bloqueios e alcançar seus objetivos criativos."
        },
        {
            "nome": "A Arte da Sedução",
            "link": "https://fir3.net/C4UmGFvG1",
            "foto": "https://m.media-amazon.com/images/I/61rQikkGR9L._SL1000_.jpg",
            "descricao": "Robert Greene analisa a dinâmica da sedução, combinando história, psicologia e estratégias para conquistar influência e poder interpessoal, com exemplos de figuras históricas e táticas práticas."
        },
        {
            "nome": "As Armas da Persuasão",
            "link": "https://fir3.net/LOj3",
            "foto": "https://m.media-amazon.com/images/I/71mWm5Oq7cL._SL1500_.jpg",
            "descricao": "Robert B. Cialdini revela os seis princípios fundamentais da persuasão, explicando como influenciam decisões e comportamentos, com exemplos práticos para aplicar em negociações e interações sociais."
        },
        {
            "nome": "Poder e Estratégia",
            "link": "https://fir3.net/YdGT",
            "foto": "https://m.media-amazon.com/images/I/81oTb8+aMvL._SL1500_.jpg",
            "descricao": "Uma coletânea de Robert Greene que reúne estratégias de poder e manipulação, baseadas em lições históricas e filosóficas, para navegar com sucesso em ambientes competitivos e alcançar influência."
        },
        {
            "nome": "Como Convencer Alguém em 90 Segundos",
            "link": "https://fir3.net/OojVz2z0KP",
            "foto": "https://m.media-amazon.com/images/I/81n0U7HAfVL._SL1500_.jpg",
            "descricao": "Nicholas Boothman ensina técnicas de comunicação rápida para criar conexões instantâneas, usando linguagem corporal, empatia e estratégias verbais para persuadir em poucos segundos."
        },
        {
            "nome": "Como Fazer Amigos e Influenciar Pessoas",
            "link": "https://fir3.net/Y9g1Dz4B",
            "foto": "https://m.media-amazon.com/images/I/71x-i7sKSvL._SL1500_.jpg",
            "descricao": "Clássico de Dale Carnegie, este livro oferece conselhos práticos sobre como construir relacionamentos, melhorar a comunicação e influenciar pessoas de forma autêntica e ética."
        },
        {
            "nome": "Inteligência Emocional",
            "link": "https://fir3.net/sPhkgpbCD",
            "foto": "https://m.media-amazon.com/images/I/71f9R8hY23L._SL1500_.jpg",
            "descricao": "Daniel Goleman explora o conceito de inteligência emocional, destacando como a gestão das emoções pode impactar o sucesso pessoal e profissional, com base em estudos psicológicos."
        },
        {
            "nome": "Manual de Persuasão do FBI",
            "link": "https://fir3.net/ZE9A",
            "foto": "https://m.media-amazon.com/images/I/715Y9D5zNWL._SL1500_.jpg",
            "descricao": "Escrito por Jack Schafer, ex-agente do FBI, este livro revela técnicas de persuasão usadas por profissionais de inteligência, com estratégias para construir confiança e influenciar pessoas."
        },
        {
            "nome": "Mindset: A Nova Psicologia do Sucesso",
            "link": "https://fir3.net/iiInqZ5Pq",
            "foto": "https://m.media-amazon.com/images/I/71Ils+Co9fL._SL1500_.jpg",
            "descricao": "Carol Dweck apresenta a diferença entre mentalidades fixa e de crescimento, mostrando como adotar uma mentalidade de aprendizado pode levar ao sucesso em diversas áreas da vida."
        },
        {
            "nome": "O Poder do Hábito",
            "link": "https://fir3.net/8nZ16Zg",
            "foto": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn1GcSNHDT2uWU1P7YJSLHxigN7r90EiTUjUfjIBCYzmjOF_18SPcfqQsGmcIq0vVUsYuxiJ-GsuUum2mgYjBFzaLsbFmuZZXuvxlsVNVOO-n5xet0N_aUVHMqtfA",
            "descricao": "Charles Duhigg explora a ciência por trás dos hábitos, explicando como eles são formados e como podem ser transformados para melhorar a produtividade, saúde e bem-estar."
        },
        {
            "nome": "48 Leis Do Poder",
            "link": "https://fir3.net/Z5H4x",
            "foto": "https://trechos.org/wp-content/uploads/2021/09/Livro-As-48-Leis-do-Poder-por-Robert-Greene.jpg",
            "descricao": "Um guia estratégico sobre poder, manipulação e influência, baseado em lições históricas e filosóficas. Robert Greene apresenta 48 leis práticas para navegar por dinâmicas sociais e alcançar o sucesso em ambientes competitivos, com exemplos de figuras históricas."
        },
        {
            "nome": "Mais Esperto Que o Diabo",
            "link": "https://fir3.net/E0c5L",
            "foto": "https://livraria.funep.org.br/wp-content/uploads/2021/12/MAIS-ESPERTO-QUE-O-DIABO_THIAGONIGRO_SELO2021.png",
            "descricao": "Escrito por Napoleon Hill, este livro revela, por meio de uma alegórica conversa com o 'Diabo', os segredos por trás do fracasso e do sucesso. Explora armadilhas mentais que limitam o potencial humano e oferece insights para superá-las e alcançar objetivos."
        },
        {
            "nome": "A Sutil Arte de Ligar o F*da-se",
            "link": "https://fir3.net/9OFnd8M9i",
            "foto": "https://m.media-amazon.com/images/I/71JvDx3cX+L._SL1500_.jpg",
            "descricao": "Escrito por Mark Manson, este livro oferece uma abordagem direta e prática para viver uma vida mais significativa, ensinando como priorizar o que realmente importa e desapegar-se de pressões desnecessárias."
        },
        {
            "nome": "Aldaraia Sive Soyga Vocor",
            "link": "https://seulink.net/YWfF",
            "foto": "https://m.media-amazon.com/images/I/41cTcxg74qL._SL1500_.jpg",
            "descricao": "Um tratado de magia do século XVI, associado a John Dee, este livro é conhecido por seus textos enigmáticos e tabelas misteriosas, supostamente revelado por anjos e decifrável apenas pelo arcanjo Miguel. É um marco na história do ocultismo e da alquimia renascentista."
        },
        {
            "nome": "Mein Kampf - Adolf Hitler",
            "link": "https://seulink.net/LF41",
            "foto": "https://m.media-amazon.com/images/I/51qMEOY8eBL._SL1500_.jpg",
            "descricao": "Escrito por Adolf Hitler, este livro combina autobiografia e ideologia política, expondo as ideias nacional-socialistas que influenciaram o regime nazista. É uma obra controversa, frequentemente estudada por seu impacto histórico e político."
        },
        {
            "nome": "Necronomicon",
            "link": "https://seulink.net/d9aH",
            "foto": "https://m.media-amazon.com/images/I/51z7M5l8G7L._SL1500_.jpg",
            "descricao": "Um grimório fictício criado por H.P. Lovecraft, o Necronomicon é descrito como um livro de magia proibida e conhecimento cósmico. Embora fictício, inspirou diversas obras e discussões sobre ocultismo e horror."
        },
        {
            "nome": "Os Versos Satânicos - Salman Rushdie",
            "link": "https://seulink.net/mHIMcZSW",
            "foto": "https://m.media-amazon.com/images/I/51wO3awoh4L._SL1500_.jpg",
            "descricao": "Romance de Salman Rushdie que mistura realismo mágico e temas de imigração, identidade e religião. A obra gerou controvérsia por sua representação do Islã, levando a debates sobre liberdade de expressão e censura."
        },
        {
            "nome": "The Grand Grimoire",
            "link": "https://seulink.net/nIAhsS",
            "foto": "https://m.media-amazon.com/images/I/41X5X9X9X9L._SL1500_.jpg",
            "descricao": "Também conhecido como 'O Livro Vermelho', este grimório medieval é um texto clássico de magia cerimonial, com instruções para rituais, invocações e pactos com entidades sobrenaturais, amplamente estudado no ocultismo."
        },
        {
            "nome": "The Turner Diaries",
            "link": "https://seulink.net/QmAaYrY",
            "foto": "https://m.media-amazon.com/images/I/51X5X9X9X9L._SL1500_.jpg",
            "descricao": "Escrito por William Luther Pierce sob o pseudônimo Andrew Macdonald, este romance distópico descreve uma revolução violenta baseada em ideologias supremacistas. É uma obra controversa, frequentemente associada a movimentos extremistas."
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
