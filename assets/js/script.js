//Puxa as info
var html             = document.querySelector('html')
var checkbox         = document.getElementById('switch')
var header           = document.getElementById('header');
var sidebar          = document.getElementById('sidebar');
var main             = document.getElementById('main');
var section          = document.getElementById('section');
let showSidebar = false; // Controla a barra de busca
let isSidebarOpen = false; // Controla a barra lateral

// Função para abrir/recolher a barra lateral
function toggleSidebar() {
    isSidebarOpen = !isSidebarOpen;
    const sidebar = document.getElementById('sidebar'); // Supondo que sidebar seja o id da barra lateral
    const main = document.getElementById('main'); // Supondo que main seja o id do conteúdo principal

    if (isSidebarOpen) {
        sidebar.style.marginLeft = '0';            
        main.style.filter = 'blur(2px)';
    } else {
        sidebar.style.marginLeft = '-100vw';
        main.style.filter = 'none';
    }
}
document.addEventListener('click', function(event) {
    const searchInput = document.getElementById('sidebar');
    
    // Verifica se o clique foi fora da barra de busca e se ela está expandida
    if (sidebar.contains(event.target) && !searchInput.contains(event.target) && showSidebar) {
        // Recolhe a barra de busca
        toggleSidebar();
    }
    
});

// Função para expandir/recolher a barra de busca
function expandeSearch() {
    showSidebar = !showSidebar;
    
    if (showSidebar) {
        search.classList.add('expandida');
    } else {
        search.classList.remove('expandida');
    }
}

// Detectar cliques fora da barra de busca
document.addEventListener('click', function(event) {
    const searchInput = document.getElementById('searchInput');

    // Verifica se o clique foi fora da barra de busca e se ela está expandida
    if (!search.contains(event.target) && !searchInput.contains(event.target) && showSidebar) {
        // Recolhe a barra de busca
        expandeSearch();
    }
    
});




// Função para ativar/desativar o modo noturno pelo Checkbox COM LOCAL STORAGE

// Verifica se há uma preferência de tema armazenada e aplica o tema
const theme = localStorage.getItem('theme');
if (theme === 'dark') {
    html.classList.add('dark-mode');
    checkbox.checked = true;
}

// Adiciona um listener ao checkbox para alternar o tema e armazenar a preferência
checkbox.addEventListener('change', function() {
    html.classList.toggle('dark-mode');
    if (html.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// Funçao da noticia na header
const dropdownButton = document.getElementById('dropdownButton');
const dropdown = document.getElementById('dropdown');

// Mostrar/Esconder dropdown ao clicar no botão
dropdownButton.addEventListener('click', function(e) {
    dropdown.classList.toggle('show');
    dropdownButton.classList.toggle('show');
    e.preventDefault()
});
document.getElementById('dropdown').addEventListener('click', function(event) {
    event.stopPropagation(); // Impede que o clique no dropdown propague para o link
});
// Funçao do filtro na header
const dropdownButtonFiltro = document.getElementById('dropdownButtonFiltro');
const dropdownFiltro = document.getElementById('dropdownFiltro');
const dropdownDiv = document.getElementById('dropdownDiv');

// Mostrar/Esconder dropdown ao clicar no botão
dropdownButtonFiltro.addEventListener('click', function(e) {
    dropdownFiltro.classList.toggle('show');
    dropdownDiv.classList.toggle('show');
    e.preventDefault()
});

//Funcão para animação da header quando ocorrer a rolagem
const shrinkOn = 10; // Distância em pixels para iniciar a animação

window.addEventListener('scroll', () => {
if (window.scrollY > shrinkOn) {
header.classList.add('shrink');
sidebar.classList.add('shrink');
dropdown.classList.add('shrink');
dropdownFiltro.classList.add('shrink');
} else {
header.classList.remove('shrink');
sidebar.classList.remove('shrink');
dropdown.classList.remove('shrink');
dropdownFiltro.classList.remove('shrink');
}
});

// Função de buscar

function filtrar() {
    const divAdicionados = document.querySelector('.conteudoAdicionado h1, .conteudoJSON h1')
    divAdicionados.style.display = 'none'

    var input, filter, main, section, noticias, i, txtValue, h1;

    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    main = document.getElementById('main');
    section = document.getElementById('section');
    h1 = document.getElementById('buscaNone')

    noticias = document.querySelectorAll('.noticia, .conteudo_noticia, .titulo, .comentarios, .conteudo_principal, .noticia_principal1, conteudo');

    for (i = 0; i < noticias.length; i++) {
        txtValue = noticias[i].textContent || noticias[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            noticias[i].style.display = "";
        } else {
            noticias[i].style.display = "none";
        }
    }
}

// Função para carregar as noticias adicionadas
document.addEventListener('DOMContentLoaded', function() {
    carregarNoticias();
});

function carregarNoticias() {
    var noticias = JSON.parse(localStorage.getItem('noticias')) || [];
    var conteudoAdicionado = document.querySelector('.conteudoAdicionado');

    if (noticias.length === 0) {
        conteudoAdicionado.innerHTML = '';
        return;
    } else {
        conteudoAdicionado.innerHTML = '<h1 style="color: var(--color-roxo); font-size: 50px; text-shadow: 1px 1px 4px var(--color-preto);">Veja as noticias criadas por você!</h1>';
        noticias.forEach(function(noticia, index) {
            var noticiaDiv = document.createElement('div');
            noticiaDiv.className = 'noticia';

            var data = new Date(noticia.data + 'T00:00:00');
            var dataFormatada = data.toLocaleDateString('pt-BR');

            noticiaDiv.innerHTML = `
                <a href="../pages/Noticia_independente.html?id=${index}">
                    <img src="${noticia.imagem}" alt="" class="imagem-noticia" width="300" height="150">
                    <div class="noticia_texto">
                        <h3>${noticia.titulo}</h3><br>
                        <div class="tempo">
                            <p>${dataFormatada} Autor: ${noticia.autor}</p>
                        </div><hr>
                    </div>
                </a>
                <button onclick="excluirNoticia(${index})" class = "botaoNoticiaAdicionada">Excluir</button>`;
            conteudoAdicionado.appendChild(noticiaDiv);
        });
    }
}

function excluirNoticia(index) {
    if (confirm("Tem certeza que deseja excluir esta notícia?")) {
        var noticias = JSON.parse(localStorage.getItem('noticias')) || [];
        noticias.splice(index, 1);
        localStorage.setItem('noticias', JSON.stringify(noticias));
        carregarNoticias();
    }
}

// Carregar as notícias ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    carregarNoticias();
});
// Função de filtrar por data
function filtrarData() {
    const dateFilter = document.getElementById('dateFilter').value;
    const noticias = document.querySelectorAll('.noticia, .noticia_principal1, .noticia_principal2, .noticia_principal3 ');
    const divAdicionados = document.querySelector('.conteudoAdicionado h1')
    const h1JSON = document.getElementById('h1JSON')
    h1JSON.style.display = 'none'
    let hasResults = false;

    noticias.forEach(noticia => {
        const dataNoticia = noticia.querySelector('.tempo p').textContent.split(' ')[0]; // Extrair a data do texto
        const [day, month, year] = dataNoticia.split('/'); 
        const dataFormatada = `${year}-${month}-${day}`; 

        if (dateFilter === dataFormatada) {
            noticia.style.display = ''; // Mostrar a notícia
            hasResults = true;
        } else {
            noticia.style.display = 'none'; // Esconder a notícia
        }
    });

    const buscaNone = document.getElementById('buscaNone');
    if (!hasResults) {
        divAdicionados.style.display = 'none'
        buscaNone.textContent = "Nenhuma notícia encontrada.";
    } else {
        buscaNone.textContent = "";
        divAdicionados.style.display = 'none'
    }
}
//Função de filtrar por autor
function filtrarAutor() {
    var autorFilter = document.getElementById('autorFilter').value.trim().toLowerCase();
    const noticias = document.querySelectorAll('.noticia, .noticia_principal1, .noticia_principal2, .noticia_principal3 ');
    const divAdicionados = document.querySelector('.conteudoAdicionado h1')
    const h1JSON = document.getElementById('h1JSON')
    h1JSON.style.display = 'none'
    filtrarData.return
    let hasResults = false;

    noticias.forEach(noticia => {
        const autorElement = noticia.querySelector('.tempo p');
        if (autorElement) {
            const autorTexto = autorElement.textContent.trim().toLowerCase(); // Extrair o autor do texto
            if (autorTexto.includes(autorFilter)) {
                noticia.style.display = ''; // Mostrar a notícia
                hasResults = true;
            } else {
                noticia.style.display = 'none'; // Esconder a notícia
            }
        }
    });

    const buscaNone = document.getElementById('buscaNone');
    if (!hasResults) {
        buscaNone.textContent = "Nenhuma notícia encontrada.";
        divAdicionados.style.display = 'none'
    } else {
        buscaNone.textContent = "";
        divAdicionados.style.display = 'none'
    }
}

// Carregar noticias a partir de um arquivo JSON
document.addEventListener('DOMContentLoaded', function() {
    carregarNoticiasDeArquivo('../assets/json/noticias.json');
});

function carregarNoticiasDeArquivo(jsonFile) {
    fetch(jsonFile)
        .then(response => response.json())
        .then(data => {
            exibirNoticiasJSON(data);
        })
        .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));
}

function exibirNoticiasJSON(data) {
    const conteudoJSON = document.querySelector('.conteudoJSON');

    data.noticias.forEach(noticia => {
        const noticiaDiv = document.createElement('div');
        noticiaDiv.classList.add('noticia');

        const dataFormatada = new Date(noticia.data).toLocaleDateString('pt-BR');

        noticiaDiv.innerHTML = `
            <a href="../pages/Noticia_independente_JSON.html?id=${noticia.id}">
                <img src="${noticia.imagem}" alt="" class="imagem-noticia" width="300" height="150">
                <div class="noticia_texto">
                    <h3>${noticia.titulo}</h3><br>
                    <div class="tempo">
                        <p>${dataFormatada} Autor: ${noticia.autor}</p>
                    </div><hr>
                </div>
            </a>`;

        conteudoJSON.appendChild(noticiaDiv);
    });
}
