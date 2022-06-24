// Header - component
const Header = ({ name }) => <h1>{name}</h1>

// Part - component
const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

// Content - component
const Content = (props) => {
  const parts = props.parts.map(part => (<Part key={part.id} name={part.name} exercises={part.exercises} />))

  return (
    <>
      {parts}
    </>
  )
}

// Total - component
const Total = ({ parts }) => {
  const total = parts.map(part => part.exercises).reduce((s, p) => s + p)

  return (
    <div>
      <p><strong>Number of exercises {total}</strong></p>
    </div>
  )
}

// Course - component
const Course = ({ course }) => (
  <>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
)

export default Course