export const Input = ({ ...props }) => {
  return (
    <input
      {...props}
      className="w-full bg-black border border-gold/20 rounded-lg py-3 px-4 text-gold placeholder-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/50"
    />
  );
};

export const TextArea = ({ ...props }) => {
  return (
    <textarea
      {...props}
      className="w-full bg-black border border-gold/20 rounded-lg py-3 px-4 text-gold placeholder-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/50"
    />
  );
};

export const Select = ({ children, ...props }: { children: React.ReactNode } & React.SelectHTMLAttributes<HTMLSelectElement>) => {
  return (
    <select
      {...props}
      className="w-full bg-black border border-gold/20 rounded-lg py-3 px-4 text-gold focus:outline-none focus:ring-2 focus:ring-gold/50"
    >
      {children}
    </select>
  );
}; 