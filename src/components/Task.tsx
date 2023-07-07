import { Trash } from "phosphor-react";
import styles from "./Task.module.css";
import { ChangeEvent } from "react";

export interface Task {
  id: string;
  checked?: boolean;
  description: string;
}

interface TaskProps {
  id: string;
  checked?: boolean;
  description: string;
  changeStatusTask: (task: Task) => void;
  deleteTask: (id: string) => void;
}

export function Task(task: TaskProps) {
  const pId = Math.random().toString();

  function handleInputCheckboxChange(
    event: ChangeEvent<HTMLInputElement>
  ): void {
    task.changeStatusTask(task);
    const e = document.getElementById(pId) as HTMLElement;
    if (event.target.checked === true) {
      e.style.textDecoration = "line-through";
      e.style.color = "var(--gray-400)";
    } else {
      e.style.textDecoration = "none";
      e.style.color = "var(--gray-200)";
    }
  }

  function handleDeleteTask() {
    task.deleteTask(task.id);
  }

  return (
    <div className={styles.container}>
      <div className={styles.checkboxContainer}>
        <input
          onChange={handleInputCheckboxChange}
          id={task.id}
          type="checkbox"
        ></input>
        <label htmlFor={task.id}></label>
      </div>
      <p id={pId}>{task.description}</p>
      <button onClick={handleDeleteTask} title="Deletar tarefa">
        <Trash size={20} />
      </button>
    </div>
  );
}
