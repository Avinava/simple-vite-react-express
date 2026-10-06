import { describe, it, expect, vi } from 'vitest';
import { errorHandler, apiNotFound, httpError } from '../middleware/error.js';

const mockRes = () => {
  const res = {};
  res.status = vi.fn(() => res);
  res.json = vi.fn(() => res);
  return res;
};

describe('error middleware', () => {
  it('maps a missing Prisma record (P2025) to 404', () => {
    const res = mockRes();
    errorHandler(Object.assign(new Error('x'), { code: 'P2025' }), {}, res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json.mock.calls[0][0]).toMatchObject({
      success: false,
      message: 'Record not found',
    });
  });

  it('maps unique / foreign key violations to 409', () => {
    for (const code of ['P2002', 'P2003']) {
      const res = mockRes();
      errorHandler(Object.assign(new Error('x'), { code }), {}, res, vi.fn());
      expect(res.status).toHaveBeenCalledWith(409);
    }
  });

  it('keeps the message and status of httpError', () => {
    const res = mockRes();
    errorHandler(httpError(404, 'Contact not found'), {}, res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json.mock.calls[0][0].message).toBe('Contact not found');
  });

  it('hides internals of unexpected errors', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const res = mockRes();
    errorHandler(new Error('db password is hunter2'), {}, res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(500);
    // NODE_ENV is not "development" under test
    expect(res.json.mock.calls[0][0].message).toBe('An unexpected error occurred');
    vi.restoreAllMocks();
  });

  it('returns a JSON 404 for unknown API routes', () => {
    const res = mockRes();
    apiNotFound({ method: 'GET', originalUrl: '/api/v1/nope' }, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json.mock.calls[0][0].message).toContain('GET /api/v1/nope');
  });
});
