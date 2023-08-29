import { useEffect, useState } from "react"
import { useData } from "../../contexts/DataContext"
import { getMonth } from "../../helpers/Date"

import "./style.scss"

const Slider = () => {
  const { data } = useData()
  const [index, setIndex] = useState(0)
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    // Correction de l'ordre des slides
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  )
  const nextCard = () => {
    // Vérification de récupération des données
    if (data && data.focus && byDateDesc.length > 0) {
      setIndex(index < byDateDesc.length - 1 ? index + 1 : 0)
    }
  }
  useEffect(() => {
    // Composant rendu toute 5sec et/ou au changement des dépendances, et nettoyé
    const timer = setTimeout(nextCard, 5000)
    return () => clearTimeout(timer)
  }, [index, byDateDesc])

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // Ajout Key pour l'élément créé avec map
        <div key={event.title}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}>
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  // Correction de la valeur de la key : pas d'id dans le tableau de focus
                  key={`${radioIdx * 1}`}
                  type="radio"
                  name="radio-button"
                  // Correction de la comparaison : valeur de l'index du State au lieu du tableau byDateDesc
                  defaultChecked={index === radioIdx}
                  onChange={() => setIndex(radioIdx)}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Slider
