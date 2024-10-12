//Puxa as info
var html             = document.querySelector('html')
var checkbox         = document.getElementById('switch')
var header           = document.getElementById('header');
var sidebar          = document.getElementById('sidebar');
var main             = document.getElementById('main');
var section          = document.getElementById('section');
var showSidebar      = false;

//Funcão para abrir a barra lateral
function toggleSidebar()
{
    showSidebar = !showSidebar;
    if(showSidebar){
        sidebar.style.marginLeft = '-1vw';            
        sidebar.style.animationName = 'showSidebar';
        main.style.filter = 'blur(2px)';
    }else{
        sidebar.style.marginLeft = '-100vw';
        sidebar.style.animationName = '';
        main.style.filter = '';
    }
}
//Função para fechar a barra lateral
function closeSidebar(){
    if(showSidebar){
        showSidebar = true;
        toggleSidebar();
    }
}

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
    e.preventDefault()
});
// Funçao do filtro na header
const dropdownButtonFiltro = document.getElementById('dropdownButtonFiltro');
const dropdownFiltro = document.getElementById('dropdownFiltro');

// Mostrar/Esconder dropdown ao clicar no botão
dropdownButtonFiltro.addEventListener('click', function(e) {
    dropdownFiltro.classList.toggle('show');
    e.preventDefault()
});

// Esconder dropdown ao clicar fora do botão e dropdown
window.addEventListener('click', function(event) {
    if (!dropdownButton.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.classList.remove('show');
    }
});

//Funcão para animação da header quando ocorrer a rolagem
const shrinkOn = 10; // Distância em pixels para iniciar a animação

window.addEventListener('scroll', () => {
if (window.scrollY > shrinkOn) {
header.classList.add('shrink');
sidebar.classList.add('shrink');
dropdown.classList.add('shrink');
dropdownFiltro.classList.add('shrink');
search.classList.add('shrink');
} else {
header.classList.remove('shrink');
sidebar.classList.remove('shrink');
dropdown.classList.remove('shrink');
dropdownFiltro.classList.remove('shrink');
search.classList.remove('shrink');
}
});

// Função de buscar

function filtrar() {
    const divAdicionados = document.querySelector('.conteudoAdicionado h1, .conteudoJSON h1')
    divAdicionados.style.display = 'none'

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
});

function carregarNoticias() {
    var noticias = JSON.parse(localStorage.getItem('noticias')) || [];
    var conteudoAdicionado = document.querySelector('.conteudoAdicionado');

    if (noticias.length === 0) {
        conteudoAdicionado.innerHTML = '<h1 style="color: var(--color-roxo); font-size: 50px; text-shadow: 1px 1px 4px var(--color-preto);">Noticias criadas pelo usuario aparecerão aqui.</h1>';
        return;
    } else {
        conteudoAdicionado.innerHTML = '<h1 style="color: var(--color-roxo); font-size: 50px; text-shadow: 1px 1px 4px var(--color-preto);">Veja as noticias criadas por você!</h1>';
        noticias.forEach(function(noticia, index) {
            var noticiaDiv = document.createElement('div');
            noticiaDiv.className = 'noticia';

            var data = new Date(noticia.data + 'T00:00:00');
            var dataFormatada = data.toLocaleDateString('pt-BR');

            noticiaDiv.innerHTML = `
                <a href="Noticia_independente.html?id=${index}">
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
    const noticias = document.querySelectorAll('.noticia, .noticia_principal1');
    const divAdicionados = document.querySelector('.conteudoAdicionado h1')
    const h1JSON = document.getElementById('h1JSON')
    h1JSON.style.display = 'none'
    divAdicionados.style.display = 'none'
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
        buscaNone.textContent = "Nenhuma notícia encontrada.";
    } else {
        buscaNone.textContent = "";
    }
}
//Função de filtrar por autor
function filtrarAutor() {
    var autorFilter = document.getElementById('autorFilter').value.trim().toLowerCase();
    const noticias = document.querySelectorAll('.noticia, .noticia_principal1');
    const divAdicionados = document.querySelector('.conteudoAdicionado h1')
    const h1JSON = document.getElementById('h1JSON')
    h1JSON.style.display = 'none'
    divAdicionados.style.display = 'none'
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
        conteudoAdicionado.style.display = 'none'
    } else {
        buscaNone.textContent = "";
    }
}

// Carregar noticias a partir de um arquivo JSON
document.addEventListener('DOMContentLoaded', function() {
    carregarNoticiasDeArquivo('noticias.json');
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
            <a href="Noticia_independente_JSON.html?id=${noticia.id}">
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
