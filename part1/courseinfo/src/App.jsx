
const Header = (props) => {

  return (
    <div>
      <h1> {props.course} </h1>
    </div>
  )
} 

const Part = (props) => {
  return (
    <div>
      <p>{props.exercise_name} {props.num_exercises}</p>
    </div>
  )
}

const Content = (props) => {

  return (
    <div>
      <Part exercise_name={props.array[0].name} num_exercises={props.array[0].num} />
      <Part exercise_name={props.array[1].name} num_exercises={props.array[1].num} />
      <Part exercise_name={props.array[2].name} num_exercises={props.array[2].num} />
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.array[0].num + props.array[1].num + props.array[2].num} </p>
    </div>
  )

}

const App = () => {
  const course = 'Half Stack application development'

  const parts = [
      {name: "Fundamentals of React", num: 10},
      {name: "Using props to pass data", num: 7},
      {name: "State of a component", num: 14}
  ]

  return (
    <div>
      <Header course={course} />
      <Content array={parts}/>
      <Total array={parts} />
    </div>
  )

}

export default App