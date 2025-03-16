
import style from './App.module.css'
import { useState, useEffect, useMemo } from 'react'

import Card from './components/Card'


function App() {

  // creo variabile di stato per i politici (cambiano in base alla chiamata fetch)
  const [politici, setPolitici] = useState([]) // array vuoto che si riempirà con risultati chiamata

  // creo variabile di stato per ricerca politico tramite filtro
  const [searchPol, setSearchPol] = useState('')

  // creo variabile per chiamata fetch (raccolgo la response e la stampo in data)
  const fetchPolitici = async () => {
    try {
      const response = await fetch('https://boolean-spec-frontend.vercel.app/freetestapi/politicians')
      const data = await response.json()
      setPolitici(data) //passo alla variabile di stato data, che contiene risposta json della chiamata fetch
    } catch (error) {
      console.error('Errore:', error)
    }
  }

  // uso useEffect per non creare chiamate infinite
  useEffect(() => {
    fetchPolitici()
  }, [])

  // creo filtro con useMemo
  const filtroPolitici = useMemo(() => {
    return politici.filter(politico => {
      const nomePol = politico.name.toLowerCase().includes(searchPol.toLowerCase())
      const descrizionePol = politico.biography.toLowerCase().includes(searchPol.toLowerCase())
      return nomePol || descrizionePol
    })
  }, [politici, searchPol])

  // stampo lista di politici ricevuta da chiamata fetch con map dntro componente Card
  return (
    <>
      <section>
        <div>
          <h1>Lista di Politici</h1>
          <div>
            <input
              type="text"
              placeholder='Cerca per nome o biografia'
              value={searchPol}
              onChange={e => setSearchPol(e.target.value)} />
          </div>
          <div className={style.container}>
            {
              filtroPolitici.map((p) => {
                return <Card key={p.id} data={p} />
              })
            }
          </div>
        </div>
      </section>
    </>
  )
}

export default App
