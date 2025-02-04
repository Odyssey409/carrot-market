export default function Home() {
  return (
    <main className="flex items-center justify-center h-screen p-5 bg-gray-100 sm:bg-red-100 md:bg-green-100 lg:bg-cyan-100 xl:bg-orange-100 2xl:bg-purple-100 ">
      <div className="flex flex-col w-full max-w-screen-sm gap-3 p-5 bg-white shadow-lg rounded-3xl ">
        {["Nico", "Me", "You", "Yourself", ""].map((person, index) => (
          <div key={index} className="flex items-center gap-5 group ">
            <div className="bg-blue-400 rounded-full size-10" />
            <span className="text-lg font-medium empty:w-24 empty:h-5 empty:rounded-full empty:animate-pulse empty:bg-gray-300 group-hover:text-red-500 ">
              {person}
            </span>
            <div className="relative flex items-center justify-center text-white bg-red-500 rounded-full size-6">
              <span className="z-10">{index}</span>
              <div className="absolute bg-red-500 rounded-full size-6 animate-ping" />
            </div>
          </div>
        ))}
        <div className="flex flex-col group">
          <input
            className="w-full bg-gray-100"
            placeholder="Write your email"
          />
          <span className="hidden group-focus-within:block">
            Make sure it is a valid email
          </span>
          <button>submit</button>
        </div>
      </div>
    </main>
  );
}
