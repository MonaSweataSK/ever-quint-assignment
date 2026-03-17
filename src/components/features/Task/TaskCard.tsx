import React from 'react';
import type { TaskCardProps, TaskPriority } from '../../../types/Task.type';
import Tag from '../../ui/Tag/Tag';
import { getTagColorScheme } from '../../../utils/tagColors';

/**
 * Computes a human-readable relative time string from a given date.
 */
function getRelativeTime(date: Date): string {
  const now = Date.now();
  const diffMs = now - date.getTime();
  const seconds = Math.floor(diffMs / 1000);

  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

/** Maps priority to a color-coded Tag variant */
const priorityConfig: Record<TaskPriority, { label: string; variant: 'error' | 'warning' | 'info' }> = {
  high: { label: 'High', variant: 'error' },
  medium: { label: 'Medium', variant: 'warning' },
  low: { label: 'Low', variant: 'info' },
};

/**
 * A premium Task Card component.
 * Displays task title, priority badge, assignee, tags, and relative time.
 */
export const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  priority,
  assignee,
  tags,
  updatedAt,
  className = '',
  onClick,
}) => {
  const priorityInfo = priorityConfig[priority];
  const hasAssignee = !!assignee?.trim();
  const initials = hasAssignee 
    ? assignee
      .split(' ')
      .filter(Boolean)
      .map((n: string) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
    : '?';

  return (
    <article
      id={`task-card-${id}`}
      onClick={() => onClick?.(id)}
      className={`
        group bg-white rounded-xl border border-gray-200 shadow-sm
        hover:shadow-md hover:-translate-y-0.5
        transition-all duration-200 ease-out
        p-4 flex flex-col gap-3 cursor-pointer
        ${className}
      `}
    >
      {/* ── Header: title + priority + actions ── */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">
          {title}
        </h3>
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="flex items-center opacity-0 group-hover:opacity-100 transition-all duration-200">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClick?.(id, true);
              }}
              className="p-1 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
              title="Edit Task"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>
          <Tag
            label={priorityInfo.label}
            variant={priorityInfo.variant}
            size="sm"
            dot
          />
        </div>
      </div>

      {/* ── Tags ── */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 overflow-hidden max-h-12">
          {tags.slice(0, 5).map((tag) => (
            <Tag 
              key={tag} 
              label={tag} 
              variant={getTagColorScheme(tag)} 
              size="sm" 
            />
          ))}
          {tags.length > 5 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-gray-100 text-gray-600 border border-gray-200 uppercase tracking-wider shadow-sm">
              +{tags.length - 5} more
            </span>
          )}
        </div>
      )}

      {/* ── Footer: assignee + relative time ── */}
      <div className="flex items-center justify-between pt-1 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <span className={`w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center shadow-sm ${hasAssignee ? 'bg-gradient-to-br from-violet-500 to-indigo-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
            {initials}
          </span>
          <span className={`text-xs font-medium ${hasAssignee ? 'text-gray-600' : 'text-gray-400 italic'}`}>
            {hasAssignee ? assignee : 'No Assignee'}
          </span>
        </div>
        <span className="text-[11px] text-gray-400 font-medium">
          {getRelativeTime(updatedAt)}
        </span>
      </div>
    </article>
  );
};

export default TaskCard;
