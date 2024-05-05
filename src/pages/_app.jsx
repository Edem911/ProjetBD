import "@/styles/globals.css"
import Link from "next/link"

const App = ({ Component, pageProps }) => (
  <main>
    <header className="border-b-2 border-stone-200 bg-slate-950">
      <div className="max-w-2xl mx-auto p-4 flex justify-between items-center">
        <img src="/logo.PNG" alt="Logo" className="h-8" />
        
        <Link href="/" className="text-2xl font-bold text-slate-50">
          SEYAHAT
        </Link>
        <nav>
          <ul className="flex gap-4">
            <li>
              <Link href="/locals/create" className="text-slate-50">
                Ajouter
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    <section>
      <div className="max-w-6xl mx-auto p-4">
        <Component {...pageProps} />
      </div>
    </section>
  </main>
)

export default App