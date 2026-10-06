import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { AppProvider, useAppContext } from '../../context/AppContext';

describe('AppContext', () => {
  it('throws a helpful error outside the provider', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useAppContext())).toThrow(/within an AppProvider/);
    vi.restoreAllMocks();
  });

  it('toggles dark mode', () => {
    const { result } = renderHook(() => useAppContext(), { wrapper: AppProvider });
    expect(result.current.isDarkMode).toBe(false);

    act(() => result.current.toggleTheme());
    expect(result.current.isDarkMode).toBe(true);

    act(() => result.current.toggleTheme());
    expect(result.current.isDarkMode).toBe(false);
  });
});
