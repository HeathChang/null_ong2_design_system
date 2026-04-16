import { render, screen } from '@testing-library/react';
import { Label } from './Label.ui';

describe('Label', () => {
  it('should render children text', () => {
    render(<Label>이메일</Label>);
    expect(screen.getByText('이메일')).toBeInTheDocument();
  });

  it('should render as label element', () => {
    render(<Label>레이블</Label>);
    expect(screen.getByText('레이블').tagName).toBe('LABEL');
  });

  it('should show required indicator when required is true', () => {
    render(<Label required>필수 항목</Label>);
    // aria-hidden된 별표는 접근성 트리에서 숨겨져 있음
    const label = screen.getByText('필수 항목').parentElement;
    expect(label).toHaveTextContent('*');
  });

  it('should not show required indicator when required is false', () => {
    render(<Label required={false}>선택 항목</Label>);
    const label = screen.getByText('선택 항목');
    expect(label.parentElement?.textContent).not.toContain('*');
  });

  it('should associate with input via htmlFor', () => {
    render(
      <>
        <Label htmlFor="username">사용자명</Label>
        <input id="username" type="text" />
      </>
    );
    expect(screen.getByLabelText('사용자명')).toBeInTheDocument();
  });

  it('should apply ds-label class', () => {
    render(<Label>레이블</Label>);
    // label 요소 자체에 클래스 적용됨
    const label = screen.getByText('레이블').closest('label');
    expect(label).toHaveClass('ds-label');
  });
});
