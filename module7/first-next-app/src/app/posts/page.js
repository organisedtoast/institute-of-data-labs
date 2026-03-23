import Link from "next/link"

async function getPostsData(limit, page = 1) {
    const res = await fetch('https://jsonplaceholder.typicode.com/' +
        'posts?_limit=' + limit + '&_page=' + page);
    if (!res.ok) { // Recommendation: handle errors
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch posts')
    }
    return res.json()
}
export default async function Posts() {
    const posts = await getPostsData(5);
    const postList = posts.map(post => (
        <li key={post.id}><Link href={"/posts/" + post.id}>
            Post #{post.id}: {post.title}</Link></li>
    ))
    return (
        <div>
            <h1>Posts</h1>
            <ul>{postList}</ul>
        </div>
    )
}
