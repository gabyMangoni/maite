//Guardo los links del header en una constante
const links = document.querySelectorAll("header a")

//Recorro el array de links y le añado un evento de click
links.forEach( link => {

	link.addEventListener('click', ev => {
		//Detengo la redireccion de los links
		ev.preventDefault()

		//Busco el recurso html segun el href del link
		const xhr = new XMLHttpRequest
		xhr.open('GET', ev.target.href)
		xhr.send()

		//Obtengo el contenido del archivo html correspondiente
		xhr.addEventListener('load', ev =>{
			document.querySelector("main").innerHTML = ev.target.response
		})
	})

} )