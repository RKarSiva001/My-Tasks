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
    selectedTag: tagsList[0].optionId,
    activeId: '',
    tasksList: [],
  }

  onToggleActiveId = optionId => {
    this.setState({
      activeId: optionId,
    })
  }

  //   setActiveId = optionId => {
  //     this.setState({activeId: optionId})
  //   }

  onChangeTaskInput = event => {
    this.setState({taskInput: event.target.value})
  }

  onChangeTag = event => {
    this.setState({selectedTag: event.target.value})
  }

  addTask = event => {
    event.preventDefault()
    const {taskInput, selectedTag, selectedCategory} = this.state

    const newTask = {
      id: v4(),
      task: taskInput,
      tag: selectedTag,
      category: selectedCategory,
    }

    this.setState(prevState => ({
      tasksList: [...prevState.tasksList, newTask],
      taskInput: '',
      selectedTag: tagsList[0].optionId,
    }))
  }

  getActiveTasks = () => {
    const {activeId, tasksList} = this.state

    if (activeId === '') {
      const filteredTasks = tasksList
      return filteredTasks
    }
    const filteredTasks = tasksList.filter(
      eachTasks => eachTasks.tag === activeId,
    )
    return filteredTasks
  }

  render() {
    const {activeId, taskInput, selectedTag} = this.state
    const filteredTasks = this.getActiveTasks()

    return (
      <div className="app-container">
        <div>
          <form className="form" onSubmit={this.addTask}>
            <h1>Create a task!</h1>
            <label htmlFor="title" className="label">
              Task
            </label>
            <br />
            <input
              type="text"
              id="title"
              value={taskInput}
              onChange={this.onChangeTaskInput}
              className="input"
              placeholder="Enter the task here"
            />
            <br />
            <label htmlFor="tag" className="label">
              Tags
            </label>
            <br />
            <select onChange={this.onChangeTag} value={selectedTag} id="tag">
              {tagsList.map(eachTag => (
                <option key={eachTag.optionId} value={eachTag.optionId}>
                  {eachTag.displayText}
                </option>
              ))}
            </select>
            <br />
            <button type="submit" className="add-button">
              Add Task
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
                onToggleActiveId={this.onToggleActiveId}
                isActive={activeId === tabDetails.optionId}
              />
            ))}
          </ul>
          <h1>Tasks</h1>
          <ul>
            {filteredTasks.length > 0 ? (
              filteredTasks.map(taskDetails => (
                <TaskItem key={taskDetails.id} taskDetails={taskDetails} />
              ))
            ) : (
              <p>No Tasks Added Yet</p>
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default MyTasks
