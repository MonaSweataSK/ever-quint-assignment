import React, { useState, useRef, useEffect } from 'react';

export type SortOrder = 'asc' | 'desc';

export interface SortOption<T> {
    id: T;
    label: string;
    icon?: React.ReactNode;
    defaultOrder?: SortOrder;
}

interface SortProps<T> {
    options: SortOption<T>[];
    onSort: (criteria: T, order: SortOrder) => void;
    onClear: () => void;
    currentCriteria: T | null;
    currentOrder: SortOrder;
    renderTrigger: (isOpen: boolean) => React.ReactNode;
    className?: string;
    align?: 'left' | 'right';
    title?: string;
}

export function Sort<T extends string>({
    options,
    onSort,
    onClear,
    currentCriteria,
    currentOrder,
    renderTrigger,
    className = '',
    align = 'right',
    title = 'Sort By'
}: SortProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const handleSortClick = (option: SortOption<T>) => {
        const isCurrent = currentCriteria === option.id;
        let nextOrder: SortOrder;

        if (isCurrent) {
            nextOrder = currentOrder === 'asc' ? 'desc' : 'asc';
        } else {
            nextOrder = option.defaultOrder || 'asc';
        }

        onSort(option.id, nextOrder);
        setIsOpen(false);
    };

    return (
        <div className={`relative ${className}`} ref={menuRef}>
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                {renderTrigger(isOpen)}
            </div>

            {isOpen && (
                <div className={`absolute ${align === 'right' ? 'right-0' : 'left-0'} mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 z-[100] animate-in fade-in slide-in-from-top-2 duration-200`}>
                    <div className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        {title}
                    </div>
                    
                    {options.map((option) => {
                        const isCurrent = currentCriteria === option.id;
                        return (
                            <button
                                key={option.id}
                                onClick={() => handleSortClick(option)}
                                className="w-full text-left px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between group transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                                        isCurrent 
                                            ? 'bg-indigo-100 text-indigo-600' 
                                            : 'bg-gray-50 text-gray-500 group-hover:bg-indigo-50 group-hover:text-indigo-500'
                                    }`}>
                                        {option.icon || (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                                            </svg>
                                        )}
                                    </div>
                                    <span>{option.label}</span>
                                </div>
                                {isCurrent && (
                                    <span className="text-[10px] bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded font-bold uppercase transition-all duration-300 scale-110">
                                        {currentOrder}
                                    </span>
                                )}
                            </button>
                        );
                    })}

                    {currentCriteria && (
                        <>
                            <div className="h-px bg-gray-100 my-2 mx-3" />
                            <button
                                onClick={() => {
                                    onClear();
                                    setIsOpen(false);
                                }}
                                className="w-full text-left px-5 py-2.5 text-sm text-red-500 hover:bg-red-50 flex items-center gap-3 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                <span>Reset Sorting</span>
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default Sort;
