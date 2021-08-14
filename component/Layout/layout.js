import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";


import logo from "../../public/image/logo.png";

export default function Layout({ children }) {
    const router = useRouter();
    return (
        <div className="m-0 p-0">
            <div className="container-fluid p-1 m-1">

                <Head>
                    <title>Lotus Technology Development</title>
                    <meta name="description" content="Custom web, mobile  and desktop software development" />
                    <link rel="icon" href="/icon.png" />
                </Head>

                <header className="text-center">

                    {router.back && (
                        <button className="btn btn-lg btn-light"  onClick={()=>router.back()}>
                            &#8701; Back
                        </button>
                    )}

                    <Link href="/">
                        <a >
                            <Image priority src={logo} alt="Lotus Technology Development Logo" width={200} height={120} />
                        </a>
                    </Link>
                </header>

                <main>
                    {children}
                </main>

            </div>
            <footer className="p-4 m-0 bg-dark ">
                <div className="text-light text-center">
                    Copyright<sup>&copy;</sup> {new Date().getFullYear()} @ Imtiaz Chowdhury
                </div>
            </footer>
        </div>
    )
}