const Spinner = () => (
  <div className="flex justify-center items-center">
    <div
      className="border-blue-400 animate-spin inline-block w-8 h-8 border-solid border-r-transparent border-4 rounded-full"
      role="status"
    >
      <span className="hidden">Loading...</span>
    </div>
  </div>
);

export default Spinner;
