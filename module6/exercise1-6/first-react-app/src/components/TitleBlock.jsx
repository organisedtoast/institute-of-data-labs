function TitleBlock({ manutdLogo, teslaLogo }) {
  return (
    <div className="title">
      <a href="https://www.manutd.com" target="_blank">
        <img src={manutdLogo} className="logo manutd" alt="Man Utd logo" />
      </a>
      <a href="https://www.tesla.com" target="_blank">
        <img src={teslaLogo} className="logo tesla" alt="Tesla logo" />
      </a>

      <h1>Man Utd + Tesla</h1>
      <h3>Combining the world's most loved football club with the dominant tech company of our generation</h3>
    </div>
  )
}

export default TitleBlock
