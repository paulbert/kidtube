import { render } from '@testing-library/react';
import VideoSearchCard from './VideoSearchCard';
import { MockedProvider } from '@apollo/client/testing';
import { getAllGroupsQuery } from './VideoAddModal';

const mockVideo = {
  videoId: '1',
  title: 'Rainbow Cats',
  videoThumbnails: [
    {
      url: 'http://roygbivcat.jpg',
      height: 100,
      width: 200,
      quality: 'medium',
    },
  ],
  order: 1,
};

const mocks = [
  {
    request: {
      query: getAllGroupsQuery,
    },
    result: {
      data: {
        getAllGroups: [
          {
            id: 1,
            name: 'Rainbow Cats Forever',
            seasons: { id: 1, order: 1 },
          },
        ],
      },
    },
  },
];

function renderVideoSearchCard() {
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <VideoSearchCard video={mockVideo} />
    </MockedProvider>
  );
}

describe('VideoSearchCard', () => {
  it('should display video thumbnail', () => {
    const { getByRole } = renderVideoSearchCard();
    const image = getByRole('img');

    expect(image.getAttribute('src')).toBe('http://roygbivcat.jpg');
  });

  it('should display video title', () => {
    const { getByText } = renderVideoSearchCard();

    expect(getByText('Rainbow Cats')).toBeTruthy();
  });
});
