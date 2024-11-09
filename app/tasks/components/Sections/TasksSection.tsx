import TasksHeader from "../Header/TaskHeader";
import TaskList from "../Lists/TaskList";

const TasksSection = () => {
  return (
    <div className="flex h-full w-full px-8 py-10">
      <div className="flex h-full w-full flex-col px-8 py-10 max-lg:px-0">
        <TasksHeader />
        <TaskList />
      </div>
    </div>
  );
};

export default TasksSection;
