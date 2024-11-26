import { useState } from 'react';
import { Button } from '@/components/ui/button';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className='flex flex-col items-center'>
        <Button
          onClick={() => setCount((count) => count + 1)}
          className=' max-w-[20%]'>
          count is {count}
        </Button>
      </div>
    </>
  );
}

export default App;
