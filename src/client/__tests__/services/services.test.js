import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../services/api', () => ({
  default: { get: vi.fn(), post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() },
}));

import api from '../../services/api';
import { tasksService } from '../../services/tasks';
import { projectsService } from '../../services/projects';
import { contactsService } from '../../services/contacts';

// These URLs must match src/server/routes/v1/* (see docs/api.md)
describe('service URLs match the API', () => {
  beforeEach(() => vi.clearAllMocks());

  it('contacts', () => {
    contactsService.getAll();
    contactsService.create({ a: 1 });
    expect(api.get).toHaveBeenCalledWith('/contact/list');
    expect(api.post).toHaveBeenCalledWith('/contact', { a: 1 });
  });

  it('tasks', () => {
    tasksService.create({ title: 't' });
    tasksService.updateStatus(4, 'DONE');
    expect(api.post).toHaveBeenCalledWith('/task/create', { title: 't' });
    expect(api.patch).toHaveBeenCalledWith('/task/4/status', { status: 'DONE' });
  });

  it('projects', () => {
    projectsService.create({ name: 'p' });
    projectsService.addMember(2, 5);
    expect(api.post).toHaveBeenCalledWith('/project/create', { name: 'p' });
    expect(api.post).toHaveBeenCalledWith('/project/2/members', { contactId: 5, role: 'member' });
  });
});
