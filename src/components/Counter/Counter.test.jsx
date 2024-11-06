import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Provides additional matchers for testing
import { describe, it, expect } from 'vitest'; // Import from vitest
import Counter from '.';

describe('Counter Component', () => {
  it('renders the button with initial count of 0', () => {
    render(<Counter />);
    const buttonElement = screen.getByText(/Clicks: 0/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it('increments count when button is clicked', () => {
    render(<Counter />);
    const buttonElement = screen.getByText(/Clicks: 0/i);
    fireEvent.click(buttonElement);
    expect(buttonElement).toHaveTextContent('Clicks: 1');
  });

  it('increments multiple times when clicked multiple times', () => {
    render(<Counter />);
    const buttonElement = screen.getByText(/Clicks: 0/i);

    fireEvent.click(buttonElement);
    fireEvent.click(buttonElement);
    fireEvent.click(buttonElement);

    expect(buttonElement).toHaveTextContent('Clicks: 3');
  });

  const randomCount = Math.round(Math.random()*1000);
  it(`click random number of times = ${randomCount}`, () => {
    render(<Counter />)
    const buttonElement = screen.getByText(/Clicks: 0/i);
    for(let i=0;i<randomCount;i++){
      fireEvent.click(buttonElement);
    }
    setTimeout(()=>expect(buttonElement).toHaveTextContent(`Clicks: ${randomCount}`) , 100 )
  });
});
