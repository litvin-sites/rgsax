export default function ButtonPrimary({ children, customClasses }) {
  return (
    <button
      className={`px-5 uppercase py-2 mt-3 text-white whitespace-nowrap font-bold text-base bg-red-500 rounded-full transition-all hover:border-red-500${customClasses ? ` ${customClasses}` : ''}`}
    >
      {children}
    </button>
  );
}
