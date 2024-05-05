import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { FormField } from "@/components/FormField";
import { Title } from "@/components/Title";
import axios from "axios";
import { Formik } from "formik";
import * as yup from "yup";

const initialValues = {
  TypeDeLieu: "",
  NomDuLieu: "",
  Adresse: "",
  Ville: "",
  CodePostal: "",
  Pays: "",
};
const validationSchema = yup.object({
  TypeDeLieu: yup.string().min(1).required("Veuillez séléctionner le type de lieu").label("Type de lieu"),
  NomDuLieu: yup.string().min(1).required("Veuillez entrer le nom du lieu").label("Nom de lieu"),
  Adresse: yup.string().min(1).required("Veuillez entrer l'adresse").label("adresse"),
  Ville: yup.string().min(1).required("Veuillez entrer le nom de la ville").label("Nom de la ville"),
  CodePostal: yup.string().min(1).required("Veuillez entrer le code postal").label("Code postal"),
  Pays: yup.string().min(1).required("Veuillez entrer le nom du pays").label("Pays"),
});
const LocalCreatePage = () => {
  const handleSubmit = async (values, { resetForm }) => {
    await axios.post("/api/locals", values);

    resetForm();
  };

  return (
    <>
      <Title>Formulaire d'ajout</Title>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <Form>
          <FormField name="TypeDeLieu" placeholder="Entrer le type de lieu" as="select">
          <option value="Restaurant">Restaurant</option>
          <option value="Musée">Musée</option>
          <option value="Bar">Bar</option>
          <option value="Parc">Parc</option>
          </FormField>
          <FormField name="NomDuLieu" placeholder="Entrer le nom du lieu" />
          <FormField name="Adresse" placeholder="Entrer l'adresse" />
          <FormField name="Ville" placeholder="Entrer le nom de la ville" />
          <FormField name="CodePostal" placeholder="Entrer le code postal" />
          <FormField name="Pays" placeholder="Entrer le pays" />
          <Button type="submit"className="text-slate-50 bg-slate-950">SUBMIT</Button>
        </Form>
      </Formik>
    </>
  );
};

export default LocalCreatePage;