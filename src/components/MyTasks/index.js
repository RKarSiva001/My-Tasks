import {Component} from 'react'
import {v4} from 'uuid'
import TabItem from '../TabItem'
import TaskItem from '../TaskItem'

import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class MyTasks extends Component {
  state = {
    taskInput: '',
    selectedTag: tagsList[0].displayText,
    activeId: tagsList[0].optionId,
    tasksList: [],
  }

  setActiveId = optionId => {
    this.setState({activeId: optionId})
  }

  onChangeTaskInput = event => {
    this.setState({taskInput: event.target.value})
  }

  onChangeTag = event => {
    this.setState({selectedTag: event.target.value})
  }

  addTask = event => {
    event.preventDefault()
    const {taskInput, selectedTag} = this.state

    const newTask = {
      id: v4(),
      task: taskInput,
      tag: selectedTag,
    }

    this.setState(prevState => ({
      tasksList: [...prevState.tasksList, newTask],
      taskInput: '',
      selectedTag: tagsList[0].optionId,
    }))
  }

  getActiveTasks = tasksList => {
    const {activeId} = this.state
    const filteredTasks = tasksList.filter(
      eachTasks => eachTasks.optionId === activeId,
    )
    console.log(filteredTasks)
    return filteredTasks
  }

  render() {
    const {taskInput, selectedTag, tasksList} = this.state
    const filteredTasks = this.getActiveTasks(tasksList)

    return (
      <div className="app-container">
        <div>
          <form className="form" onSubmit={this.addTask}>
            <h1>Create a task!</h1>
            <label htmlFor="title" className="label">
              Task
            </label>
            <input
              type="text"
              id="title"
              value={taskInput}
              onChange={this.onChangeTaskInput}
              className="input"
              placeholder="Enter the task here"
            />
            <label htmlFor="tag" className="label">
              Tags
            </label>
            <select onChange={this.onChangeTag} value={selectedTag} id="tag">
              {tagsList.map(eachTag => (
                <option key={eachTag.optionId} value={eachTag.optionId}>
                  {eachTag.displayText}
                </option>
              ))}
            </select>
            <button type="submit" className="add-button">
              Add
            </button>
          </form>
        </div>
        <div>
          <h1>Tags</h1>
          <ul className="tags-container">
            {tagsList.map(tabDetails => (
              <TabItem
                key={tabDetails.optionId}
                tabDetails={tabDetails}
                setActiveId={this.setActiveId}
              />
            ))}
          </ul>
          <h1>Tasks</h1>
          <ul>
            {tasksList.map(taskDetails => (
              <TaskItem key={taskDetails.id} taskDetails={taskDetails} />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default MyTasks
