import { render, screen } from '@testing-library/react';
import { Flex } from './Flex.ui';

describe('Flex', () => {
  it('should render as div with display flex', () => {
    render(<Flex data-testid="flex">내용</Flex>);
    expect(screen.getByTestId('flex')).toHaveStyle({ display: 'flex' });
  });

  it('should apply direction', () => {
    render(<Flex direction="column" data-testid="flex">내용</Flex>);
    expect(screen.getByTestId('flex')).toHaveStyle({ flexDirection: 'column' });
  });

  it('should apply align-items', () => {
    render(<Flex align="center" data-testid="flex">내용</Flex>);
    expect(screen.getByTestId('flex')).toHaveStyle({ alignItems: 'center' });
  });

  it('should apply justify-content', () => {
    render(<Flex justify="space-between" data-testid="flex">내용</Flex>);
    expect(screen.getByTestId('flex')).toHaveStyle({ justifyContent: 'space-between' });
  });

  it('should apply gap via spacing token', () => {
    render(<Flex gap="md" data-testid="flex">내용</Flex>);
    expect(screen.getByTestId('flex')).toHaveStyle({ gap: 'var(--ds-spacing-md)' });
  });

  it('should render as specified element', () => {
    render(<Flex as="nav" data-testid="flex">내용</Flex>);
    expect(screen.getByTestId('flex').tagName).toBe('NAV');
  });
});
