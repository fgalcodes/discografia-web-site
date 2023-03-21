const albumes = document.getElementById("albumes");
const json = "discos.json";
let discografia = new Discografia();

fetch(json)
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        for (const discoJson of json) {
            let disco = new Disco();
            disco.Crear(discoJson.nombre, discoJson.interprete.banda, discoJson.publicacion, discoJson.genero, discoJson.portada, discoJson.localizacion);
            discografia.AgregarDisco(disco);
        }
        CrearAlbumes(discografia);
    })
    .catch(function (error) {
        console.log("Algo ha salido mal" + error);
    });

function AccionBuscador(){
    const selection = document.getElementById("buscador-disco").querySelector("select").value;

    if (selection.toLocaleLowerCase() == "prestar") {
        PrestarAlbum()
    } else MostrarAlbumInfo();
}
function MostrarAlbumInfo() {
    const palabraClave = document.getElementById("buscador-disco").querySelector("input").value;
    const localizacion = BuscadorDisco();
    const selection = document.getElementById("albumes-info");
    
    let tempDisco = new Disco();

    while (selection.hasChildNodes()) {
        BorrarAlbumes(selection);
    }

    if (localizacion != null) {

        console.log(discografia.InfoDiscos(localizacion));
        tempDisco = discografia.InfoDiscos(localizacion);
    
        CrearAlbumInfo(tempDisco);
        
    } else if (palabraClave.toLocaleLowerCase() == "all discos") { 
        for(i= 0; i < discografia.discos.length; i++){
            CrearAlbumInfo(discografia.discos[i]);
        }
    }
    
}
function BuscadorDisco() {
    const buscador = document.getElementById("buscador-disco").querySelector("input").value;
    const respuesta = discografia.discos.find(findLoc);
    
    function findLoc(disco) {       
        if (disco.nombre === buscador) {
            return this;
        } else if (disco.publicacion === buscador) {
            return this;
        } else if (disco.genero === buscador) {
            return this;
        } 
        return 0;
    }
    
    console.log(respuesta);

    let localizacion = discografia.discos.indexOf(respuesta);
    
    if (localizacion != -1){
        return localizacion;
    } else console.log("elemento no encontrado");

}
function PrestarAlbum() {
    const localizacion = BuscadorDisco();

    if (localizacion != null) {
        discografia.BorrarDisco(localizacion);
        CrearAlbumes(discografia);
    }

    console.log(discografia);
}
function OrdenarAlbumes(){
    const atributo = document.getElementById("orden-discos").value;

    if (atributo != "girar") {
        discografia.OrdenarDiscos(atributo);
        
        CrearAlbumes(discografia);
        console.log(discografia);
        
    } else GirarAlbumes();
}
function GirarAlbumes() {
    let contenedor = albumes;

    let discos = contenedor.childNodes;
    let discosArr = [];

    for (const disco of discos) {
        discosArr.push(disco);
    }

    discosArr.sort(function (a, b) {
        return a.innerHTML == b.innerHTML
            ? 0
            : (a.innerHTML > b.innerHTML ? 1 : 1);
    })

    for (i = 0; i < discosArr.length; ++i) {
        contenedor.appendChild(discosArr[i]);
    }
    console.log(discosArr);
}
function CrearAlbumes(discografia) {
    while (albumes.hasChildNodes()) {
        BorrarAlbumes(albumes);
    }

    for (i = 0; i < discografia.discos.length; i++) {
        let album = document.createElement("div");
        album.setAttribute("id", "disco" + [i + 1]);
        album.setAttribute("class", "disco-card");
        
        let img = document.createElement("img");
        img.setAttribute("width", "280px");
        img.src = discografia.discos[i].portada;
        album.appendChild(img);

        let titulo = document.createElement("h3");
        titulo.append(discografia.discos[i].nombre);

        let content = document.createElement("div");
        content.innerHTML = "<p>" + discografia.discos[i].publicacion + "</p>" + "<p>" + discografia.discos[i].genero + "</p>";
        
        album.appendChild(titulo);
        album.appendChild(content);
        document.getElementById("albumes").appendChild(album);
    }
}
function BorrarAlbumes(nodo) {
    nodo.removeChild(nodo.firstChild);
}

// Agregar disco en el DOM
const formAgregar = document.getElementById("agregar-disco");
formAgregar.addEventListener("submit", (e) => {
    e.preventDefault();
    AgregarDisco();
    CrearAlbumes(discografia);
    console.log(discografia);
});

function AgregarDisco() {
    const formDisco = document.getElementById("agregar-disco");
    let nombreDisco = document.getElementById("nombre-album").querySelector("input").value;
    let nombreInterpreteDisco = document.getElementById("nombre-interprete-album").querySelector("input").value;
    let apellidoInterpreteDisco = document.getElementById("apellido-interprete-album").querySelector("input").value;
    let bandaInterpreteDisco = document.getElementById("banda-interprete-album").querySelector("input").value;
    let publicacionDisco = document.getElementById("publicacion-album").querySelector("input").value;
    let generoDisco = document.getElementById("genero-album").querySelector("input").value;
    let portadaDisco = document.getElementById("portada-album").querySelector("input").value;
    let localizacionDisco = document.getElementById("localizacion-album").querySelector("input").value;
    // let prestadoDisco = document.getElementById("prestado-album").querySelector("input").value;

    let nuevoDisco = new Disco();
    let interpreteDisco = new Interprete();

    interpreteDisco = [nombreInterpreteDisco, apellidoInterpreteDisco, bandaInterpreteDisco];
    nuevoDisco.Crear(nombreDisco, interpreteDisco.banda, publicacionDisco, generoDisco, portadaDisco, localizacionDisco);

    discografia.AgregarDisco(nuevoDisco);

}
function CrearAlbumInfo(tempDisco) {
    let infoDiscoDos = tempDisco.Mostar();
    let infoArr = infoDiscoDos.split(",");
    infoArr.splice(4,1);

    let infoDisco = document.createElement("div");
    infoDisco.innerHTML = "<h3>" + infoArr[0] + "</h3>" + "<p><b>Banda:</b> " + infoArr[1] + "</p>"
    + "<p><b>Publicacion:</b> " + infoArr[2] + "</p>" + "<p><b>Género:</b> " + infoArr[3] + "</p>"
    + "<p><b>Localizacion:</b> " + infoArr[4] + "</p>" + "<p><b>Prestado:</b> " + infoArr[5] + "</p>"

    document.getElementById("albumes-info").appendChild(infoDisco);
    
    console.log(infoArr);
}