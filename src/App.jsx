
import style from './App.module.css'
import { useState, useEffect } from 'react'

import Card from './components/Card'


function App() {

  // creo variabile di stato per i politici (cambiano in base alla chiamata fetch)
  const [politici, setPolitici] = useState([]) // array vuoto che si riempirà con risultati chiamata

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

  // stampo lista di politici ricevuta da chiamata fetch con map dntro componente Card
  return (
    <>
      <section>
        <div>
          <h1>Lista di Politici</h1>
          <div className={style.container}>
            {politici &&
              politici.map((p) => {
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
