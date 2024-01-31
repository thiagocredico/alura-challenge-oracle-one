const inputMsg = document.getElementById("input_msg");
const cryptBtn = document.querySelector(".crypt");
const decryptBtn = document.querySelector(".decrypt");
const whiteboard = document.getElementById("whiteboard");
const copyBtn = document.querySelector(".copy");
const toBeEmpty = document.getElementById("toBeEmpty");

cryptBtn.addEventListener("click", () => {
    const mensagem = inputMsg.value.trim();
    
    if (!/^[a-z\s]*$/.test(mensagem) | mensagem == '' | mensagem == null | mensagem == undefined | mensagem == ' ') {
        showNotification('Apenas letras minúsculas e sem acento são permitidas.', 'error');
        return;
    }
    
    const mensagemCriptografada = criptografar(mensagem);
    whiteboard.textContent = mensagemCriptografada;
    copyBtn.classList.remove("notvisible");
    inputMsg.value = '';
    showNotification('O texto foi criptografado com sucesso!', 'success');
    limparDiv();    
});

decryptBtn.addEventListener("click", () => {
    const mensagem = inputMsg.value.trim();

    if (!/^[a-z\s]*$/.test(mensagem) | mensagem == '' | mensagem == null | mensagem == undefined | mensagem == ' ') {
        showNotification('Apenas letras minúsculas e sem acento são permitidas.', 'error');
        return;
    }

    const mensagemDescriptografada = descriptografar(mensagem);
    whiteboard.textContent = mensagemDescriptografada;
    copyBtn.classList.remove("notvisible");
    showNotification('O texto foi descriptografado com sucesso!', 'success');
    limparDiv();
});

copyBtn.addEventListener("click", () => {
    copiarTexto();
});

function limparDiv() {
    toBeEmpty.innerHTML = '';
}

function criptografar(mensagem) {
    return mensagem.replace(/e/g, "enter")
                   .replace(/i/g, "imes")
                   .replace(/a/g, "ai")
                   .replace(/o/g, "ober")
                   .replace(/u/g, "ufat");
}

function descriptografar(mensagem) {
    return mensagem.replace(/enter/g, "e")
                   .replace(/imes/g, "i")
                   .replace(/ai/g, "a")
                   .replace(/ober/g, "o")
                   .replace(/ufat/g, "u");
}

function copiarTexto() {
    const texto = whiteboard.textContent.trim();
    navigator.clipboard.writeText(texto)
        .then(() => {
            showNotification('O texto foi copiado para a área de transferência!', 'success');
        })
        .catch(err => {
            console.error('Erro ao copiar texto: ', err);
            showNotification('Erro ao copiar texto.', 'error');
        });
}

function showNotification(text, type) {
    const style = type === 'error' ? { background: 'red' } : { background: 'green' };
    Toastify({
        text: text,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: style
    }).showToast();
}
