import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import config from "../config.json"
import { getProductDetail, getProductList, searchProduct } from "../api/product/product"
import { ProductCard } from "../component/product/productCard/productCard"
import Layout from "../component/layout/layout"
import { useRouter } from "next/router"
import Modal from "react-modal";
import { useEffect, useState } from "react"
import ProductDetail from "../component/product/productDetail/productDetail"
import { SearchBar } from "../component/product/searchBar/searchBar"

Modal.setAppElement("#__next");

export default function Products(props) {
    const router = useRouter();

    const [product, setProduct] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [displayList, setDisplayList] = useState(props.productList);

    async function getProduct(id) {
        const productDetail = await getProductDetail(id);
        setProduct(productDetail);
    }

    useEffect(() => {
        if (router?.query?.productId) getProduct(router.query.productId);
        else {
            setModalOpen(false)
        };

    }, [router, router.query])

    useEffect(() => {
        if (product && router.query.productId) setModalOpen(true);
        else setModalOpen(false);
    }, [product, router.query]);

    async function handleSearchSubmit(value){
        if(value){
            const productList = await searchProduct(value)
            setDisplayList(productList)
        }else{
            setDisplayList(props.productList)
        }
    }

    return (
        <Layout>
            <div className="container">
                <SearchBar handleSubmit={handleSearchSubmit}/>
            </div>
            <div className="container-fluid">
                <div className="row">
                    {displayList.data.map(product => (
                        <ProductCard currentUrl={router.asPath} product={product} key={product._id} />
                    ))}
                </div>
            </div>

            <Modal isOpen={modalOpen} onRequestClose={() => router.push("/products")}>
                <ProductDetail product={product} />
            </Modal>

        </Layout>

    )
}

export async function getServerSideProps(props) {
    const productList = await getProductList();
    return {
        props: {
            productList
        }
    }
}