import { createRoute } from "@/api/createRoute"
import { localModel } from "@/db/models/localModel"

const handle = createRoute(async (req, res) => {
  const { localId } = req.query
  const local = await localModel.findById(localId)

  if (!local) {
    res.status(404).send({ error: "Not found" })

    return
  }

  if (req.method === "GET") {
    res.send(local)

    return
  }

  if (req.method === "PATCH") {
    const { TypeDeLieu, NomDuLieu, Adresse, Ville, CodePostal, Pays} = req.body

    local.TypeDeLieu = TypeDeLieu || local.TypeDeLieu
    local.NomDuLieu = NomDuLieu || local.NomDuLieu
    local.Adresse = Adresse || local.Adresse
    local.Ville = Ville || local.Ville
    local.CodePostal = CodePostal || local.CodePostal
    local.Pays = Pays || local.Pays
    await local.save()

    res.send(local)

    return
  }

  if (req.method === "DELETE") {
    await localModel.deleteOne({ _id: localId })

    res.send(local)

    return
  }

  res.status(404).send({ error: "Not found" })
})

export default handle
