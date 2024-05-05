import { Button } from "@/components/Button"
import axios from "axios"
import clsx from "clsx"
import Link from "next/link"
import { useState } from "react"

export const getServerSideProps = async () => {
  const { data: locals } = await axios("http://localhost:3000/api/locals")

  return {
    props: {
      locals,
    },
  }
}

const TableCell = ({ className, ...otherProps }) => (
  <td className={clsx("p-3", className)} {...otherProps} />
)

const Filter = ({ initialValues, handleChange }) => {
  return (
    <div className="mb-4">
      <input type="text" placeholder="Filter par type de lieu" value={initialValues.TypeDeLieu} onChange={handleChange('TypeDeLieu')} className="border p-2 rounded-md mb-2 block" />
      <input type="text" placeholder="Filter par nom du lieu" value={initialValues.NomDuLieu} onChange={handleChange('NomDuLieu')} className="border p-2 rounded-md mb-2 block" />
      <input type="text" placeholder="Filter par adresse" value={initialValues.Adresse} onChange={handleChange('Adresse')} className="border p-2 rounded-md mb-2 block" />
      <input type="text" placeholder="Filter par ville" value={initialValues.Ville} onChange={handleChange('Ville')} className="border p-2 rounded-md mb-2 block" />
      <input type="text" placeholder="Filter par code postal" value={initialValues.CodePostal} onChange={handleChange('CodePostal')} className="border p-2 rounded-md mb-2 block" />
      <input type="text" placeholder="Filter par pays" value={initialValues.Pays} onChange={handleChange('Pays')} className="border p-2 rounded-md mb-2 block" />
    </div>
  )
}

const LocalsPage = ({ locals: initialLocals }) => {
  const [locals, setLocals] = useState(initialLocals)
  const [toBeDeletedId, setToBeDeletedId] = useState(null)
  const [filterValues, setFilterValues] = useState({
    TypeDeLieu: "",
    NomDuLieu: "",
    Adresse: "",
    Ville: "",
    CodePostal: "",
    Pays: "",
  })

  const handleDelete = (id) => async () => {
    setToBeDeletedId(id)
    await axios.delete(`/api/locals/${id}`)
    setLocals(locals.filter((local) => local._id !== id))
  }

  const handleChange = (field) => (event) => {
    setFilterValues({
      ...filterValues,
      [field]: event.target.value,
    })
  }

  const filteredLocals = locals.filter(local => {
    return Object.keys(filterValues).every(key => {
      if (!filterValues[key]) return true;
      return local[key].toLowerCase().includes(filterValues[key].toLowerCase())
    })
  })

  return (
    <div className="flex">
      <div className="mr-8">
        <Filter initialValues={filterValues} handleChange={handleChange} />
      </div>
      <div>
        <table className="w-full">
          <tbody>
            {filteredLocals.map((local) => (
              <tr
                key={local._id}
                className={clsx(
                  "odd:bg-slate-100 duration-500 transition-opacity ",
                  {
                    "opacity-40": local._id === toBeDeletedId,
                  },
                )}
              >
                <TableCell>{local.TypeDeLieu}</TableCell>
                <TableCell>{local.NomDuLieu}</TableCell>
                <TableCell>{local.Adresse}</TableCell>
                <TableCell>{local.Ville}</TableCell>
                <TableCell>{local.CodePostal}</TableCell>
                <TableCell>{local.Pays}</TableCell>
                <TableCell className="w-full">{local.description}</TableCell>
                <TableCell>
                  <Button
                    disabled={local._id === toBeDeletedId}
                    onClick={handleDelete(local._id)}
                    className="text-slate-50 bg-slate-950"
                  >
                    Supprimer
                  </Button>
                </TableCell>
                <TableCell>
                  <Link href={`/locals/${local._id}/edit`}>Modifier</Link>
                </TableCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LocalsPage
