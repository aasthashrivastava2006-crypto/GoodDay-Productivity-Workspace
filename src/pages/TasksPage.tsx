import { CalendarDays, Plus } from "lucide-react";
import { useState, type DragEvent } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { members, taskColumns } from "@/data/mockData";
import { cn, formatDate } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";
import type { Priority, Task, TaskColumn } from "@/types";

function priorityVariant(priority: Priority) {
  if (priority === "Urgent") return "danger";
  if (priority === "High") return "warning";
  if (priority === "Low") return "muted";
  return "default";
}

export function TasksPage() {
  const { tasks, moveTask } = useAppStore();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [dragOver, setDragOver] = useState<TaskColumn | null>(null);

  function dropTask(event: DragEvent, column: TaskColumn) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("task-id");
    if (taskId) moveTask(taskId, column);
    setDragOver(null);
  }

  return (
    <>
      <PageHeader
        title="Task management"
        description="Move work across stages and keep delivery flowing."
        action={<Button><Plus className="size-4" />New task</Button>}
      />
      <div className="scrollbar-none flex gap-4 overflow-x-auto pb-3">
        {taskColumns.map((column) => {
          const columnTasks = tasks.filter((task) => task.column === column);
          return (
            <section
              key={column}
              className={cn(
                "min-h-[590px] w-[292px] shrink-0 rounded-2xl bg-slate-100/75 p-3 transition-colors dark:bg-slate-900/70",
                dragOver === column && "bg-primary/10 ring-2 ring-primary/25",
              )}
              onDragOver={(event) => { event.preventDefault(); setDragOver(column); }}
              onDragLeave={() => setDragOver(null)}
              onDrop={(event) => dropTask(event, column)}
            >
              <div className="mb-4 flex items-center justify-between px-1">
                <h2 className="font-semibold dark:text-white">{column}</h2>
                <span className="rounded-full bg-white px-2 py-0.5 text-xs text-slate-500 dark:bg-slate-800">{columnTasks.length}</span>
              </div>
              <div className="space-y-3">
                {columnTasks.map((task) => {
                  const assignee = members.find((member) => member.id === task.assigneeId)!;
                  return (
                    <button
                      key={task.id}
                      draggable
                      onDragStart={(event) => event.dataTransfer.setData("task-id", task.id)}
                      onClick={() => setSelectedTask(task)}
                      className="panel block w-full cursor-grab p-4 text-left transition-transform hover:-translate-y-0.5 active:cursor-grabbing"
                    >
                      <Badge variant={priorityVariant(task.priority)}>{task.priority}</Badge>
                      <p className="mt-3 text-sm font-semibold dark:text-white">{task.title}</p>
                      <p className="muted mt-1 truncate text-xs">{task.project}</p>
                      <div className="mt-4 flex flex-wrap gap-1">
                        {task.tags.map((tag) => <Badge key={tag} variant="muted">{tag}</Badge>)}
                      </div>
                      <div className="muted mt-4 flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1"><CalendarDays className="size-3.5" />{formatDate(task.dueDate)}</span>
                        <Avatar initials={assignee.initials} color={assignee.color} className="size-7" />
                      </div>
                    </button>
                  );
                })}
                {columnTasks.length === 0 && (
                  <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-xs text-slate-400 dark:border-slate-700">
                    Drop a task here
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>
      <Dialog open={Boolean(selectedTask)} onOpenChange={(open) => !open && setSelectedTask(null)} title="Task details">
        {selectedTask && (
          <div>
            <Badge variant={priorityVariant(selectedTask.priority)}>{selectedTask.priority}</Badge>
            <h2 className="mt-4 text-xl font-semibold dark:text-white">{selectedTask.title}</h2>
            <p className="muted mt-2 text-sm">{selectedTask.description}</p>
            <div className="mt-6 rounded-xl bg-slate-50 p-4 text-sm dark:bg-slate-800/60">
              <p className="muted">Project</p>
              <p className="mt-1 font-medium dark:text-white">{selectedTask.project}</p>
              <p className="muted mt-4">Due date</p>
              <p className="mt-1 font-medium dark:text-white">{formatDate(selectedTask.dueDate)}</p>
            </div>
          </div>
        )}
      </Dialog>
    </>
  );
}
