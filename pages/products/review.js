import { useRouter } from "next/router";
import Layout from "../../component/layout/layout";
// import { getProductDetail } from "../../../../api/product/product";

export default function Product({}){
    const router = useRouter();

    return(
        <Layout back={router.back}>
            review
        </Layout>
    )
}
