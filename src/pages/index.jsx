import Link from "next/link"

const HomePage = () => (
  <div>
    <h1 className="text-4xl">Explorez le monde avec SEYAHAT et laissez-vous emporter par des aventures inoubliables.</h1>
    <br/>
    <h2 className="text-3xl">Bienvenue sur notre site de voyage, où chaque destination est une invitation à l'émerveillement.</h2>
    <br/>
    <ul>
      <li>
        <h3 className="texte-2xl">Cliquer sur le bouton suivant pour avoir accès à la liste des voyages disponibles : <button onClick={() => { window.location.href = "/locals"; }}className="text-slate-50 bg-slate-950">Liste</button></h3>
        
      </li>
    </ul>
  </div>
)

export default HomePage
