import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export default function App() {

    const [provas, setProvas] = useState([])

    async function buscarProvas() {
        const respostaProvas = await fetch (
            'https://api.enem.dev/v1/exams'
        )
        const dadosProvas = await respostaProvas.json()
        setProvas(dadosProvas)
    }

    useEffect(() => {
        buscarProvas()
    }, [])

    return (
    <div className="container">
        <h1 className="titulo">📚 App ENEM</h1>

        <div className="lista-provas">
            {provas.map((prova, i) => {
                return (
                    <div className="card-prova" key={i}>
                        <h2>{prova.title}</h2>

                        <Link
                            className="botao"
                            to={`prova/${prova.year}`}
                        >
                            Acessar Prova
                        </Link>
                    </div>
                )
            })}
        </div>
    </div>
)
}