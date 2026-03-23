import styles from '../page.module.css'

export default function PageLayout({ children }) {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                {children}
            </main>
        </div>
    )
}
