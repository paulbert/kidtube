import { render } from '@testing-library/react';
import { MockedProvider } from "@apollo/client/testing";

import { BaseApp } from "./app";

function App() {
  return (
    <MockedProvider>
      <BaseApp />
    </MockedProvider>
  );
}

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });
});
