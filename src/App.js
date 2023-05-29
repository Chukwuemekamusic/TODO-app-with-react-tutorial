import { useState } from "react";
import { v4 as uuidv4} from 'uuid'
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Take out trash",
      day: "Feb 5th at 2pm",
      reminder: true,
    },
    {
      id: 2,
      text: "Find Anna",
      day: "Mar 5th at 3pm",
      reminder: false,
    },
    {
      id: 3,
      text: "Dentist appt",
      day: "Sep 5th at 5.30pm",
      reminder: true,
    },
  ]);

  const addTask = (task) => {
    // const id = Math.floor(Math.round() * 10000) + 1;
    const id = uuidv4()
    const newTask = {...task, id }
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  //toggle reminder
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        <i>No Task to show</i>
      )}
    </div>
  );
}

export default App;
