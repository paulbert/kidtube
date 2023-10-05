import { fireEvent, render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import Search, { videoSearchQuery } from './Search';

const mocks = [
  {
    request: {
      query: videoSearchQuery,
      variables: { query: 'cats' }
    },
    result: {
      data: {
        videoSearch: [
          {
            videoId: '1',
            title: 'Rainbow Cats',
            videoThumbnails: [{ url: '', height: 100, width: 200, quality: 'default' }]
          },
          {
            videoId: '2',
            title: 'Singing Cats',
            videoThumbnails: [{ url: '', height: 100, width: 200, quality: 'default' }]
          },
          {
            videoId: '3',
            title: 'Piano Cats',
            videoThumbnails: [{ url: '', height: 100, width: 200, quality: 'default' }]
          }
        ]
      }
    }
  },
  {
    request: {
      query: videoSearchQuery,
      variables: {}
    },
    result: {
      data: {
        videoSearch: []
      }
    }
  }
]

function renderSearch() {
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Search />
    </MockedProvider>
  );
}

describe('Search', () => {
  it('should render successfully', () => {
    const { baseElement } = renderSearch();
    expect(baseElement).toBeTruthy();
  });

  it('should have text input and button components', () => {
    const { getByPlaceholderText, getByRole } = renderSearch();
    expect(getByPlaceholderText('Search for videos')).toBeTruthy();
    expect(getByRole('button', { name: 'Search' })).toBeTruthy();
  });

  it('should display 0 grid items on load', () => {
    const { getAllByText } = renderSearch();
    try {
      getAllByText('Rainbow Cats');
      fail('Should not display search result');
    } catch (e) {
      if (!(e instanceof Error)) {
        fail('Unexpected error');
      }
      expect(e.message).toContain('Unable to find an element');
    }
  });

  it('should display 3 grid items after search', async () => {
    const { findAllByText, getByRole, getByPlaceholderText } = renderSearch();
    const inputField = getByPlaceholderText('Search for videos');
    const button = getByRole('button', { name: 'Search' });
    fireEvent.change(inputField, { target: { value: 'cats' } });
    fireEvent.click(button);
    expect(await findAllByText('Rainbow Cats')).toHaveLength(1);
    expect(await findAllByText('Singing Cats')).toHaveLength(1);
    expect(await findAllByText('Piano Cats')).toHaveLength(1);
  });
});
