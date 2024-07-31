/* eslint-disable react/prop-types */

const ActionItemButton = ({ className, children, ...rest }) => {
  return (
    <button
      className={`rounded-lg text-white flex flex-row items-center gap-[6px] text-[12px] focus:outline-none p-1 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default ActionItemButton;
