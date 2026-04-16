import { render, screen } from '@testing-library/react';
import { Heading } from './Heading.ui';

describe('Heading', () => {
  it('should render as h2 by default', () => {
    render(<Heading>제목</Heading>);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('should render as specified heading level', () => {
    render(<Heading as="h1">메인 제목</Heading>);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('should render correct text', () => {
    render(<Heading as="h3">섹션 제목</Heading>);
    expect(screen.getByText('섹션 제목')).toBeInTheDocument();
  });

  it('should apply ds-heading class', () => {
    render(<Heading>제목</Heading>);
    expect(screen.getByRole('heading')).toHaveClass('ds-heading');
  });

  it('should apply additional className', () => {
    render(<Heading className="page-title">제목</Heading>);
    expect(screen.getByRole('heading')).toHaveClass('page-title');
  });
});
