'use client' // client component, not server rendered

import Link from "next/link"
import { usePathname } from 'next/navigation'
// copied from previous NavBar.jsx component, modified for Next.js

function NavBar() {
    const path = usePathname(); // hook to check current path
    return (
        <nav className="NavBar"
            style={{ backgroundColor: '#09193b', color: '#14bbe5' }}>
            <ul className="menu">
                {/* Next.js Link components use href instead of to prop
*/}
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about" className={path.startsWith('/about')
                    ? 'active' : null}>About</Link></li>
                <li><Link href="/contact"
                    className={path.startsWith('/contact') ? 'active' :
                        null}>Contact</Link></li>
                <li><Link href="/posts"
                    className={path.startsWith('/posts') ? 'active' :
                        null}>Posts</Link></li>
                <li><Link href="/bitcoinrates">Bitcoin Rates</Link></li>
                <li><Link href="/login">Login</Link></li>
            </ul>
        </nav>
    )
}
export default NavBar