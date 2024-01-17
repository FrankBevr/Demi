interface InputProps {
  placeholder?: string;
}

const Input = ({ placeholder = "Placeholder" }: InputProps) => {
  return (
    <input name="input" className="input-default" placeholder={placeholder} />
  );
};
export default Input;
