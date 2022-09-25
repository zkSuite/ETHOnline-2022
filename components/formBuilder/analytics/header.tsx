const Header = ({
  responses,
  activePage,
  search,
  isRestricted,
  setActivePage,
  setSearch,
}: {
  responses: number;
  activePage: number;
  search: string;
  isRestricted: boolean;
  setActivePage: (page: number) => void;
  setSearch: (search: string) => void;
}) => {
  return (
    <div className="shadow-md rounded-md bg-white">
      <div className="p-4">
        <h2 className="text-xl md:text-3xl font-medium">
          {responses} responses
        </h2>
      </div>
      <ul
        className={`grid ${
          isRestricted ? 'grid-cols-1' : 'grid-cols-2'
        } text-sm font-normal text-center text-gray-700 border-b border-gray-200`}
      >
        <li
          className={`cursor-pointer p-4 text-green-700
            ${activePage === 0 ? 'bg-gray-100  rounded-t-lg' : ''}
          `}
          onClick={() => setActivePage(0)}
        >
          Summary
        </li>
        {!isRestricted && (
          <li
            className={`cursor-pointer p-4 text-green-700
            ${activePage === 1 ? 'bg-gray-100  rounded-t-lg' : ''}
          `}
            onClick={() => setActivePage(1)}
          >
            Responses
          </li>
        )}
      </ul>
      {activePage === 1 && (
        <div className="p-4 flex items-center">
          <input
            type="text"
            placeholder="Search by wallet address"
            value={search}
            onChange={(e: any) => setSearch(e.target.value)}
            className="input"
          />
          <button className="btn !shadow-none bg-gray-100">
            <img src="/static/search.svg" alt="search" className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
