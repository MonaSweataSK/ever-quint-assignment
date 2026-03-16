import React, { useState } from 'react';
import Board from '../components/features/Board/Board';
import type { BoardData } from '../types/Board.type';
import { TaskSort } from '../components/features/Board/TaskSort';
import type { SortCriteria } from '../constants/board';
import { TaskFilter } from '../components/features/Board/TaskFilter';
import type { SortOrder } from '../components/ui/Sort/Sort';
import type { TaskPriority, TaskStatus } from '../types/Task.type';
import Modal from '../components/ui/Modal/Modal';
import TaskForm from '../components/features/Task/TaskForm';
import type { Task } from '../types/Task.type';
import { COLUMNS } from '../constants/board';
import type { BoardColumn } from '../types/Board.type';

const initialBoardData: BoardData = {
    tasks: {
        'task-1': {
            id: 'task-1',
            title: 'Setup Project Boilerplate',
            description: 'Initialize Vite project and install basic dependencies.',
            status: 'todo',
            priority: 'high',
            dueDate: new Date(),
            assignee: 'Ram',
            createdAt: new Date(),
            updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2h ago
            tags: ['Project', 'Setup'],
        },
        'task-2': {
            id: 'task-2',
            title: 'Design System Documentation',
            description: 'Document the design tokens and components.',
            status: 'todo',
            priority: 'medium',
            dueDate: new Date(),
            assignee: 'Mona',
            createdAt: new Date(),
            updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1d ago
            tags: ['Design', 'Docs'],
        },
        'task-3': {
            id: 'task-3',
            title: 'Implement Auth Flow',
            description: 'Basic login and register screens.',
            status: 'in-progress',
            priority: 'high',
            dueDate: new Date(),
            assignee: 'Shruthi',
            createdAt: new Date(),
            updatedAt: new Date(Date.now() - 1000 * 60 * 45), // 45m ago
            tags: ['Auth', 'Frontend'],
        },
        'task-4': {
            id: 'task-4',
            title: 'Database Schema Design',
            description: 'Plan the relational structure for the backend.',
            status: 'in-progress',
            priority: 'medium',
            dueDate: new Date(),
            assignee: 'Preetha',
            createdAt: new Date(),
            updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5h ago
            tags: ['Backend', 'Database'],
        },
        'task-5': {
            id: 'task-5',
            title: 'Finalize Deployment Pipeline',
            description: 'Configure CI/CD workflows and automated runs.',
            status: 'done',
            priority: 'low',
            dueDate: new Date(),
            assignee: 'Ram',
            createdAt: new Date(),
            updatedAt: new Date(Date.now() - 1000 * 60 * 15), // 15m ago
            tags: ['DevOps'],
        },
    },
    columns: COLUMNS.reduce((acc, col) => {
        acc[col.id] = {
            id: col.id,
            title: col.title,
            taskIds: Object.values({
                'task-1': 'todo',
                'task-2': 'todo',
                'task-3': 'in-progress',
                'task-4': 'in-progress',
                'task-5': 'done'
            }).reduce((ids: string[], status, idx) => {
                const taskId = `task-${idx + 1}`;
                // Map status to column ID (they are the same in this case)
                if (status === col.id || (status === 'todo' && col.id === 'backlog')) {
                    ids.push(taskId);
                }
                return ids;
            }, [])
        };
        return acc;
    }, {} as Record<string, BoardColumn>),
    columnOrder: COLUMNS.map(col => col.id),
};

const Home: React.FC = () => {
    const [boardData, setBoardData] = useState<BoardData>(initialBoardData);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPriorities, setSelectedPriorities] = useState<TaskPriority[]>([]);
    const [selectedStatuses, setSelectedStatuses] = useState<TaskStatus[]>([]);
    const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [sortConfig, setSortConfig] = useState<{ criteria: SortCriteria | null; order: SortOrder }>({
        criteria: null,
        order: 'asc',
    });

    const handleTaskClick = (taskId: string) => {
        setSelectedTaskId(taskId);
        setIsEditing(false);
        setIsViewModalOpen(true);
    };

    const handleUpdateTask = (updatedTaskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
        if (!selectedTaskId) return;

        const oldTask = boardData.tasks[selectedTaskId];
        const now = new Date();
        const updatedTask: Task = {
            ...oldTask,
            ...updatedTaskData,
            updatedAt: now,
        };

        setBoardData((prev: BoardData) => {
            const newTasks = {
                ...prev.tasks,
                [selectedTaskId]: updatedTask,
            };

            let newColumns = { ...prev.columns };

            // If status changed, move task between columns
            if (oldTask.status !== updatedTaskData.status) {
                // Remove from old column
                const oldColumnId = Object.keys(prev.columns).find(key => 
                    prev.columns[key].taskIds.includes(selectedTaskId)
                );
                
                if (oldColumnId) {
                    newColumns[oldColumnId] = {
                        ...prev.columns[oldColumnId],
                        taskIds: prev.columns[oldColumnId].taskIds.filter(id => id !== selectedTaskId),
                    };
                }

                // Add to new column (usually the name matches status id in this setup)
                const newColumnId = updatedTaskData.status;
                if (newColumns[newColumnId]) {
                    newColumns[newColumnId] = {
                        ...newColumns[newColumnId],
                        taskIds: [...newColumns[newColumnId].taskIds, selectedTaskId],
                    };
                }
            }

            return {
                ...prev,
                tasks: newTasks,
                columns: newColumns,
            };
        });

        setIsEditing(false);
        setIsViewModalOpen(false);
    };

    const handleDeleteTask = () => {
        if (!selectedTaskId) return;
        
        if (window.confirm('Are you sure you want to delete this task?')) {
            setBoardData((prev: BoardData) => {
                const newTasks = { ...prev.tasks };
                delete newTasks[selectedTaskId];

                const newColumns = { ...prev.columns };
                const columnId = Object.keys(prev.columns).find(key => 
                    prev.columns[key].taskIds.includes(selectedTaskId)
                );

                if (columnId) {
                    newColumns[columnId] = {
                        ...prev.columns[columnId],
                        taskIds: prev.columns[columnId].taskIds.filter(id => id !== selectedTaskId),
                    };
                }

                return {
                    ...prev,
                    tasks: newTasks,
                    columns: newColumns,
                };
            });

            setIsViewModalOpen(false);
            setSelectedTaskId(null);
        }
    };

    const handleCreateTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
        const taskId = `task-${Date.now()}`;
        const now = new Date();
        
        const newTask: Task = {
            ...taskData,
            id: taskId,
            createdAt: now,
            updatedAt: now,
        };

        const firstColumnId = boardData.columnOrder[0];
        const firstColumn = boardData.columns[firstColumnId];

        setBoardData((prev: BoardData) => ({
            ...prev,
            tasks: {
                ...prev.tasks,
                [taskId]: newTask,
            },
            columns: {
                ...prev.columns,
                [firstColumnId]: {
                    ...firstColumn,
                    taskIds: [...firstColumn.taskIds, taskId],
                },
            },
        }));

        setIsNewTaskModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Premium Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 py-4 sticky top-0 z-40 transition-all duration-300 shadow-sm">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20 transition-transform hover:scale-105 active:scale-95 cursor-pointer">
                            E
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900 tracking-tight leading-none">
                                EverQuint
                            </h1>
                            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mt-1 block">
                                Workspace
                            </span>
                        </div>
                    </div>

                    <div className="flex-1 max-w-md relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search across board..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-4 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-500 transition-all outline-none placeholder:text-gray-400"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <TaskFilter
                            selectedPriorities={selectedPriorities}
                            selectedStatuses={selectedStatuses}
                            onPriorityChange={setSelectedPriorities}
                            onStatusChange={setSelectedStatuses}
                            onClearAll={() => {
                                setSelectedPriorities([]);
                                setSelectedStatuses([]);
                            }}
                        />
                        <TaskSort 
                            currentCriteria={sortConfig.criteria}
                            currentOrder={sortConfig.order}
                            onSort={(criteria, order) => setSortConfig({ criteria, order })}
                            onClear={() => setSortConfig({ criteria: null, order: 'asc' })}
                            title="Global Sort"
                            renderTrigger={(isOpen) => (
                                <button 
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border ${isOpen ? 'bg-gray-100 border-gray-200 text-gray-900' : 'bg-white border-gray-100 text-gray-600 hover:bg-gray-50 hover:border-gray-200'}`}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                                    </svg>
                                    <span>Sort</span>
                                    <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            )}
                        />

                        <button 
                            onClick={() => setIsNewTaskModalOpen(true)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-indigo-500/25 active:scale-95 flex items-center gap-2 group"
                        >
                            <svg className="w-5 h-5 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <span>New Task</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <Board 
                    data={boardData}
                    onDataChange={setBoardData}
                    searchQuery={searchQuery}
                    selectedPriorities={selectedPriorities}
                    selectedStatuses={selectedStatuses}
                    onTaskClick={handleTaskClick}
                />
            </main>

            <Modal
                isOpen={isNewTaskModalOpen}
                onClose={() => setIsNewTaskModalOpen(false)}
                title="Create New Task"
                position="right"
                dimensions="md"
            >
                <TaskForm 
                    onSubmit={handleCreateTask}
                    onCancel={() => setIsNewTaskModalOpen(false)}
                />
            </Modal>

            <Modal
                isOpen={isViewModalOpen}
                onClose={() => {
                    setIsViewModalOpen(false);
                    setSelectedTaskId(null);
                    setIsEditing(false);
                }}
                title={isEditing ? 'Edit Task' : 'Task Details'}
                position="right"
                dimensions="md"
                headerActions={
                    <div className="flex items-center gap-2 pr-4">
                        {!isEditing && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                                <span>Edit</span>
                            </button>
                        )}
                        <button
                            onClick={handleDeleteTask}
                            disabled={isEditing}
                            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-600 rounded-lg transition-colors ${isEditing ? 'opacity-40 cursor-not-allowed bg-transparent' : 'hover:bg-rose-50'}`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <span>Delete</span>
                        </button>
                    </div>
                }
            >
                {selectedTaskId && boardData.tasks[selectedTaskId] && (
                    <TaskForm 
                        initialTask={boardData.tasks[selectedTaskId]}
                        onSubmit={handleUpdateTask}
                        onCancel={() => setIsEditing(false)}
                        isEditing={isEditing}
                    />
                )}
            </Modal>
        </div>
    );
};

export default Home;
