//Puxa as info
var html             = document.querySelector('html')
var checkbox         = document.getElementById('switch')
var header           = document.getElementById('header');
var sidebar          = document.getElementById('sidebar');
var main             = document.getElementById('main');
var section          = document.getElementById('section');
var showSidebar      = false;

//Funcão para animação da header quando ocorrer a rolagem
const shrinkOn = 100; // Distância em pixels para iniciar a animação

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
// Função para ativar/desativar o modo noturno pelo Checkbox

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

// Esconder dropdown ao clicar fora do botão e dropdown
window.addEventListener('click', function(event) {
if (!dropdownButton.contains(event.target) && !dropdown.contains(event.target)) {
dropdown.classList.remove('show');
}
});

// Função de buscar

function filtrar() {
const divAdicionados = document.querySelector('.conteudoAdicionado h1')
divAdicionados.style.display = 'none'

var input, filter, main, section, noticias, i, txtValue;

input = document.getElementById('search');
filter = input.value.toUpperCase();
main = document.getElementById('main');
section = document.getElementById('section');

noticias = document.querySelectorAll('.noticia, .conteudo_noticia, .titulo, .comentarios, .conteudo_principal, .noticia_principal1');

for (i = 0; i < noticias.length; i++) {
txtValue = noticias[i].textContent || noticias[i].innerText;
if (txtValue.toUpperCase().indexOf(filter) > -1) {
    noticias[i].style.display = "";
} else {
    noticias[i].style.display = "none";
}
}
}

// Comentarios
function carregarComentarios(noticiaId) {
const commentsContainer = document.getElementById('comments');
const storedComments = JSON.parse(localStorage.getItem(`comments_noticia_${noticiaId}`)) || [];

storedComments.forEach(comment => {
displayComment(comment, commentsContainer);
});
}

function displayComment(comment, container) {
const commentHTML = `
<div class="comment">
    <div class="name">${comment.name}</div>
    <div class="timestamp">${comment.timestamp}</div>
    <p>${comment.comment}</p>
</div>
`;
container.innerHTML += commentHTML;
}

document.getElementById('commentForm').addEventListener('submit', function(event) {
event.preventDefault();

const name = this.name.value;
const commentText = this.comment.value;
const noticiaId = obterParametroUrl('id');

if (name && commentText && noticiaId !== null) {
const timestamp = new Date().toLocaleString();
const comment = { name, comment: commentText, timestamp };

// Adicionar comentário à lista exibida na página
const commentsContainer = document.getElementById('comments');
displayComment(comment, commentsContainer);

// Salvar o novo comentário no LocalStorage específico da notícia
const storedComments = JSON.parse(localStorage.getItem(`comments_noticia_${noticiaId}`)) || [];
storedComments.push(comment);
localStorage.setItem(`comments_noticia_${noticiaId}`, JSON.stringify(storedComments));

this.reset(); // Limpar formulário após envio
} else {
alert('Por favor, preencha todos os campos.');
}
});


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
        <a href="./Noticia_independente.html?id=${index}">
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
    <a href="./Noticia_independente_JSON.html?id=${noticia.id}">
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