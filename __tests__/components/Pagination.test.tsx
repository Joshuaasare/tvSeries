import * as React from 'react';
import Pagination from '../../app/shared/components/Pagination/Pagination';
import * as renderer from 'react-test-renderer';

describe('Pagination component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Pagination currPage={1} setCurrPage={jest.fn()} visiblePageLength={4} />,
    );
    expect(tree).toMatchSnapshot();
  });
});
