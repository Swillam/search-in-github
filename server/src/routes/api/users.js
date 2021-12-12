import { Router } from "express";
import { PrismaClient } from '@prisma/client'
import { get } from 'axios'

const api = Router();

api.get("/:username", async (request, response) => {
  const { username } = request.params;
  const prisma = new PrismaClient()
  
  var user = await prisma.github_user.findFirst({
    where: {
      login:username
    }
  })
  if (!user) {
    try {
      const resp = await get(`https://api.github.com/users/${username}`)
      const newUser = resp.data
      user = {
        id: newUser.id,
          login:  newUser.login,      
          avatar_url  : newUser.avatar_url, 
          type: newUser.type,
          name : newUser.name,
          company  : newUser.company,
          blog: newUser.blog,      
          location: newUser.location,
          email: newUser.email,       
          bio: newUser.bio,
          twitter_username: newUser.twitter_username,
          public_repos:newUser.public_repos,
          public_gists: newUser.public_gists,
          followers: newUser.followers,
          following: newUser.following,
          created_at: newUser.created_at,
          updated_at: newUser.updated_at
      }
      const id = await prisma.github_user.findUnique({
        where: {
          id: user.id,
        }
      })
      if (!id){
        await prisma.github_user.create({
          data: user
        })
      }
      
    }
    catch (err) {
      if (err.response && err.response.status == 400) {
        user = { 
          'Error' : 'Une erreur est survenue',
          'ErrorMessage' : 'Veuillez réssayer plus tard'
        }
      }
      if (err.response && err.response.status == 404) {
        user = { 
          'Error' : 'Une erreur est survenue',
          'ErrorMessage' : 'Utilisateur non trouvé'
        }
      }
      else{
        user = { 
          'Error' : 'Une erreur est survenue',
          'ErrorMessage' : err.message
        }
      }
      
      
    }
  }
  response.json(user);
});

export default api;
