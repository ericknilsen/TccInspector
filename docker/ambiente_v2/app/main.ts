import {Server} from './server/server'
import {empregadosRouter} from './empregados/empregados.router'

const server = new Server()
server.bootstrap([empregadosRouter]).then(server=>{
  console.log('Server is listening on:', server.application.address())
}).catch(error=>{
  console.log('Server failed to start')
  console.error(error)
  process.exit(1)
})
