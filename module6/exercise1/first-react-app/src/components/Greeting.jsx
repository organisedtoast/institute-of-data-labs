// this is a functional component that takes in props and returns a JSX element


export default function Greeting({ name = "Fan", children }) 
// name = this is a default value for the name prop, so if no name is provided when the component is used, it will default to "Fan"
// children = this prop allows us to pass in any JSX as the content of the Greeting component, which will be rendered instead of the default greeting message if provided

{
  return (
    <div>
      {children || `Hello ${name},`}
      {/* // if children is provided, it will be rendered instead of the default greeting message */}
      {/* // if children is not provided, the default greeting message will be rendered, which will say "Hello" followed by the value of the name prop */}

    </div>
  )
}
