function ChatSkeleton() {
  return (
    <div className="container mx-auto flex h-[88%] animate-pulse items-center justify-center space-x-10 bg-white p-10 align-middle">
      <div className="m-6 flex w-1/2 flex-col">
        <div className="h-20 w-full bg-gray-400"></div>
        {[...Array(5).keys()].map((n) => (
          <div key={n} className="m-6 flex items-center">
            <div className="h-10 w-10 rounded-full bg-gray-300"></div>{' '}
            <div className="ml-4 flex-1 space-y-2 py-1">
              <div className="h-4 w-3/4 rounded bg-gray-300"></div>{' '}
              <div className="h-4 rounded bg-gray-300"></div>{' '}
            </div>
          </div>
        ))}
      </div>
      <div className="flex w-1/2 flex-col">
        <div className="mb-6 h-20  bg-gray-400"></div>
        <div className="h-[450px]  bg-gray-300"></div>
      </div>
    </div>
  );
}

export default ChatSkeleton;
