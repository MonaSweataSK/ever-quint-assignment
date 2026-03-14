import React, { useState } from 'react';
import Board from '../components/features/Board/Board';
import type { BoardData } from '../components/features/Board/type';
import { TaskSort, type SortCriteria } from '../components/features/Board/TaskSort';
import { TaskFilter } from '../components/features/Board/TaskFilter';
import type { SortOrder } from '../components/ui/Sort/Sort';
import type { TaskPriority, TaskStatus } from '../components/features/Task/type';

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
    columns: {
        'backlog': {
            id: 'backlog',
            title: 'Backlog',
            taskIds: ['task-1', 'task-2'],
        },
        'in-progress': {
            id: 'in-progress',
            title: 'In Progress',
            taskIds: ['task-3', 'task-4'],
        },
        'done': {
            id: 'done',
            title: 'Done',
            taskIds: ['task-5'],
        },
    },
    columnOrder: ['backlog', 'in-progress', 'done'],
};

const Home: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPriorities, setSelectedPriorities] = useState<TaskPriority[]>([]);
    const [selectedStatuses, setSelectedStatuses] = useState<TaskStatus[]>([]);
    const [sortConfig, setSortConfig] = useState<{ criteria: SortCriteria | null; order: SortOrder }>({
        criteria: null,
        order: 'asc',
    });

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

                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-indigo-500/25 active:scale-95 flex items-center gap-2 group">
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
                    initialData={initialBoardData} 
                    searchQuery={searchQuery}
                    selectedPriorities={selectedPriorities}
                    selectedStatuses={selectedStatuses}
                />
            </main>
        </div>
    );
};

export default Home;
