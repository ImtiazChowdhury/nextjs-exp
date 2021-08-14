import Link from "next/link"
import styles from "./tiles.module.css"

export default function Tiles(props) {
    return (
        <Link href={props.href}>
            <a className="lead font-weight-bold">
                <div className={`${styles.tiles} shadow-sm border rounded rounded-sm alert-light d-inline-block col-3 p-5 m-2 text-center text-dark`}>
                    {props.children}
                </div>
            </a>
        </Link>
    )
}