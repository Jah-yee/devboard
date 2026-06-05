import React, { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "./Column";
import TaskModal from "../Task/TaskModal";
import { useBoard } from "../../context/BoardContext";

const COLUMNS = ["backlog", "inprogress", "review", "done"];

const KanbanBoard = ({ onSelectTask }) => {
  const { tasks, updateTask, addTask } = useBoard();
  const [modalOpen, setModalOpen] = useState(false);
  const [defaultStatus, setDefaultStatus] = useState("backlog");

  const getTasksByStatus = (status) =>
    tasks.filter((t) => t.status === status);

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;
    await updateTask(draggableId, { status: destination.droppableId });
  };

  const handleAddTask = (columnId) => {
    setDefaultStatus(columnId);
    setModalOpen(true);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 p-4 overflow-x-auto h-full">
          {COLUMNS.map((col) => (
            <Column
              key={col}
              columnId={col}
              tasks={getTasksByStatus(col)}
              onSelectTask={onSelectTask}
              onAddTask={handleAddTask}
            />
          ))}
        </div>
      </DragDropContext>

      {modalOpen && (
        <TaskModal
          mode="create"
          defaultStatus={defaultStatus}
          onClose={() => setModalOpen(false)}
          onSave={async (data) => {
            await addTask(data);
            setModalOpen(false);
          }}
        />
      )}
    </>
  );
};

export default KanbanBoard;
