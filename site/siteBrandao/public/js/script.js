var cad =[];
var inf =
{
    nome: '',
    email: '',
    senha: ''
}


var valmail, valsenha, valnome, valconf;


function validarEmail(mail)
{
    usuario = mail.value.substring(0, mail.value.indexOf("@"));
    dominio = mail.value.substring(mail.value.indexOf("@")+1, mail.value.length);

    if((usuario.length >= 1)
    && (dominio.length >= 3)
    && (usuario.search("@") == -1)
    && (dominio.search("@") == -1)
    && (usuario.search(" ") == -1)
    && (dominio.search(" ") == -1)
    && (dominio.search(".") != -1)
    && (dominio.indexOf(".") >= 1)
    && (dominio.lastIndexOf(".") < dominio.length - 1))
    {
        mail.classList.add("is-valid");
        emailAviso.innerHTML = `Email válido`;
        mail.classList.remove("is-invalid");
        valmail = 1;
    }
    else
    {
        mail.classList.add("is-invalid");
        emailAviso.innerHTML = `Email invalido`;
        valmail = 0;
    }
}

function validarNome(nom)
{   

    if(nom.value.length >= 3)
    {
        nom.classList.add("is-valid");
        nomeAviso.innerHTML = `Nome válido`;
        nom.classList.remove("is-invalid");
        valnome = 1;
    }
    else
    {
        nom.classList.add("is-invalid");
        nomeAviso.innerHTML = `Nome invalido`;
        valnome = 0;
    }
}


function validarSenha(sen)
{
    if(sen.value.length >= 8)
    {
        sen.classList.add("is-valid");
        senhaAviso.innerHTML = `Senha válida`;
        sen.classList.remove("is-invalid");
        valsenha = 1;
    }
    else
    {
        sen.classList.add("is-invalid");
        senhaAviso.innerHTML = `Senha invalida`;
        valsenha = 0;
    }
}


function valconfSenha(confsen)
{
    if(confsen.value == input_senha.value)
    {
        confsen.classList.add("is-valid");
        confsenAviso.innerHTML = `Senhas iguais`
        confsen.classList.remove("is-invalid");
        valconf = 1;
    }
    else
    {
        confsen.classList.add("is-invalid");
        confsenAviso.innerHTML = `Senhas diferem`;
        valconf = 0;
    }
}



function cadastro()
{

    valnome == 0? alert(`Arrume o nome`):
    valmail == 0? alert(`Arrume o Email`):
    valsenha == 0? alert(`Senha precisa ter mais que 8 caracteres`):
    valconf == 0? alert(`As senhas precisam ser iguais`): cadastrar();
}

function cadastrar()
{
    inf.nome = input_nome.value;
    inf.email = input_email.value;
    inf.senha = input_senha.value;

    cad.push(inf);
}

verificarAutenticacao();

function verificarAutenticacao() {
    if (sessionStorage.usuario_bandtec != undefined) {
        window.location.href = 'logado.html';
    }
}

function entrar() {
    aguardar();
    var formulario = new URLSearchParams(new FormData(input_logemail));
    fetch("/usuarios/entrar", {
        method: "POST",
        body: formulario
    }).then(function (response) {
        
        if (response.ok) {

            response.json().then(function (resposta) {

                sessionStorage.usuario_bandtec = resposta.nome;
                verificarAutenticacao();

            });
        } else {

            alert('Erro de login!');
            finalizar_aguardar();
        }
    });

    return false;
}

function aguardar() {
    btn_entrar.disabled = true;
    img_aguarde.style.display='block';
    div_erro.style.display='none';
}

function finalizar_aguardar() {
    btn_entrar.disabled = false;
    img_aguarde.style.display='none';
    div_erro.style.display='block';
}

function cadastrar() {
    aguardar();
    var formulario = new URLSearchParams(new FormData(form_cadastro));
    fetch("/usuarios/cadastrar", {
        method: "POST",
        body: formulario
    }).then(function (response) {
        
        if (response.ok) {

            window.location.href='login.html';

        } else {

            console.log('Erro de cadastro!');
            response.text().then(function (resposta) {
                div_erro.innerHTML = resposta;
            });
            finalizar_aguardar();
        }
    });

    return false;
}

function aguardar() {
    b_log.disabled = true;
    img_aguarde.style.display='block';
    div_erro.style.display='none';
}

function finalizar_aguardar() {
    b_log.disabled = false;
    img_aguarde.style.display='none';
    div_erro.style.display='block';
}