import { useRouter } from "next/router";
import Head from "next/head";
import { getPostData, getPostList } from "../../api/posts/post";
import Layout from "../../component/layout/layout";

export default function Post(props) {

    const router = useRouter();

    return(
        <Layout>
            <Head>
                <title>{props.postData?.title}</title>
            </Head>

            <main>
                <div className="m-2 p-2 container">
                    <h3 className="text-primary mb-2">{props.postData?.title}</h3>
                    <p className="text-dark">{props.postData?.body}</p>
                </div>

                {router.isFallback && (
                    <div className="alert-info m-5 p-5">
                        <div className="text-center lead">Loading from fallback</div>
                    </div>
                )}
            </main>
        </Layout>
    )
}

export async function getStaticProps(props) {
    const postData = await getPostData(props.params.id);

    if(!Object.keys(postData).length) return {redirect: {destination: "/posts", permanent: false}}

    return {
        props: {
            postData
        }
    }
}


export async function getStaticPaths() {
    const postList = await getPostList();
    postList.length = 10
    const paths = postList.map(post => ({params:{id:String(post.id) }}))
    return {
        paths,        
        fallback: true
    }
}