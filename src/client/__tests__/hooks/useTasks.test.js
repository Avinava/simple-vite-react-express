import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useTasks } from '../../hooks/useTasks';

vi.mock('../../services', () => ({
  tasksService: {
    getAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    updateStatus: vi.fn(),
    delete: vi.fn(),
  },
  TaskStatus: { TODO: 'TODO', IN_PROGRESS: 'IN_PROGRESS', REVIEW: 'REVIEW', DONE: 'DONE' },
}));

vi.mock('react-toastify', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

import { tasksService } from '../../services';

const mockTasks = [
  { id: 1, title: 'Write docs', status: 'TODO', priority: 'LOW', projectId: 1 },
  { id: 2, title: 'Fix bug', status: 'DONE', priority: 'HIGH', projectId: 2 },
  { id: 3, title: 'Review PR', status: 'TODO', priority: 'HIGH', projectId: 1 },
];

describe('useTasks Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    tasksService.getAll.mockResolvedValue({ data: mockTasks });
  });

  it('fetches tasks on mount', async () => {
    const { result } = renderHook(() => useTasks());
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.tasks).toHaveLength(3);
  });

  it('filters by status and priority together', async () => {
    const { result } = renderHook(() => useTasks({ status: 'TODO', priority: 'HIGH' }));

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.tasks.map((t) => t.id)).toEqual([3]);
    expect(result.current.allTasks).toHaveLength(3);
  });

  it('updates status through the PATCH endpoint and local state', async () => {
    tasksService.updateStatus.mockResolvedValue({ data: { id: 1, status: 'DONE' } });
    const { result } = renderHook(() => useTasks());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(() => result.current.updateTaskStatus(1, 'DONE'));

    expect(tasksService.updateStatus).toHaveBeenCalledWith(1, 'DONE');
    expect(result.current.tasks.find((t) => t.id === 1).status).toBe('DONE');
  });

  it('removes a deleted task from state', async () => {
    tasksService.delete.mockResolvedValue({});
    const { result } = renderHook(() => useTasks());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(() => result.current.deleteTask(2));

    expect(result.current.tasks.map((t) => t.id)).toEqual([1, 3]);
  });

  it('refetches to revert when a delete fails', async () => {
    tasksService.delete.mockRejectedValue(new Error('boom'));
    const { result } = renderHook(() => useTasks());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      await expect(result.current.deleteTask(2)).rejects.toThrow('boom');
    });

    expect(tasksService.getAll).toHaveBeenCalledTimes(2);
  });
});
