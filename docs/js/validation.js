window.onload = function(){
	//contactenos
const validation = ()=>{
	const form = document.querySelector("#contacto form");

	form.querySelectorAll('input').forEach( input => {
		input.addEventListener('focus', ev => {
			ev.target.parentElement.classList.remove('invalid')
		})
	} );
	console.log(input.value)

	const validity = (element, eventType, callback) => {
		element.addEventListener(eventType, ev => {
			
			msj = callback(ev);

			ev.target.parentElement.querySelector(".errMsj").innerText = msj;
			ev.target.setCustomValidity(msj);

			if(msj === ""){
				ev.target.parentElement.classList.add('valid')
				ev.target.parentElement.classList.remove('invalid')
			}else{
				ev.target.parentElement.classList.add('invalid')
				ev.target.parentElement.classList.remove('valid')
			}
		})
	}

	//Nombre
	//Debe tener al menos 3 caracteres y como maximo 25. No puede haber mas de 3 palabras
	validity(form.nombre , "blur", (ev) => {
		msj = "";
		if(ev.target.value.length < 3){
			msj = "El nombre debe tener al menos 3 caracteres";
		
		}else if(ev.target.value.length > 100){
			msj = "El nombre puede tener como máximo 100 caracteres";

		}else if( ev.target.value.split(" ").length > 4  ){
			msj = "El nombre puede tener como máximo 4 palabras";

		}
		return msj;
	});



	//Telefono
	//-Telefono: debe tener solo 10 caracteres numericos
	validity(form.telefono , "blur", (ev) => {
		msj = "";
		regExpTel = /^\d{15}$/

		if(  ! regExpTel.test(ev.target.value)  ){
			msj = "El teléfono debe tener maximo 15 caracteres numericos";
		}

		return msj;
	});
	
	

	// Email
	//-Email: Debe tener el siguiente formato: a@a.a o a@a.a.a / solo se permiten caracteres alfanumericos, puntos, guiones medios y guines bajos ademas del @
	validity(form.email , "blur", (ev) => {
		msj = "";
		regExpEmail = /^(\w|-|_|.){2,}@\w+(.\w+){1,3}$/g

		if( !regExpEmail.test(ev.target.value) ){
			msj = "Ingrese un email válido";
		
		}

		return msj;
	});
	


	form.addEventListener("submit", ev => {
		let ok = true;

		ev.target.querySelectorAll("input").forEach( input => {
			if(input.value === ""){
				ev.preventDefault();
				document.querySelector('span.errForm').innerText = "Debe completar todos los campos"
				ok = false;
			}
		} );


		if(ok){
			const formData = new FormData(ev.target);
			fetch('API/recibir.php', {
				method: "POST",
				body: formData
			})
			.then( response => response.json() )
			.then( json => receivedNotification(json.ok) )
		} 
	});


	const receivedNotification = ok => {
		console.log(ok)
		const divMsj = document.createElement("div")
		divMsj.classList.add("receivedNotification")

		if (ok){
			divMsj.classList.add("ok")
			divMsj.innerText = "Datos cargados correctamente";
		}else{
			divMsj.classList.add("err")
			divMsj.innerText = "Error en la carga de los datos";
		}

		document.body.appendChild(divMsj);

		setTimeout( ()=>{
			document.body.removeChild(divMsj);
		}, 4000);

	};
}
}