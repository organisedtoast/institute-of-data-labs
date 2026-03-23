// This code defines a React functional component called `About`.

// It returns a JSX structure that includes a heading and a paragraph describing the about page of the Next.js application.

// The component is then exported as the default export of the module, allowing it to be imported and used in other parts of the application.

function About () {
    return (
        <div className="about-page">
            <h1>About Manchester United</h1>
            
            <section className="about-section">
                <h2>Our History</h2>
                <p>
                    Manchester United Football Club was founded in 1878 as Newton Heath LYR Football Club by the 
                    carriage and wagon department of the Lancashire and Yorkshire Railway depot at Newton Heath. 
                    The club changed its name to Manchester United in 1902 and moved to its current stadium, 
                    Old Trafford, in 1910.
                </p>
            </section>

            <section className="about-section">
                <h2>The Busby Era</h2>
                <p>
                    Under manager Matt Busby, who joined in 1945, Manchester United achieved unprecedented success. 
                    The "Busby Babes" won the First Division title in 1956 and 1957. Tragically, the 1958 Munich 
                    air disaster claimed the lives of eight players. Busby rebuilt the team and led them to 
                    European Cup glory in 1968, making United the first English club to win the prestigious trophy.
                </p>
            </section>

            <section className="about-section">
                <h2>The Ferguson Years</h2>
                <p>
                    Sir Alex Ferguson arrived in 1986 and went on to become the club's longest-serving and most 
                    successful manager. During his 26-year tenure, United won 13 Premier League titles, 5 FA Cups, 
                    and 2 UEFA Champions League trophies, including the historic treble in 1999 (Premier League, 
                    FA Cup, and Champions League).
                </p>
            </section>

            <section className="about-section">
                <h2>Old Trafford</h2>
                <p>
                    Known as "The Theatre of Dreams," Old Trafford has been Manchester United's home since 1910. 
                    With a capacity of over 74,000, it is the largest club football stadium in the United Kingdom 
                    and the second-largest football stadium overall, after Wembley.
                </p>
            </section>

            <section className="about-section">
                <h2>Club Honours</h2>
                <p>
                    Manchester United is one of the most successful clubs in English football history, with a 
                    record 20 league titles, 12 FA Cups, and 3 European Cups/Champions Leagues. The club's 
                    global fanbase exceeds 1 billion supporters worldwide, making it one of the most supported 
                    sports teams on the planet.
                </p>
            </section>
        </div>
    );
}

export default About;

