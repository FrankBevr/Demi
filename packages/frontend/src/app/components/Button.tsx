interface ButtonProps {
  buttonText: string;
  className?: string;
}

const Button = ({ buttonText = "Click", className }: ButtonProps) => {
  return <button className={`button-default ${className}`}>{buttonText}</button>
}

export default Button
