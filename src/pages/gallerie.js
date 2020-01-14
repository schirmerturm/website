import React, { useState } from "react"
import Layout from "../components/layout"
import useGalleryAuth from "../hooks/use-gallery-auth"
import galleryStyles from "./gallerie.module.css"

export default () => {
  const [loading, error, tryAuth, galleries] = useGalleryAuth()
  const [password, setPassword] = useState("")

  if (loading) {
    return (
      <Layout>
        <h1>Gallerie</h1>
        <div>Loading...</div>
      </Layout>
    )
  }

  return (
    <Layout>
      {error != null && <div className={galleryStyles.errorBox}>{error}</div>}
      <h1>Gallerie</h1>
      {galleries != null && (
        <div>
          <h3>Links:</h3>
           <p>
            Hast du Lust wieder einmal in einmaligen Pfadi-Erinnerungen zu schwelgen 
            oder suchst du ein cooles Pfadifoto von dir? So bist du hier genau richtig!
            Auf dieser Seite hast du als Teilnehmer Einblick in ein umfangreiches Fotoarchiv 
            und weiter spannende Erinnerungen der Abteilung Schirmerturm.
          </p>
          <p>
            Wichtig: Es kann gut sein, dass die Videos und Diashows nicht online angeschaut 
            werden können. Dann müsst ihr die Filme herunterladen. Dazu im Google Photos Ordner 
            oben links auf die 3 Punkte klicken (Weitere Optionen) und dann "Alles Herunterladen". 
          </p>
          {galleries.map(gallery => (
            <div key={gallery.link}>
              <a href={gallery.link}>{gallery.title}</a>
            </div>
          ))}
        </div>
      )}
      {galleries == null && (
        <div>
          <p>Diese Seite ist Passwortgeschützt</p>
          <input
            className={galleryStyles.passwordBox}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyUp={e => {
              if (e.keyCode == 13) {
                tryAuth(password)
              }
            }}
          />
          <button
            className={galleryStyles.submitButton}
            onClick={() => tryAuth(password)}
          >
            Absenden
          </button>
        </div>
      )}
    </Layout>
  )
}
