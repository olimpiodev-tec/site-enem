import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import "./prova.css"

export default function Prova() {

    const { id } = useParams()
    const [questao, setQuestao] = useState(null)
    const [questaoIndex, setQuestaoIndex] = useState(1)

    async function buscarQuestao() {
        const respostaQuestao = await fetch(
            `https://api.enem.dev/v1/exams/${id}/questions/${questaoIndex}`
        )
        const dadosQuestao = await respostaQuestao.json()
        setQuestao(dadosQuestao)
    }

    function avancar() {
        if (questaoIndex === 180) {
            alert('Não é possível avançar 😒')
        } else {
            setQuestaoIndex(questaoIndex + 1)
        }
    }

    function voltar() {
        if (questaoIndex === 1) {
            alert('Não é possível voltar 😒')
        } else {
            setQuestaoIndex(questaoIndex - 1)
        }
    }

    function verResposta(questao) {
        alert(`Resposta Correta: ${questao.correctAlternative}`)
    }

    useEffect(() => {
        buscarQuestao()
    }, [questaoIndex])

    return (
        questao ?
            <div className="prova-container">

                <div className="questao-card">

                    <div className="questao-numero">
                        Questão {questaoIndex} / 180
                    </div>

                    <h1 className="questao-titulo">
                        {questao.title}
                    </h1>

                    <p className="questao-contexto">
                        {questao.context}
                    </p>

                    <div className="questao-introducao">
                        {questao.alternativesIntroduction}
                    </div>

                    <ol className="alternativas" type="A">
                        {questao.alternatives.map((alt, i) => {
                            return (
                                <li key={i}>
                                    {alt.text}
                                </li>
                            )
                        })}
                    </ol>

                    <div className="botoes">

                        <button
                            className="botao botao-resposta"
                            onClick={() => verResposta(questao)}
                        >
                            Ver Resposta
                        </button>

                        <button
                            className="botao botao-avancar"
                            onClick={avancar}
                        >
                            Próxima Questão →
                        </button>

                        <button
                            className="botao botao-voltar"
                            onClick={voltar}
                        >
                            ← Questão Anterior
                        </button>

                    </div>

                </div>

            </div>
            : null
    )
}