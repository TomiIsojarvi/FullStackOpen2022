// Header - component
const Header = (props) => (
  <h1>{props.course}</h1>
)

// Part - component
const Part = (props) => (
  <p>{props.name} {props.count} </p>
)

// Content - component
const Content = (props) => (
  <div>
    <Part name={props.part1} count={props.exercises1} />
    <Part name={props.part2} count={props.exercises2} />
    <Part name={props.part3} count={props.exercises3} />
  </div>
)

// Total - component
const Total =(props) => (
  <div>
    <p>Number of exercises {props.total}</p>
  </div>
)

// App - component
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} 
        exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App