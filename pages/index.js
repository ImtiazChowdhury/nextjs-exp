import Head from "next/head"
import Link from "next/link"
import Layout from "../component/layout/layout"
import Tiles from "../component/ui/tiles"

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Lotus Technology Development</title>
      </Head>
      <main>
        <Tiles href="/products">PRODUCTS</Tiles>      
        <Tiles href="/posts">POSTS</Tiles>      
      </main>
    </Layout>
  )
}

