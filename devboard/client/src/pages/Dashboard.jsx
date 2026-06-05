import React, { useState } from "react";
import KanbanBoard from "../components/Board/KanbanBoard";
import PomodoroTimer from "../components/Pomodoro/PomodoroTimer";
import TaskModal from "../components/Task/TaskModal";
import { useBoard } from "../context/BoardContext";

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen bg-[#0f0f10]">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      <span className="text-[#a0a0a5] text-sm font-medium animate-pulse">Loading workspace...</span>
    </div>
  </div>
);

const Dashboard = () => {
  const { user, logout, updateTask, loading } = useBoard();
  const [selectedTask, setSelectedTask] = useState(null);

  if (loading) {
    return <LoadingSpinner />;
  }

  const handleSessionComplete = async () => {
    if (selectedTask) {
      await updateTask(selectedTask._id, { pomodoroCount: (selectedTask.pomodoroCount || 0) + 1 });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0f0f10]">
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-5 py-3 bg-[#1a1a1f] border-b border-[#2a2a2f]">
        <div className="flex items-center gap-2">
          <span className="text-lg">🗂️</span>
          <span className="font-semibold text-[#f0f0f0]">DevBoard</span>
          <span className="text-xs bg-purple-600/20 text-purple-400 px-2 py-0.5 rounded-full ml-1">beta</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#666]">
            👋 {user?.name}
          </span>
          <button
            onClick={logout}
            className="text-xs text-[#666] hover:text-[#aaa] transition px-3 py-1.5 border border-[#2a2a2f] rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Pomodoro Bar */}
      <PomodoroTimer
        activeTaskTitle={selectedTask?.title}
        onSessionComplete={handleSessionComplete}
      />

      {/* Kanban Board */}
      <div className="flex-1 overflow-hidden">
        <KanbanBoard onSelectTask={setSelectedTask} />
      </div>

      {/* Task Edit Modal */}
      {selectedTask && (
        <TaskModal
          mode="edit"
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onSave={async (data) => {
            await updateTask(selectedTask._id, data);
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
