// Header - component
const Header = ({ name }) => (
  <h1>{name}</h1>
)

// Part - component
const Part = ({ name, exercises }) => (
  <p>{name} {exercises}</p>
)

// Content - component
const Content = (props) => {
  const parts = props.parts.map(value => (<Part name={value.name} exercises={value.exercises} />))

  return (
    <div>
      {parts}
    </div>
  )
}

// Total - component
const Total = (props) => {
  const exercises = props.parts.map(value => value.exercises)
  const total = exercises.reduce((total, num) => total + num)

  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  )
}

// App - component
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App