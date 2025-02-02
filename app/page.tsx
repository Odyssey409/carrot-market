export default function Home() {
  return (
    <main className="flex items-center justify-center h-screen p-5 bg-gray-100 sm:bg-red-100 md:bg-green-100 lg:bg-cyan-100 xl:bg-orange-100 2xl:bg-purple-100 ">
      <div className="flex flex-col w-full max-w-screen-sm gap-2 p-5 bg-white shadow-xl rounded-3xl md:flex-row  *:outline-none has-[.peer]:bg-green-100 ring ring-transparent transition-shadow has-[:invalid]:bg-red-100 has-[:invalid]:ring-red-500 has-[:invalid]:ring">
        <input
          type="text"
          placeholder="Email address "
          required
          className="w-full h-10 py-3 pl-5 transition-shadow bg-gray-200 rounded-full ring ring-transparent focus:ring-green-500 focus:ring-offset-2 placeholder:drop-shadow invalid:focus:ring-red-500 peer "
        />
        <span className="hidden font-medium text-red-500 peer-invalid:block">
          Email is required
        </span>
        <button className="py-2 font-medium text-white transition-transform rounded-full active:scale-90 md:px-10 bg-gradient-to-tr from-cyan-500 via-yellow-400 to-purple-400 peer-invalid:from-red-500">
          Log in
        </button>
      </div>
    </main>
  );
}
