import { queryByRole, render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import App from './App';


test('renders learn react link', () => {
  render(<App />);
  const header = screen.getByRole("heading", {level: 1})
  expect(header).toBeInTheDocument();
});


test('on app render grid is rendered', () => {
  render(<App />);
  const gridContainer = screen.getByRole("grid-container")
  expect(gridContainer).toBeInTheDocument();
});

test('on app render start button is present', () => {
  render(<App />);
  const startButton = screen.getByRole("start-btn")
  expect(startButton).toBeInTheDocument();
});


test('on app render reset button is present', () => {
  render(<App />);
  const resetButton = screen.getByRole("reset-btn")
  expect(resetButton).toBeInTheDocument();
});


test('on app render difficulty select is present', () => {
  render(<App />);
  const difficultySelect = screen.getByRole("difficulty-select")
  expect(difficultySelect).toBeInTheDocument();
});

test('on app render timer is not displayed', () => {
  const {container, getByTestId, queryByRole} = render(<App />);
  const timer = queryByRole("timer")
  expect(timer).toBeNull();
});


test('on click of start button timer is displayed', async() => {
  const {container, getByTestId, findByRole} = render(<App />);

  fireEvent.click(screen.getByRole('start-btn'))
  // await screen.getByRole('timer')
  // await waitFor(() => {
  //   screen.getByRole('timer')
  // }, { timeout : 5000})
  // const timer =  await findByRole('timer')
  expect(await screen.findByRole('timer',{},{timeout : 2000})).toBeInTheDocument();
});
