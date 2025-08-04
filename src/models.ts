import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

// no modificar estas propiedades, agregar todas las que quieras

class Peli { // Creamos la clase Peli que nos permitira saber la forma del objeto
  id: number;
  title: string;
  director: string;
  year: number;
  tags: string[];
  synopsis: string;
  duration_minutes: number;
}

type SearchOptions = { title?: string; tag?: string };

class PelisCollection { // Creamos la clase PelisCollection que nos mostrara la colleccion de peliculas
  async getAll(): Promise<Peli[]> { // Creamos el metodo getAll que nos dara todas las peliculas y retornara una promesa con un array de Peli. Este metodo es async
    return jsonfile.readFile("./pelis.json"); // Y retorna la lectura del json de manera asincrona. No es necesario usar await
  };

  async getById(id: number): Promise<Peli | boolean>{ // Creamos el metodo getById que recibe un parametro id de tipo number y retorna una promesa con una Peli o un string 
    const pelis = await this.getAll(); // Guardamos la espera de obtener todas las pelis 
    const findPeli = pelis.find(p => p.id === id); // Hacemos un find de pelis y lo guardamos en la variable findPeli

    // Si peliEncontrada no es un falsy, retorna el objeto encontrado. Caso contrario, retorna un mensaje como fallback
    return findPeli ? findPeli : false;
  }

  async add(peli: Peli): Promise<boolean> { // Creamos el metodo asincrono para agregar peliculas que recibe un parametro peli de tipo Peli y retorna una promesa de tipo boolean
    const findPeli = await this.getById(peli.id); // Esperamos a que la funcion busque el elemento por id

    if(findPeli){ // Si getById retorna un truthy
      console.log(`MENSAJE DESDE EL MODELS: La peli con id ${peli.id} ya existe`);
      return false; // Retorna false
    } else { // En caso contrario
      const data = { // Asignamos los valores al objeto literal
        id: peli.id,
        title: peli.title,
        director: peli.director,
        year: peli.year,
        tags: peli.tags,
        synopsis: peli.synopsis,
        duration_minutes: peli.duration_minutes
      }

      const pelis = await this.getAll(); // Obtenemos todo el array de peliculas y lo guardamos en una variable
      pelis.push(data); // Pusheamos la data al array de peliculas

      await jsonfile.writeFile("./pelis.json", pelis); // Esperamos que jsonfile haga el write en pelis.json de las pelis (ya hecho string)

      console.log(`MENSAJE DESDE EL MODELS: La peli con id ${peli.id} y titulo ${peli.title} fue agregada exitosamente`); // Mensaje solo para verificar
      return true; // Retornamos true
    }
  }

  async search(options: SearchOptions): Promise<Peli[]>{ // Creamos el metodo asincrono que recibe unas opciones del tipo SearchOptions y retorna una promesa con un array de Peli
    const list = await this.getAll(); // Obtenemos toda la lista de pelis

    const filteredList = list.filter(p => { // Creamos una variable filteredList para copiar el filtro de la lista filtrada
      let check = false; // Creamos una flag que valida cambia si se cumple con un filtro

      if(options.title){
        // Se debe hacer el find y cambiar el flag a true en caso de que sea verdadero. No estoy seguro de si se puede agregar el valor. En plan. Flag = valor del find
      }

      if(options.tag){
        // Se debe hacer el find y cambiar el flag a true en caso de que sea verdadero. No estoy seguro de si se puede agregar el valor. En plan. Flag = valor del find
      }
    })


    return
  }
}

async function main(){

  const peli = new PelisCollection

  console.log("Prueba de obtener todas las pelis: ------------------------------------------");
  const displayTodasPelis = await peli.getAll();
  console.table(displayTodasPelis);

  console.log("Prueba de peli por id: ------------------------------------------");
  const peliPorId = await peli.getById(1);
  console.table(peliPorId);

  console.log("Prueba de agregar peli: ------------------------------------------");
  const peliMal = await peli.add({id: 1, title: "Hola", director: "Hola", year: 1, tags: ["Hola", "Que", "Tal"], synopsis: "Si", duration_minutes: 12})
  console.log(peliMal)
  const peliBien = await peli.add({id: 100, title: "Hola", director: "Hola", year: 1, tags: ["Hola", "Que", "Tal"], synopsis: "Si", duration_minutes: 12})
  console.log(peliBien);

  console.log("Prueba de buscar peli: ------------------------------------------");

}

main()

export { PelisCollection, Peli };