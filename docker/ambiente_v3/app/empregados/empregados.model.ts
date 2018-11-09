import * as mongoose from 'mongoose'

export interface Empregado extends mongoose.Document {
  nome: string
}

const empregadoSchema = new mongoose.Schema({
  nome: {
    type: String
  }
})

 export const Empregado = mongoose.model<Empregado>('Empregado', empregadoSchema)
