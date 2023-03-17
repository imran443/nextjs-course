import Head from "next/head";
import { Fragment } from "react";
import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getPostFiles } from "../../lib/posts-util";

export default function PostDetailPage(props) {
    return (
        <Fragment>
            <Head>
                <title>{props.post.title}</title>
                <meta name="description" content={props.post.excerpt} />
            </Head>
            <PostContent post={props.post} />
        </Fragment>
    );
}

export async function getStaticProps(ctx) {
    const { params } = ctx;

    const { slug } = params;

    const postData = getPostData(slug);

    return {
        props: {
            post: postData,
        },
        revalidate: 600,
    };
}

export async function getStaticPaths() {
    const postFilenames = getPostFiles();

    const slugs = postFilenames.map((fileName) =>
        fileName.replace(/\.md$/, "")
    );

    return {
        paths: slugs.map((slug) => ({ params: { slug } })),
        fallback: false,
    };
}
