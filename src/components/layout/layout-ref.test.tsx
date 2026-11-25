import { createRef } from 'react';
import { render } from '@testing-library/react';
import { Box } from './Box';
import { Container } from './Container';
import { Flex } from './Flex';
import { Grid } from './Grid';
import { Stack } from './Stack';
import { Text } from '../typography/Text';

/**
 * 타입은 ref를 허용하는데 런타임이 조용히 버리던 문제의 회귀 테스트.
 * (React 18의 함수 컴포넌트는 forwardRef 없이는 ref를 받지 못한다)
 */
describe('레이아웃 컴포넌트의 ref 전달', () => {
  it.each([
    ['Box', (ref: React.Ref<HTMLDivElement>) => <Box ref={ref}>x</Box>, 'DIV'],
    ['Flex', (ref: React.Ref<HTMLDivElement>) => <Flex ref={ref}>x</Flex>, 'DIV'],
    ['Grid', (ref: React.Ref<HTMLDivElement>) => <Grid ref={ref}>x</Grid>, 'DIV'],
    ['Stack', (ref: React.Ref<HTMLDivElement>) => <Stack ref={ref}>x</Stack>, 'DIV'],
    ['Container', (ref: React.Ref<HTMLDivElement>) => <Container ref={ref}>x</Container>, 'DIV'],
  ])('should forward ref to the rendered element: %s', (_name, renderWith, tagName) => {
    const ref = createRef<HTMLDivElement>();
    render(renderWith(ref));
    expect(ref.current?.tagName).toBe(tagName);
  });

  it('should forward ref to the rendered element: Text', () => {
    const ref = createRef<HTMLParagraphElement>();
    render(<Text ref={ref}>x</Text>);
    expect(ref.current?.tagName).toBe('P');
  });

  it('should forward ref to the element chosen with `as`', () => {
    const ref = createRef<HTMLElement>();
    render(
      <Box as="section" ref={ref}>
        x
      </Box>
    );
    expect(ref.current?.tagName).toBe('SECTION');
  });
});
