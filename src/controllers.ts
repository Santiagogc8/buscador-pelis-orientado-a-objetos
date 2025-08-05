import { title } from "process";
import { PelisCollection, Peli } from "./models";

type Options = { // Creamos un type de options
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController { // Creamos la clase PelisController
  model: PelisCollection; // Creamos sus propiedades
  constructor() { // Iniciamos el constructor
    this.model = new PelisCollection(); // E instanciamos la clase en el model
  }

  async get(options?: Options): Promise<Peli[]>{ // Creamos el metodo asincrono que puede recibir un parametro options o no. Retorna una promesa con un array de peli

    const list = await this.model.getAll(); // Esperamos la lista de todas las peliculas

    if(options?.id){ // Si options.id tiene un valor
      const peli = await this.model.getById(options.id); // Hace un getById asincrono de options.id
      return peli ? [peli] : []; // Si peli retorna truthy, devuelve el array con la pelicula. Caso contrario, devuelve un array vacio
    };

    if(options?.search){ // Si options trae un search
      if(options.search.title){ // Valida si trae solo un title
        return this.model.search({title: options.search.title}); // Y retorna el metodo search del model con el title como parametro
      }

      if(options.search.tag){ // Si por otro lado, solo trae una tag
        return this.model.search({tag: options.search.tag}); // Retorna el search de la tag
      }

      if(options.search.title && options.search.tag){ // Y si trae el title y la tag
        return this.model.search({title: options.search.title, tag: options.search.tag}); // Retorna el search de title y tags
      }
    }
    
    return list;
  }

  async getOne(){

  }
}
export { PelisController };
