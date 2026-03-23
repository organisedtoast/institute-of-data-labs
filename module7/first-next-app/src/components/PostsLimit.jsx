'use client' // client component, not server rendered

import { useRouter, usePathname, useSearchParams } from 'next/navigation'

// This is a client component because it uses hooks that are only available on the client side (useRouter, usePathname, useSearchParams)

// This component allows the user to select the number of posts to display.
// It also updates the search parameters in the URL accordingly.
// It uses Next.js hooks for navigation and URL management.

export default function PostsLimit({ defaultLimit }) {
    const searchParams = useSearchParams(); // next.js hook for search
    const router = useRouter(); // next.js hook for client side navigation

    const pathname = usePathname(); // next.js hook for current URL path

    const limit = searchParams.has('limit') ?
        searchParams.get('limit') : defaultLimit;

    const handleChangeLimit = (e) => {
        
        // change the route to the existing path plus the new search param
        router.replace(pathname + '?limit=' + e.target.value)
    }
    
    return (
        <label className="PostsLimit">Number of posts:
            <select onChange={handleChangeLimit} value={limit}>
                <option>5</option><option>10</option><option>20</option>
            </select>
        </label>
    )
}

