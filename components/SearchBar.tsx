"use client";

type Props = {
  search: string;
  setSearch: (value: string) => void;
};

export default function SearchBar({
  search,
  setSearch,
}: Props) {
  return (
    <div className="max-w-3xl mx-auto mb-10">
      <input
        type="text"
        placeholder="Search Products..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full px-6 py-4 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 text-lg"
      />
    </div>
  );
}