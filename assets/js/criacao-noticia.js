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

// Função para filtrar
function filtrar() {
    var input, filter, noticias, i, txtValue;
    input = document.getElementById('search');
    filter = input.value.toUpperCase();
    noticias = document.querySelectorAll('.noticia, .conteudo_noticia, .titulo, .comentarios, .conteudo_principal, .noticia_principal1, .conteudo');

    for (i = 0; i < noticias.length; i++) {
        txtValue = noticias[i].textContent || noticias[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            noticias[i].style.display = "";
        } else {
            noticias[i].style.display = "none";
        }
    }
}

        // Função para exibir a imagem selecionada
const inputFile = document.getElementById('image');
const pictureImage = document.querySelector('.imagem_span');
const pictureImageTxt = "Escolha uma imagem";

inputFile.addEventListener("change", function (e) {
    const file = e.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.addEventListener("load", function () {
        const img = document.createElement("img");
        img.src = reader.result;
        img.classList.add("picture__img");

        pictureImage.innerHTML = "";
        pictureImage.appendChild(img);
    });

        reader.readAsDataURL(file);
    } else {
        pictureImage.innerHTML = pictureImageTxt;
    }
});

//Função para salvar os dados do form no localStorage
function submitForm() {
    var titulo = document.getElementById('titulo').value.trim();
    var conteudo = document.getElementById('textarea').value.trim();
    var data = document.getElementById('data').value.trim();
    var autor = document.getElementById('autor').value.trim();
    var imagem = document.getElementById('image').files[0];

    // Verificar se todos os campos estão preenchidos
    if (!titulo || !conteudo || !data || !autor || !imagem) {
        alert('Todos os campos devem ser preenchidos.');
        return; // Interrompe a execução da função
    }

    var reader = new FileReader();
    reader.onload = function(e) {
        // Dividir o conteúdo em parágrafos
        var conteudoParagrafos = conteudo.split('\n').filter(p => p.trim() !== '');

        var noticia = {
            titulo: titulo,
            conteudo: conteudoParagrafos,
            data: data,
            autor: autor,
            imagem: e.target.result
        };

        salvarNoticiaLocal(noticia);
        alert('Notícia salva com sucesso!');
        this.reset(); // Limpar formulário após envio
    };
    reader.readAsDataURL(imagem);
}

function salvarNoticiaLocal(noticia) {
    var noticias = JSON.parse(localStorage.getItem('noticias')) || [];
    noticias.push(noticia);
    localStorage.setItem('noticias', JSON.stringify(noticias));
}
/*notificacoes*/
function notify(type, message) {
            (() => {

                var area = document.getElementById("notification-area");
                let n = document.createElement("div");
                let notification = Math.random().toString(36).substr(2, 10);
                n.setAttribute("id", notification);
                n.classList.add("notification", type);
                n.innerHTML = "<div><b>Message</b></div>" + message;
                area.appendChild(n);

                let color = document.createElement("div");
                let colorid = "color" + Math.random().toString(36).substr(2, 10);
                color.setAttribute("id", colorid);
                color.classList.add("notification-color", type);
                document.getElementById(notification).appendChild(color);


                let icon = document.createElement("a");
                let iconid = "icon" + Math.random().toString(36).substr(2, 10);
                icon.setAttribute("id", iconid);
                icon.classList.add("notification-icon", type);
                document.getElementById(notification).appendChild(icon);


                let _icon = document.createElement("i");
                let _iconid = "_icon" + Math.random().toString(36).substr(2, 10);
                _icon.setAttribute("id", _iconid);

                if (type == 'success') {
                    _icon.className = "fa fa-2x fa-check-circle";
                }
                else {
                    _icon.className = "fa fa-2x fa-exclamation-circle";
                }
                document.getElementById(iconid).appendChild(_icon);

                area.style.display = 'block';
                setTimeout(() => {
                    var notifications = document.getElementById("notification-area").getElementsByClassName("notification");
                    for (let i = 0; i < notifications.length; i++) {
                        if (notifications[i].getAttribute("id") == notification) {
                            notifications[i].remove();
                            break;
                        }
                    }

                    if (notifications.length == 0) {
                        area.style.display = 'none';
                    }

                }, 5000);
            })();
        }

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