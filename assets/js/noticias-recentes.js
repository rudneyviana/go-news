//Puxa as info
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

//Funcão para animação da header quando ocorrer a rolagem
const shrinkOn = 10; // Distância em pixels para iniciar a animação

window.addEventListener('scroll', () => {
if (window.scrollY > shrinkOn) {
header.classList.add('shrink');
sidebar.classList.add('shrink');
dropdown.classList.add('shrink');
} else {
header.classList.remove('shrink');
sidebar.classList.remove('shrink');
dropdown.classList.remove('shrink');
}
});

// Função de buscar

document.addEventListener('DOMContentLoaded', function() {
    conteudoNoticias();
});

function filtrar() {

    var input, filter, main, section, noticias, i, txtValue, h1;

    input = document.getElementById('search');
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
    ordenarNoticiasPorData();
});

function carregarNoticias() {
    var noticias = JSON.parse(localStorage.getItem('noticias')) || [];
    var conteudoAdicionado = document.querySelector('.conteudo');

    if (noticias.length === 0) {
        return;
    }else{
    noticias.forEach(function(noticia, index) {
        var noticiaDiv = document.createElement('div');
        noticiaDiv.className = 'noticia';
        
        var data = new Date(noticia.data + 'T00:00:00');
        var dataFormatada = data.toLocaleDateString('pt-BR');

        noticiaDiv.innerHTML = `
            <a href="./Noticia_independente.html?id=${index}">
                <img src="${noticia.imagem}" alt="" class="imagem-noticia" width="300" height="150">
                <div class="noticia_texto">
                    <h3>${noticia.titulo}</h3><br>
                    <div class="tempo"></a>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
                            </svg>
                        <p><span class="data-noticia">${dataFormatada}</span> Autor: ${noticia.autor}</p>
                    </div>
                </div>
            `;
        conteudoAdicionado.appendChild(noticiaDiv);
    })};
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
    const conteudoJSON = document.querySelector('.conteudo');

    data.noticias.forEach(noticia => {
        const noticiaDiv = document.createElement('div');
        noticiaDiv.classList.add('noticia');

        const dataFormatada = new Date(noticia.data).toLocaleDateString('pt-BR');

        noticiaDiv.innerHTML = `
            <a href="./Noticia_independente_JSON.html?id=${noticia.id}">
                <img src="${noticia.imagem}" alt="" class="imagem-noticia" width="300" height="150">
                <div class="noticia_texto">
                    <h3>${noticia.titulo}</h3><br></a>
                    <div class="tempo">
                        <p><span class="data-noticia">${dataFormatada}</span> Autor: ${noticia.autor}</p>
                    </div>
                </div>
            `;

        conteudoJSON.appendChild(noticiaDiv);
    });
}

// Função para ordenar notícias por data
function ordenarNoticiasPorData() {
    // Selecionar o container das notícias
    const containerNoticias = document.querySelector('.conteudo');

    // Selecionar todas as notícias dentro do container
    const noticias = Array.from(containerNoticias.querySelectorAll('.noticia'));

    // Converter e ordenar as notícias pela data
    noticias.sort(function(a, b) {
        // Obter datas das notícias a e b
        let dataA = new Date(a.querySelector('.data-noticia').textContent.trim().split('/').reverse().join('-'));
        let dataB = new Date(b.querySelector('.data-noticia').textContent.trim().split('/').reverse().join('-'));

        // Ordenar decrescentemente (mais recente primeiro)
        return dataB - dataA;
    });

    // Limpar o container de notícias
    containerNoticias.innerHTML = '';

    // Inserir as notícias ordenadas de volta no container
    noticias.forEach(function(noticia) {
        containerNoticias.appendChild(noticia);
    });
}

// Chamar a função para ordenar as notícias assim que a página carregar
window.addEventListener('load', ordenarNoticiasPorData);