
import React, { SelectHTMLAttributes } from 'react';
import cn from 'classnames';

export interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  inputClassName?: string;
  label?: string;
  name: string;
  error?: string;
  shadow?: boolean;
  variant?: 'normal' | 'solid' | 'outline';
  options: Array<String>;
}
const optionsClass = {
    fontSize: "1.5rem",
    color: "#6B7280",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
    cursor: "pointer",
    borderBottom: "1px solid #E5E7EB",
    // backgroundColor: '&:checked'
    //   ? "#E5E7EB"
    //   : '&:hover'
    //   ? "#F9FAFB"
    //   : "#ffffff",
}
// const optionsClass = {
//   // normal:'bg-[ffffff]',
//   // checked:'bg-[#E5E7EB]',
//   // hover:'bg-[#F9FAFB]'

// }
const variantClasses = {
  normal:
    'bg-gray-100 border border-border-base focus:shadow focus:bg-light focus:border-accent',
  solid:
    'bg-gray-100 border border-border-100 focus:bg-light focus:border-accent',
  outline: 'border border-border-base focus:border-accent',
};

const SelectBox = React.forwardRef<HTMLSelectElement, Props>((props, ref) => {
  const {
    className,
    label,
    name,
    error,
    variant = 'normal',
    shadow = false,
    inputClassName,
    options,
    ...rest
  } = props;
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={name}
          className="block text-body-dark font-semibold text-sm leading-none mb-3"
        >
          {label}
        </label>
      )}
      <select
        id={name}
        name={name}
        className={cn(
          'px-4 py-3 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0',
          shadow && 'focus:shadow',
          variantClasses[variant],
          inputClassName
        )}
        
        ref={ref}
        {...rest}
      >
        {options?.map((option,index)=><option style={optionsClass} key={index} >{option}</option>)}
      </select>
      {error && <p className="my-2 text-xs text-red-500">{error}</p>}
    </div>
  );
});
SelectBox.displayName = 'SelectBox';
export default SelectBox;
