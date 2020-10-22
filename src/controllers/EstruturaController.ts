import {Request,Response} from 'express';
import  {getRepository} from 'typeorm';
import estruturaView from '../views/estrutura_view';
import * as Yup from 'yup';

import Estrutura from '../models/Estrutura';

export default{
    
    async index(request:Request,response:Response){
        const estruturaRepository = getRepository(Estrutura);

        const estruturas = await estruturaRepository.find({
            relations:['images']
        });
        return response.json(estruturaView.renderMany(estruturas));
    },
    async show(request:Request,response:Response){
        const {id}  = request.params;
        const estruturaRepository = getRepository(Estrutura);

        const estrutura = await estruturaRepository.findOneOrFail(id,{
            relations:['images']
        });
        return response.json(estruturaView.render(estrutura));
    },



    async create(request:Request,response:Response){
      //  console.log(request.file);
        const{
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
      
         } = request.body
      
         const estruturaRepository = getRepository(Estrutura);
         
         const requestImages = request.files as Express.Multer.File[];
     
         const images = requestImages.map(image=>{
             return {path:image.filename}
         })

         const data ={
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
      
         };

         const schme = Yup.object().shape({
            name: Yup.string().required(),
            latitude:Yup.number().required(),
            longitude:Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(Yup.object().shape({
                path:Yup.string().required()
            })
           )
         });

         await schme.validate(data,{
             abortEarly:false,
         });

         //pre cria
         const estrutura = estruturaRepository.create(data);
         //salva no bsd
      
        await estruturaRepository.save(estrutura);
      
      
         return response.status(201).json(estrutura);
    }

};