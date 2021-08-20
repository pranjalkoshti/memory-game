import { render, screen } from '@testing-library/react';
import Grid from './grid'

test('grid component works for empty array',()=>{
 render(
    <Grid gridArray={[]} flag={false} level={4} onGameOver={()=>{}} />,
  );
})


test('grid component checks for null value',()=>{
  render(
     <Grid gridArray={null} flag={false} level={0} onGameOver={()=>{}} />,
   );
 })


 test('grid component contains tile with proper test id',()=>{
   let gridArray = [[1,2,3],[1,2,3],[4,5,6],[4,5,6]];

  const {container, getByTestId} = render(
     <Grid gridArray={gridArray} flag={false} level={4} onGameOver={()=>{}} />,
   );
   expect(getByTestId('tile-2-1')).toBeInTheDocument()
 })


 test('grid component does not contain tile with test id beyound range 1',()=>{
  let gridArray = [[1,2,3,4],[1,2,3,4],[4,5,6,7],[4,5,6,7]];

 const {container, getByTestId, queryByTestId} = render(
    <Grid gridArray={gridArray} flag={false} level={4} onGameOver={()=>{}} />,
  );
  expect(queryByTestId('tile-5-1')).toBeNull()
})

test('grid component does not contain tile with test id beyound range 2',()=>{
    let gridArray = [[1,2],[1,2]];
  
   const {container, getByTestId, queryByTestId} = render(
      <Grid gridArray={gridArray} flag={false} level={4} onGameOver={()=>{}} />,
    );
    expect(queryByTestId('tile-1-3')).toBeNull()
  })