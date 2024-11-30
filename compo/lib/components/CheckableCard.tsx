import React from 'react';

type Props = {
  id: string;
  text: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: () => void;
};

/**
 * Checkable Card component
 * @return {JSX.Element}
 * @author Carlos
 */
function CheckableCard({ id, text, checked, disabled, onChange }: Props): JSX.Element {
  return (
    <div
      className={`mb-2 flex h-10 w-52 items-center rounded-lg border border-solid border-gray-300 bg-white ${
        checked && 'border-blue-500'
      }`}
    >
      <input id={id} type="radio" disabled={disabled} checked={checked} onChange={onChange} className="m-5 h-5 w-5" />
      <label>{text}</label>
    </div>
  );
}

export { CheckableCard };
