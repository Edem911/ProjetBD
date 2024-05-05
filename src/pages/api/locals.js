import { createRoute } from "@/api/createRoute"
import { localModel } from "@/db/models/localModel"

const handle = createRoute(async (req, res) => {
  if (req.method === "POST") {
    const newlocal = new localModel(req.body)
    await newlocal.save()
    res.send(newlocal)
    return
  }

  if (req.method === "GET") {
    const locals = await localModel.find()

    res.send(locals)

    return
  }

  res.status(404).send({ error: "Not found" })
})

export default handle