const links = document.querySelectorAll("header a")
const linksBottom = document.querySelectorAll("footer a")
const main = document.querySelector("main")

links.forEach( link => {
	link.addEventListener('click', e => {
		e.preventDefault()
		const id= link.id
		const archivo = '/templates/' + id + '.html'
		history.pushState(null,"", id)
		const xhr = ajax(archivo)

		xhr.addEventListener('load', () =>{
			if(xhr.status == 200){
				main.innerHTML = xhr.response

			}
		})
	})
} )

linksBottom.forEach( linksBottom => {
	linksBottom.addEventListener('click', e => {
		e.preventDefault()
		const id= linksBottom.id
		const archivo = '/templates/' + id + '.html'
		history.pushState(null,"", id)
		const xhr = ajax(archivo)

		xhr.addEventListener('load', () =>{
			if(xhr.status == 200){
				main.innerHTML = xhr.response

			}
		})
	})
} )

const home = ajax('/templates/home.html')
home.addEventListener('load', ()=> {
	if(home.status == 200){
		main.innerHTML = home.response
	}
})


function ajax(url, metodo){
// si no recibe parametro entonces GET
	const metodo_ = metodo || "GET"
	const xhr = new XMLHttpRequest
	xhr.open(metodo_, url)
	xhr.send()
	return xhr
}

// Se dispara solo cuando el cambio en el path es por las FLECHAS de navegacion
window.addEventListener("popstate", () => {
	let archivo = '/templates/'+ location.pathname.split('/')[1] + '.html'
	const xhr = ajax(archivo)

		xhr.addEventListener('load', () =>{
			if(xhr.status == 200){
				main.innerHTML = xhr.response
			}
		})
	
})


