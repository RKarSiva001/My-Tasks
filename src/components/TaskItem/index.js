import './index.css'

const TaskItem = props => {
  const {taskDetails} = props
  const {task, tag} = taskDetails

  return (
    <li>
      <p>{task}</p>
      <p>{tag}</p>
    </li>
  )
}

export default TaskItem
