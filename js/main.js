//Neste código, sobrescrevesmos o localStorage todo momento que queremos atualizá-lo
const form = document.getElementById("novoItem")
const lista = document.getElementById('lista')
const itens = JSON.parse(localStorage.getItem("itens")) || []


itens.forEach((elemento)=>{
    criaElemento(elemento)
})

form.addEventListener("submit", (evento)=>{
    evento.preventDefault() //previne o evento padrão de submit para que posssamos ter acesso aos dados do form
    console.log(evento)
    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']
    if(nome.value==="" || quantidade.value===""){
        alert("Você precisa preencher os campos!")
        return
    }
    //Criando JSON
    const itemAtual = {
        "nome" : nome.value,
        "quantidade" : quantidade.value
    }

    const existe = itens.find(elemento=>elemento.nome === nome.value)
    if(existe){
        itemAtual.id = existe.id
        atualizaElemento(itemAtual)
        //Atualizando o localStorage
        itens[itens.findIndex(elemento => elemento.id===existe.id)] = itemAtual
    }else{
        itemAtual.id = itens[itens.length-1] ? (itens[itens.length-1]).id+1 : 0; //Atualizando id para concordar com a função deletaElemento()
        criaElemento(itemAtual)
        itens.push(itemAtual)
    }

    //localstorage nao pode receber JSONs, somente strings
    localStorage.setItem('itens', JSON.stringify(itens))

    nome.value = ""
    quantidade.value = ""
})


function criaElemento(item){
    const novoItem = document.createElement('li')
    novoItem.classList.add("item")

    const numeroDoItem = document.createElement('strong')
    numeroDoItem.innerHTML = item.quantidade
    numeroDoItem.dataset.id = item.id

    novoItem.appendChild(numeroDoItem)
    novoItem.innerHTML += item.nome

    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem)
}

function atualizaElemento(item){
    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade;
}

function botaoDeleta(id){
    const elementoBotao = document.createElement('button')
    elementoBotao.innerText = "X"
    elementoBotao.classList.add('botaoremove')
    elementoBotao.addEventListener('click', function(){
        deletaElemento(this.parentNode, )
    })

    return(elementoBotao)
}

function deletaElemento(tag, id){
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id == id),1)
    localStorage.setItem('itens', JSON.stringify(itens))
}