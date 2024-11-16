const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p><b>total of {sum} exercises</b></p>

const Part = ({ name, exercises }) => {
  return (
    <li>{name} {exercises}</li>
  )
}
    
const Content = ({ parts }) => {
  const total_exercises = parts.reduce((sum, item) => sum + item.exercises, 0)
  return (
  <>
    <ul>
      {parts.map(part => 
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      )}
    </ul>
    <Total sum={total_exercises} />
  </>
  )
}

const Course = ({ course }) => {
  const { id, name, parts } = course
  return (
  <>
    <Header course={name} />
    <Content parts={parts} />
  </>
  )
}

export default Course