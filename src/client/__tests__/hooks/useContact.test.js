import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useContact } from '../../hooks/useContact';

vi.mock('../../services', () => ({ contactsService: { getById: vi.fn() } }));

import { contactsService } from '../../services';

describe('useContact Hook', () => {
  beforeEach(() => vi.clearAllMocks());

  it('loads a contact by id', async () => {
    contactsService.getById.mockResolvedValue({ data: { id: 7, firstName: 'Ada' } });
    const { result } = renderHook(() => useContact(7));

    expect(result.current.isLoading).toBe(true);
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(contactsService.getById).toHaveBeenCalledWith(7);
    expect(result.current.contact.firstName).toBe('Ada');
    expect(result.current.error).toBeNull();
  });

  it('exposes the error when the contact is missing', async () => {
    contactsService.getById.mockRejectedValue(new Error('Contact not found'));
    const { result } = renderHook(() => useContact(999));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.contact).toBeNull();
    expect(result.current.error.message).toBe('Contact not found');
  });
});
