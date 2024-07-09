import clsx from "clsx"

const SortSelect = ({ className, value, onChange, nameSort }) => (
  <select
    className={clsx(
      "text-md text-center appearance-none bg-transparent border border-stone-700 rounded py-[12px] px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500 hover:cursor-pointer",
      className
    )}
    value={value}
    onChange={onChange}>
    <option value="">-- Trier --</option>
    <option value="name-asc">{nameSort} (A-Z)</option>
    <option value="name-desc">{nameSort} (Z-A)</option>
    <option value="newest">Le plus récent</option>
    <option value="oldest">Le plus ancien</option>
  </select>
)

export default SortSelect
