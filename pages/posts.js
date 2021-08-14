import Head from "next/head";
import { getPostList } from "../api/posts/post";
import Layout from "../component/layout/layout";
import Link from "next/link"

export default function Posts(props) {
    return (
        <Layout>
            <Head>
                <title>Posts - Lotus Technology Development</title>
            </Head>
            <main>
                {props.postList.map(post => (
                    <div className="border m-1 mt-2 p-2 bg-light" key={post.id}>
                        <Link href={`/posts/${post.id}`}>
                            <a>
                                <div className="font-weight-bold text-primary">{post.id}| {post.title}</div>
                            </a>
                        </Link>
                    </div>
                ))}
            </main>
        </Layout>
    )
}


export async function getStaticProps() {
    const postList = await getPostList();
    return {
        props: {
            postList
        }
    }
}

