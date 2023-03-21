// Método que añade un disco.
// Método que borra disco.
// Método ordena los discos según el atributo recibido en parámetro.
// Método que devuelva toda la discografía con todos los atributos menos la carátula del disco.
// (funcion)

class Discografia {
    discos = [];

    AgregarDisco(disco) {
        this.discos.push(disco);
    }

    BorrarDisco(localizacion) {
        this.discos.splice(localizacion, 1);
        return this.discos;
    }
    OrdenarDiscos(atributo) {
        this.discos.sort((a, b) => {
            if (a[atributo] < b[atributo]) {
                return -1;
            }
            if (a[atributo] > b[atributo]) {
                return 1;
            } else return 0;
        });

        return this.discos;
    }
    InfoDiscos(localizacion) {
        let contenido;

        for (i = 0; i < this.discos.length; i++) {
            if (i == localizacion) {
                contenido = this.discos[i];
            }
        }
        return contenido;
    }
}