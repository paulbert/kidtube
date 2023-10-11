import { fireEvent, render } from '@testing-library/react';
import VideoSearchCard from './VideoSearchCard';

const mockVideo = {
  videoId: '1',
  title: 'Rainbow Cats',
  videoThumbnails: [{ url: 'http://roygbivcat.jpg', height: 100, width: 200, quality: 'medium' }]
};

function renderVideoSearchCard() {
  return render(<VideoSearchCard title={mockVideo.title} videoThumbnails={mockVideo.videoThumbnails} />)
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