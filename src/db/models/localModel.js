import mongoose from "mongoose"
import { localSchema } from "../schemas/localSchema.js"

export const localModel =
  mongoose.models.local || mongoose.model("local", localSchema)
