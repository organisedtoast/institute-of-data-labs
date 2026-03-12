export default function Greeting({ name = "Fan", children }) {
  return (
    <div>
      {children || `Hello ${name}`}
    </div>
  )
}
