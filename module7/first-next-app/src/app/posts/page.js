import Link from "next/link"
import PostsLimit from "../../components/PostsLimit";

async function getPostsData(limit, page = 1) {
    const res = await fetch('https://jsonplaceholder.typicode.com/' +
        'posts?_limit=' + limit + '&_page=' + page);
    if (!res.ok) {
        throw new Error('Failed to fetch posts')
    }
    return res.json()
}

export default async function Posts({ searchParams }) {
    const { limit } = await searchParams;
    const limitValue = limit ? limit : 5;
    const posts = await getPostsData(limitValue);
    const postList = posts.map(post => (
        <li key={post.id}><Link href={"/posts/" + post.id}>
            Post #{post.id}: {post.title}</Link></li>
    ))

    const postsPromise = getPostsData(limitValue);
    const usersPromise = fetch('https://jsonplaceholder.typicode.com/users');

    const [postsData, usersRes] = await Promise.all([postsPromise, usersPromise]);
    const users = await usersRes.json();

    return (
        <div className="Posts">
            <h1>Posts</h1>
            <ul>{postList}</ul>
            <PostsLimit defaultLimit={limitValue} />
            <h2>Users</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    )
}
