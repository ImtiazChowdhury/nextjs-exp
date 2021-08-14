import config from "../../../config.json";
import Image from "next/image";

export default function ProductDetail({product}){
    return(
        <div className="text-center container">

                {product.image?.map(image => (
                    <Image src={`${config.baseUrl}/api/image/serve/${image}`} width={200} height={200} />
                ))}

                <div className="font-weight-bold text-primary">{product.title}</div>
                <div className="lead mt-2 text-success font-weight-bold">$ {product.defaultVariation.price.regular}</div>
                <div className="d-flex justify-content-between">
                    <div className="text-dark border m-1 p-1">
                        Category: {product.category?.map(cat=>cat.title)}
                    </div>
                    <div className="text-dark border m-1 p-1">
                        Brand: {product.brand?.title}
                    </div>
                </div>

                <div className="mt-4 p-1 border">
                    <h4 className="m-2">Overview</h4>
                    <div className="text-dark" dangerouslySetInnerHTML={{__html: product.shortDescription}}></div>
                </div>

                <div className="mt-4 p-1 border">
                    <h4 className="m-2">Description</h4>
                    <div className="text-dark" dangerouslySetInnerHTML={{__html: product.description}}></div>
                </div>
            </div>
    )
}