import Button from "./Button";

interface FunctionCompProp {
  description: string;
  result: string;
  buttonText: string;
}

const FunctionComp = (
  {
    description = "Insert Description",
    result = "<Result>",
    buttonText = "getNodes()",
  }: FunctionCompProp,
) => {
  return (
    <>
      <div>
        <h2>get_nodes()</h2>
        <h3>Description</h3>
        <p>{description}</p>
        <Button buttonText={buttonText} />
        <h3>Result</h3>
        <p>{result}</p>
      </div>
    </>
  );
};
export default FunctionComp;
