class Disco
{
    nombre;
    interprete;
    publicacion;
    genero;
    portada;
    #localizacion;
    #prestado;

    constructor()
    {
        this.nombre = "";
        //this.interprete = "";
        this.publicacion = "";
        this.genero = "";
        this.portada = "";
        this.#localizacion = 0;
        this.#prestado = false;
    }

    Crear(nombre, interprete, publicacion, genero, portada, localizacion)
    {
        this.nombre = nombre;
        this.interprete = interprete;
        this.publicacion = publicacion;
        this.genero = genero;
        this.portada = portada;
        this.#localizacion = localizacion;
        this.#prestado = false;
    }

    Mostar()
    {
        let contenido = `${this.nombre},${this.interprete},${this.publicacion},${this.genero},${this.portada},${this.#localizacion},${this.#prestado}`;
        return contenido;
    }
}