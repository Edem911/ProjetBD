import { Schema } from "mongoose"

export const localSchema = new Schema({
  TypeDeLieu:String,
  NomDuLieu:String,
  Adresse:String,
  Ville:String,
  CodePostal:String,
  Pays:String,
})
