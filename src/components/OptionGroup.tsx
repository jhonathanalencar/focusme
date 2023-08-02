import { ReactNode, cloneElement } from 'react';

interface OptionGroupRootProps {
  children: ReactNode;
}

function OptionGroupRoot({ children }: OptionGroupRootProps) {
  return (
    <h2 className="mt-2 flex items-center gap-2 text-base font-bold text-theme-gray-200">
      {children}
    </h2>
  );
}

interface OptionGroupIconProps {
  icon: JSX.Element;
}

function OptionGroupIcon({ icon }: OptionGroupIconProps) {
  return cloneElement(icon, { className: 'h-5 w-5', weight: 'fill' });
}

interface OptionGroupTitleProps {
  children: ReactNode;
}

function OptionGroupTitle({ children }: OptionGroupTitleProps) {
  return <span>{children}</span>;
}

export const OptionGroup = {
  Root: OptionGroupRoot,
  Icon: OptionGroupIcon,
  Title: OptionGroupTitle,
};
