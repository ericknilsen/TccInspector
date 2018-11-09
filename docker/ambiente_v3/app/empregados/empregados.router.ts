import {Router} from '../common/router'
import * as restify from 'restify'
import {Empregado} from './empregados.model'

class EmpregadosRouter extends Router {

  constructor(){
    super()
    this.on('beforeRender', document=>{
      document.password = undefined
      //delete document.password
    })
  }

  applyRoutes(application: restify.Server){

    application.get('/empregados', (req, resp, next)=>{
      Empregado.find().then(this.render(resp,next))
    })

    application.get('/empregados/:id', (req, resp, next)=>{
      Empregado.findById(req.params.id)
          .then(this.render(resp, next))
    })

    application.post('/empregados', (req, resp, next)=>{
      let empregado = new Empregado(req.body)
      empregado.save().then(this.render(resp, next))
    })

    application.put('/empregados/:id', (req, resp, next)=>{
      const options = {overwrite: true}
      Empregado.update({_id: req.params.id}, req.body, options)
          .exec().then(result=>{
        if(result.n){
          return Empregado.findById(req.params.id).exec()
        } else{
          resp.send(404)
        }
      }).then(this.render(resp, next))
    })

    application.patch('/empregados/:id', (req, resp, next)=>{
      const options = {new : true}
      Empregado.findByIdAndUpdate(req.params.id, req.body, options)
          .then(this.render(resp, next))
    })

    application.del('/empregados/:id', (req, resp, next)=>{
      Empregado.remove({_id:req.params.id}).exec().then((cmdResult: any)=>{
        if(cmdResult.result.n){
          resp.send(204)
        }else{
          resp.send(404)
        }
        return next()
      })
    })

  }
}

export const empregadosRouter = new EmpregadosRouter()
