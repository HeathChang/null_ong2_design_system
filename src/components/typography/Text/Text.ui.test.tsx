import { render, screen } from '@testing-library/react';
import { Text } from './Text.ui';

describe('Text', () => {
  it('should render as <p> by default', () => {
    render(<Text>텍스트 내용</Text>);
    expect(screen.getByText('텍스트 내용').tagName).toBe('P');
  });

  it('should render as specified element via as prop', () => {
    render(<Text as="span">인라인 텍스트</Text>);
    expect(screen.getByText('인라인 텍스트').tagName).toBe('SPAN');
  });

  it('should apply ds-text class', () => {
    render(<Text>텍스트</Text>);
    expect(screen.getByText('텍스트')).toHaveClass('ds-text');
  });

  it('should apply additional className', () => {
    render(<Text className="custom">텍스트</Text>);
    expect(screen.getByText('텍스트')).toHaveClass('custom');
  });

  it('should render children', () => {
    render(<Text>안녕하세요</Text>);
    expect(screen.getByText('안녕하세요')).toBeInTheDocument();
  });
});
