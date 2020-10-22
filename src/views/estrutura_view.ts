import Estrutura from '../models/Estrutura';
import ImagesView from './images_view';
export default{
 
    render(estrutura:Estrutura){
        return{
            id: estrutura.id,
            name: estrutura.name,
            latitude: estrutura.latitude,
            longitude: estrutura.longitude,
            about: estrutura.about,
            instructions: estrutura.instructions,
            opening_hours: estrutura.opening_hours,
            open_on_weekends: estrutura.open_on_weekends,
            images:ImagesView.renderMany(estrutura.images),
        };
    },
    
  renderMany(estruturas:Estrutura[]){
     return estruturas.map(estrutura => this.render(estrutura))
  }
    

};