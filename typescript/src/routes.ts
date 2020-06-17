import {Request, Response} from 'express';

import createUser from './services/CreateUser';

export function helloWorld(request: Request ,response : Response)  {
  const user = createUser(
   {
     email: 'joaopfg.2002@gmail.com',
     password: '12345',
     techs: [
        'NodeJS',
        'ReactJs', 
        'React-Native',
        {title: "PHP" , experience: 100}
             ]
   }
  )

  return response.json({message: "Hello World"});
}
