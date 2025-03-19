 export default function ExampleDash() {
  return (
      <div className='flex items-center rounded-md bg-green-200 p-4'>
        <img
          src='https://images.unsplash.com/photo-1640043959259-41ba58cc3ab3?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          alt='Profile Picture'
          className='mr-4 h-14 w-14 rounded-full'
        ></img>
        <div className='flex flex-col'>
          <h2 className='mb-3 block text-base text-gray-700'>
            Welcome back, <span className='font-bold'>John Doe</span>
          </h2>
          <button className='rounded bg-primary px-3 py-1 text-sm font-bold text-white'>Manage Account</button>
        </div>
      </div>
    );
}
