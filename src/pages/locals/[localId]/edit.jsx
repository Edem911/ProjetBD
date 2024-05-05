import { Button } from "@/components/Button"
import { Form } from "@/components/Form"
import { FormField } from "@/components/FormField"
import { Title } from "@/components/Title"
import axios from "axios"
import { Formik } from "formik"
import { useRouter } from "next/router"
import * as yup from "yup"

export const getServerSideProps = async ({ params: { localId } }) => {
  const { data: local } = await axios(
    `http://localhost:3000/api/locals/${localId}`,
  )

  return {
    props: {
      local,
    },
  }
}
const validationSchema = yup.object({
  TypeDeLieu: yup.string().min(1).required().label("Type de lieu"),
  NomDuLieu: yup.string().min(1).required().label("Nom de lieu"),
  Adresse: yup.string().min(1).required().label("adresse"),
  Ville: yup.string().min(1).required().label("Nom de la ville"),
  CodePostal: yup.string().min(1).required().label("Code postal"),
  Pays: yup.string().min(1).required().label("Pays"),
});
const localEditPage = ({ local }) => {
  const router = useRouter()
  const initialValues = local
  const handleSubmit = async (data) => {
    await axios.patch(`/api/locals/${local._id}`, data)

    router.push("/locals")
  }

  if (!local) {
    return "404 - Not found"
  }

  return (
    <>
      <Title>Editing local #{local._id}</Title>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <Form>
          <FormField name="TypeDeLieu" placeholder="Entrer le type de lieu" />
          <FormField name="NomDuLieu" placeholder="Entrer le nom du lieu" />
          <FormField name="Adresse" placeholder="Entrer l'adresse" />
          <FormField name="Ville" placeholder="Entrer le nom de la ville" />
          <FormField name="CodePostal" placeholder="Entrer le code postal" />
          <FormField name="Pays" placeholder="Entrer le pays" />
          <Button type="submit"className="text-slate-50 bg-slate-950">Envoyer</Button>
        </Form>
      </Formik>
    </>
  )
}

export default localEditPage
