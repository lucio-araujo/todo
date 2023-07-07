import styles from "./App.module.css";
import "./global.css";

import { PlusCircle } from "phosphor-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Header } from "./components/Header";
import { Task } from "./components/Task";

export function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksCompletedCount, setTasksCompletedCount] = useState(0);
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const isNewTaskDescritpionEmpty = !newTaskDescription.length;

  function handleCreateNewTask(event: FormEvent) {
    event?.preventDefault();

    const newTaskCreated: Task = {
      id: new Date().getTime().toString(),
      checked: false,
      description: newTaskDescription,
    };

    setTasks([...tasks, newTaskCreated]);

    setNewTaskDescription("");
  }

  function handleNewTaskDescription(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskDescription(event.target.value);
  }

  function changeStatusTask(taskChanged: Task) {
    const taskFound = tasks.find((task) => task.id === taskChanged.id);
    taskFound.checked = !taskFound.checked;

    const tasksCompletedList = tasks.filter((task) => {
      return task.checked === true;
    });
    setTasksCompletedCount(tasksCompletedList.length);
  }

  function deleteTask(id: string) {
    const tasksWithoutTheDeletedOne = tasks.filter((task) => {
      return task.id !== id;
    });

    setTasks(tasksWithoutTheDeletedOne);

    const tasksCompletedList = tasksWithoutTheDeletedOne.filter((task) => {
      return task.checked === true;
    });

    setTasksCompletedCount(tasksCompletedList.length);
  }

  return (
    <div className={styles.wrapper}>
      <Header />
      <form onSubmit={handleCreateNewTask} className={styles.form}>
        <input
          onChange={handleNewTaskDescription}
          value={newTaskDescription}
          placeholder="Adicione uma nova tarefa"
        />
        <button type="submit" disabled={isNewTaskDescritpionEmpty}>
          Criar <PlusCircle size={20} />
        </button>
      </form>
      <main>
        <div className={styles.info}>
          <div className={styles.criadas}>
            <span>Tarefas criadas</span>
            <span className={styles.count}>{tasks.length}</span>
          </div>
          <div className={styles.concluidas}>
            <span>Concluídas</span>
            <span className={styles.count}>
              {tasksCompletedCount} de {tasks.length}
            </span>
          </div>
        </div>
        {tasks?.map((task) => {
          return (
            <Task
              key={task.id}
              id={task.id}
              checked={task.checked}
              description={task.description}
              changeStatusTask={changeStatusTask}
              deleteTask={deleteTask}
            />
          );
        })}
      </main>
    </div>
  );
}
