import React from 'react';
import { cn } from '../../utils';

type variant = 'primary' | 'secondary' | 'icon' | 'iconActive' | 'delete' | 'info' | 'confirm' | 'warning';

const classPerVariant = {
  primary:
    'flex py-2 items-center gap-2 rounded-md border bg-primary fill-white px-4 text-white hover:bg-primary-hover hover:scale-[1.02] disabled:cursor-not-allowed disabled:bg-gray-100 disabled:fill-gray-300 disabled:text-gray-300',
  secondary:
    'flex py-2 items-center gap-2 rounded-md border border-solid border-gray-300 fill-primary px-4 text-primary hover:bg-gray-100 disabled:cursor-not-allowed disabled:border-0 disabled:bg-gray-100 disabled:fill-gray-300 disabled:text-gray-300',
  icon: 'flex py-2 items-center rounded-md fill-primary px-1 hover:cursor-pointer hover:bg-gray-200 disabled:cursor-not-allowed disabled:fill-gray-300',
  iconActive:
    'flex py-2 items-center rounded-md bg-primary fill-white px-1 hover:cursor-pointer hover:bg-primary-hover disabled:cursor-not-allowed disabled:fill-gray-300',
  delete: 'flex py-2 items-center gap-2 rounded-md border bg-red-500 fill-white px-4 text-white',
  info: 'flex py-2 items-center gap-2 rounded-md border bg-primary fill-white px-4 text-white',
  confirm: 'flex py-2 items-center gap-2 rounded-md border bg-green-500 fill-white px-4 text-white',
  warning: 'flex py-2 items-center gap-2 rounded-md border bg-yellow-500 fill-white px-4 text-white',
};

type Props = {
  children: JSX.Element | string | (JSX.Element | string)[];
  variant: variant;
  className?: string;
  disabled?: boolean;
  title?: string;
  onClick?: () => void;
};

/**
 * Custom button with some defaults per variant
 * @return {JSX.Element}
 * @author Jens
 */
function Button({ children, variant, className, disabled, title, onClick }: Props): JSX.Element {
  return (
    <div title={title}>
      <button className={cn(classPerVariant[variant], className)} disabled={disabled} onClick={onClick}>
        {children}
      </button>
    </div>
  );
}

export { Button };
