import Link from "next/link"
import Image from "next/image"
import config from "../../../config.json"
import styles from "./productCard.module.css"

export function ProductCard({ product, currentUrl }) {
    return (

        <div className="col-6 col-md-3">
            <Link href={`${currentUrl}?productId=${product._id}`} as={`/products/${product._id}`}>
                <a>
                    <div className="border rounded rounded-sm col-12 m-2 p-2 ">
                        <div className={`${styles.image} p-1`}>
                            <Image
                                src={product.cover}
                                loader={(params) => `${config.baseUrl}/api/image/serve/${params.src}?width=400`}
                                layout="fill" />
                        </div>
                        <div className="text-center font-weight-bold text-info">
                                {product.title}
                        </div>
                    </div>
                </a>
            </Link>
        </div>
    )
}