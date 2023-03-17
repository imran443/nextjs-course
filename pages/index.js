import Head from "next/head";
import { Fragment } from "react";
import FeaturedPosts from "../components/home-page/featured-posts";
import Hero from "../components/home-page/hero";
import { getFeaturedPosts } from "../lib/posts-util";

export default function HomePage(props) {
    return (
        <Fragment>
            <Head>
                <title>Imran's blog</title>
                <meta
                    name="description"
                    content="I post about programming and web development"
                ></meta>
            </Head>

            <Hero />
            <FeaturedPosts posts={props.posts} />
        </Fragment>
    );
}

export async function getStaticProps(ctx) {
    const featuredPosts = getFeaturedPosts();

    return {
        props: {
            posts: featuredPosts,
        },
        revalidate: 60,
    };
}
