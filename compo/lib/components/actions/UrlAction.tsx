import React from 'react';
import { useNavigate } from 'react-router-dom';

interface OsintActionProps {
  value?: string;
  option?: string;
  children: React.ReactNode;
  url: string;
  clickHandler?: () => void;
}

const UrlAction = ({ value, option, children,url,clickHandler }:OsintActionProps) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    const paramsUrl = (option && value) ? `?q=${value}&o=${option}` : '';
    navigate(`${url}${paramsUrl}`);
    clickHandler && clickHandler();
  };

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      {children}
    </div>
  );
};

export default UrlAction;
