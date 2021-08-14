import { useRouter } from "next/router";
import { getProductDetail } from "../../api/product/product";
import Layout from "../../component/layout/layout";
import ProductDetail from "../../component/product/productDetail/productDetail";

export default function Product({ product }) {

    return (
        <Layout >
            <ProductDetail product={product}/>
        </Layout>
    )
}

export async function getServerSideProps(props) {
    const product = await getProductDetail(props.params.id[props.params.id.length - 1]);

    return {
        props: {
            product
        }
    }
}