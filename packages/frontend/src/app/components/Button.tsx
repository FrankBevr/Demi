interface ButtonProps {
  buttonText: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ buttonText = "Click", className, onClick }: ButtonProps) => {
  return (
    <button className={`button-default ${className}`} onClick={onClick}>
      {buttonText}
    </button>
  );
};

export default Button;
