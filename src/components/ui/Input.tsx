import { InputHTMLAttributes } from 'react';

interface Iprops extends InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ ...rest }: Iprops) => {
  return (
    <input
      className="border-[1px] border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-1 shadow-md focus:ring-indigo-500 p-3 rounded-md text-md"
      {...rest}
    />
  );
};

export default Input;
