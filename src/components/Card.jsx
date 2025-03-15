import style from './Card.module.css'

export default function Card({ data }) { // passo come prop data, che è il risultato della chiamata fetch

    const { name, image, position, biography } = data // raccolgo elementi che mi servono in data (passata come prop)

    return (
        <div className={style.container}>
            <div className={style.raw}>
                <div className={style.col}>
                    <img src={image} alt="" />
                    <h3 className={style.name}>{name}</h3>
                    <strong className={style.position}>{position}</strong>
                    <p className={style.bio}>{biography}</p>
                </div>
            </div>
        </div>
    )
}