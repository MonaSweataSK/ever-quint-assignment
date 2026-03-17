import React, { useState, useEffect } from 'react';
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
import { useTaskStore } from '../store/taskStore';
import Toast from '../components/ui/Toast/Toast';

import { useSearchParams } from 'react-router-dom';

const Home: React.FC = () => {
    const { tasks, columns, columnOrder, loadTasks, createTask, updateTask, deleteTask, moveTask, migrationRan } = useTaskStore();
    const [searchParams, setSearchParams] = useSearchParams();
    
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
    const [selectedPriorities, setSelectedPriorities] = useState<TaskPriority[]>(
        (searchParams.get('priority')?.split(',') as TaskPriority[] || []).filter(Boolean)
    );
    const [selectedStatuses, setSelectedStatuses] = useState<TaskStatus[]>(
        (searchParams.get('status')?.split(',') as TaskStatus[] || []).filter(Boolean)
    );
    const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
    const [showMigrationToast, setShowMigrationToast] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    
    // Initial sort from URL
    const urlSortCriteria = searchParams.get('sortBy') as SortCriteria | null;
    const urlSortOrder = (searchParams.get('order') as SortOrder) || 'asc';

    const [globalSort, setGlobalSort] = useState<{ criteria: SortCriteria | null; order: SortOrder; version: number }>({
        criteria: urlSortCriteria,
        order: urlSortOrder,
        version: 0,
    });
    const [isGlobalIndicatorActive, setIsGlobalIndicatorActive] = useState(!!urlSortCriteria);
    
    // Sync URL when state changes
    useEffect(() => {
        const params: any = {};
        if (searchQuery) params.q = searchQuery;
        if (selectedPriorities.length) params.priority = selectedPriorities.join(',');
        if (selectedStatuses.length) params.status = selectedStatuses.join(',');
        if (globalSort.criteria) {
            params.sortBy = globalSort.criteria;
            params.order = globalSort.order;
        }
        setSearchParams(params, { replace: true });

        // Update document title for better UX
        const filterTitle = [
            searchQuery ? `Searching "${searchQuery}"` : null,
            selectedPriorities.length ? `Priorities: ${selectedPriorities.join(', ')}` : null,
            selectedStatuses.length ? `Statuses: ${selectedStatuses.join(', ')}` : null,
        ].filter(Boolean).join(' | ');

        document.title = filterTitle ? `${filterTitle} - EverQuint` : 'EverQuint Workspce';
    }, [searchQuery, selectedPriorities, selectedStatuses, globalSort, setSearchParams]);

    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    useEffect(() => {
        if (migrationRan) {
            setShowMigrationToast(true);
        }
    }, [migrationRan]);

    const handleGlobalSort = (criteria: SortCriteria, order: SortOrder) => {
        setGlobalSort(prev => ({ criteria, order, version: prev.version + 1 }));
        setIsGlobalIndicatorActive(true);
    };

    const handleColumnSortApplied = () => {
        setIsGlobalIndicatorActive(false);
    };

    const handleTaskClick = (taskId: string, editMode: boolean = false) => {
        setSelectedTaskId(taskId);
        setIsEditing(editMode);
        setIsViewModalOpen(true);
    };

    const boardData: BoardData = {
        tasks,
        columns,
        columnOrder,
    };

    const handleUpdateTask = async (updatedTaskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
        if (!selectedTaskId) return;
        await updateTask(selectedTaskId, updatedTaskData);
        setIsEditing(false);
        setIsViewModalOpen(false);
    };

    const handleDeleteTask = async () => {
        if (!selectedTaskId) return;
        if (window.confirm('Are you sure you want to delete this task?')) {
            await deleteTask(selectedTaskId);
            setIsViewModalOpen(false);
            setSelectedTaskId(null);
        }
    };

    const handleCreateTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
        await createTask(taskData);
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
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mt-1 block">
                                    Workspace
                                </span>
                                <a 
                                    href="/orm-demo" 
                                    className="text-[10px] font-bold text-gray-400 hover:text-indigo-600 uppercase tracking-widest mt-1 block border-l border-gray-200 pl-2 ml-1"
                                >
                                    ORM Demo
                                </a>
                            </div>
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
                            currentCriteria={isGlobalIndicatorActive ? globalSort.criteria : null}
                            currentOrder={globalSort.order}
                            onSort={handleGlobalSort}
                            onClear={() => {
                                setGlobalSort(prev => ({ criteria: null, order: 'asc', version: prev.version + 1 }));
                                setIsGlobalIndicatorActive(false);
                            }}
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
                    onDragEnd={moveTask}
                    searchQuery={searchQuery}
                    selectedPriorities={selectedPriorities}
                    selectedStatuses={selectedStatuses}
                    onTaskClick={handleTaskClick}
                    globalSortCriteria={globalSort.criteria}
                    globalSortOrder={globalSort.order}
                    globalSortVersion={globalSort.version}
                    onColumnSortApplied={handleColumnSortApplied}
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

            {showMigrationToast && (
                <Toast
                    text="Database updated — your tasks have been migrated to the latest version."
                    variant="info"
                    position="bottom-center"
                    duration={5000}
                    onClose={() => setShowMigrationToast(false)}
                />
            )}
        </div>
    );
};

export default Home;
