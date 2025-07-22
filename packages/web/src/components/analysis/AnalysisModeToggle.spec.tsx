import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { AnalysisModeToggle } from './AnalysisModeToggle';
import { ANALYSIS_MODES } from '@ai-pe-fund/shared';

describe('AnalysisModeToggle', () => {
  const mockOnModeChange = vi.fn();
  const currentMode = ANALYSIS_MODES.PORTFOLIO_OVERVIEW;

  test('renders all analysis mode buttons', () => {
    render(
      <AnalysisModeToggle
        currentMode={currentMode}
        onModeChange={mockOnModeChange}
      />
    );

    expect(screen.getByText('Portfolio Overview')).toBeInTheDocument();
    expect(screen.getByText('Deal Flow')).toBeInTheDocument();
    expect(screen.getByText('Performance Analytics')).toBeInTheDocument();
    expect(screen.getByText('Market Analysis')).toBeInTheDocument();
    expect(screen.getByText('Risk Assessment')).toBeInTheDocument();
  });

  test('highlights current active mode', () => {
    render(
      <AnalysisModeToggle
        currentMode={currentMode}
        onModeChange={mockOnModeChange}
      />
    );

    const activeButton = screen.getByText('Portfolio Overview');
    expect(activeButton).toHaveClass('bg-primary-600', 'text-white');
  });

  test('calls onModeChange when different mode is clicked', () => {
    render(
      <AnalysisModeToggle
        currentMode={currentMode}
        onModeChange={mockOnModeChange}
      />
    );

    const dealFlowButton = screen.getByText('Deal Flow');
    fireEvent.click(dealFlowButton);

    expect(mockOnModeChange).toHaveBeenCalledWith(ANALYSIS_MODES.DEAL_FLOW);
  });

  test('applies custom className', () => {
    const customClass = 'custom-test-class';
    const { container } = render(
      <AnalysisModeToggle
        currentMode={currentMode}
        onModeChange={mockOnModeChange}
        className={customClass}
      />
    );

    expect(container.firstChild).toHaveClass(customClass);
  });

  test('shows description in title attribute', () => {
    render(
      <AnalysisModeToggle
        currentMode={currentMode}
        onModeChange={mockOnModeChange}
      />
    );

    const portfolioButton = screen.getByText('Portfolio Overview');
    expect(portfolioButton).toHaveAttribute(
      'title',
      'High-level portfolio performance and holdings'
    );
  });

  test('inactive buttons have correct styling', () => {
    render(
      <AnalysisModeToggle
        currentMode={currentMode}
        onModeChange={mockOnModeChange}
      />
    );

    const inactiveButton = screen.getByText('Deal Flow');
    expect(inactiveButton).toHaveClass('bg-gray-100', 'text-gray-700');
  });
});
