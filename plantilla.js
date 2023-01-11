const $main = document.querySelector('main') // Es main solo sin "." ya que es una etiqueta universal

const getHTML=(options)=>{
    let {url,success,error}= options;

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange',e=>{
        if(xhr.readyState !== 4) return
        if(xhr.status >= 200 && xhr.status <300){
            let html = xhr.responseText // respuest adel XML.Http.Request
            success(html)
        }else{
            let message = xhr.statusText || 'Error'
            error(`Ver ${xhr.status} -- ${message}`)
        }
    });

    xhr.open('GET',url);
    xhr.setRequestHeader("Content-Type","text/html; charset=utf-8");
    xhr.send()
};

// Cargo el html que queir que se muestre primero
document.addEventListener('DOMContentLoaded',e=>{
    getHTML({
        url:"/assett/home.html",
        success:(html)=> $main.innerHTML= html,
        error:(err)=> $main.innerHTML= `<p> Que paso, ${err}</p>`
    })
})

//  browser of options 

// variable para el evento de los btn de slider-silder 

// fin de las varibales 
document.addEventListener('click',e=>{

   

    if(e.target.matches('.menu a')){
        e.preventDefault();
        getHTML({
            url: e.target.href,
            success:(html)=> $main.innerHTML = html,
            error:(err)=> $main.innerHTML = `<p>${err}</p>`
        })
    }

    if(e.target.matches('.btn-compra')){
       // console.log(e.path)
       let isBuying = confirm(`¿Comprar  - ${e.path[1].childNodes[3].innerHTML} ?`)
       // console.log(e.path[1].childNodes[5].innerHTML)

    }

    // if para controlar los btn de slider
    // Como no puedo invocar las class de los btn . ya que estan en otro nodo. tube que utilizar e.path para poder localizar los elemento que necesitaba modificar, en este caso 
    //     necesitava modifocar las la class de las img, poder manejar la class active para poder mostrar o ocular las img 

    if(e.target.matches('.prev')){
        e.preventDefault()
        e.path[2].children[0].children[0].classList.remove('active')
        e.path[2].children[0].children[1].classList.add('active')    
       console.log(  e.path)

    }


    if(e.target.matches('.next')){
        e.preventDefault()
        e.path[2].children[0].children[0].classList.add('active')
        e.path[2].children[0].children[1].classList.remove('active')     
       
    }
        


})

// Filter de los reloj 

document.addEventListener('keyup',e=>{
    if(e.target.matches('.card-filter')){
        document.querySelectorAll('.card').forEach(el=>{
    el.textContent.toLowerCase().includes(e.target.value)?el.classList.remove('filter'):el.classList.add('filter')
        })
    }
})

