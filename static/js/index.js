let btn_selecionar = document.getElementById('btn_select_turma')
let select_turma = document.getElementById('select_turma')
let tabela = document.getElementById('tabela')
let btn_sortear = document.getElementById('btn_sortear')
let tabela_duplas = document.getElementById('tabela_duplas')
let lista = []

function atualizar_lista(nome){
    index = lista.findIndex((n)=>n==nome)
    if(index == -1){
        lista.push(nome)
    }else{
        lista.splice(index,1)
    }
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

btn_selecionar.addEventListener('click',()=>{
    let turma = select_turma.options[select_turma.selectedIndex].value
    fetch('/get_nomes',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'turma':turma})
    })
    .then(res=>{
        return res.json()
    })
    .then(data=>{
        tabela.innerHTML = ""
        tabela_duplas.innerHTML = ""
        for(let i = 0; i < data.length; i++){
            tabela.insertAdjacentHTML('beforeend',
            `<tr>
                <td>${data[i]}</td>
                <td><input type="checkbox" onClick = "atualizar_lista('${data[i]}')"/></td>
             </tr>`
            )
        }
    })
    
})

btn_sortear.addEventListener('click',()=>{

    let dif = lista.length % 2 == 0 ? 0 : 3
    lista = shuffle(lista)

    tabela_duplas.innerHTML = '';
    
    for(let i = 0; i < lista.length - dif; i+=2){
        tabela_duplas.insertAdjacentHTML('beforeend',
            `
            <tr>
                <td>${lista[i]}</td>
                <td>${lista[i+1]}</td>
                <td> </td>
            </tr>
            `
        )
    }

    if(dif){
        tabela_duplas.insertAdjacentHTML('beforeend',
            `
            <tr>
                <td>${lista.at(-1)}</td>
                <td>${lista.at(-2)}</td>
                <td>${lista.at(-3)}</td>
            </tr>
            `
        )
    }

})