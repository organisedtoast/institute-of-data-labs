import BitcoinRates from '../components/BitcoinRates'
import BitcoinRates2 from '../components/BitcoinRates2'



export default function Homepage() {
  return (
    <div className="Homepage">
      <h1>Home</h1>

<p>Dear Mirza/ Gareth. I have abandoned this exercise and will move on to Mini Project 2. Reason is I don't want to delete my existing CSS for these new MUI components which are styled with weird dependency files (which go into src\themes). I will do Mini Project 2 with ONLY MUI components (no CSS) - it will have MUI cards, MUI form, MUI App Bar, data API so will definitely cover for this exercise and hopefully won't look like complete dog shit.</p>

  <BitcoinRates />

  <BitcoinRates2 />

    </div>
  );
}