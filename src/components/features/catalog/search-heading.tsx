import { Search } from "lucide-react";

export function SearchHeading({
  count,
  term,
}: {
  count: number;
  term: string;
}) {
  return (
    <header className="flex min-h-[101px] flex-col gap-6 md:flex-row md:items-start md:gap-10">
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <p className="eyebrow">Search results</p>
        <h1 className="serif truncate text-[40px] leading-[48px]">
          Gifts for &ldquo;{term}&rdquo;
        </h1>
        <p className="text-sm leading-[17px] text-[#8a918a]">
          {count} {count === 1 ? "result" : "results"} matched your intent
        </p>
      </div>
      <form
        action="/shop"
        role="search"
        className="flex h-[52px] w-full items-center gap-3 rounded-[14px] border border-[var(--line)] px-4 md:w-[460px]"
      >
        <Search aria-hidden="true" size={18} />
        <label htmlFor="results-search" className="sr-only">
          Search gifts
        </label>
        <input
          id="results-search"
          name="search"
          defaultValue={term}
          maxLength={80}
          className="min-w-0 flex-1 bg-transparent text-[15px] outline-none"
        />
        <input type="hidden" name="sort" value="newest" />
        <button className="sr-only">Search</button>
      </form>
    </header>
  );
}
