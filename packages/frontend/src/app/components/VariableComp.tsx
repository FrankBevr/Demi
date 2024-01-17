interface VariableCompProp {
  name: string;
  description: string;
}
const VariableComp = ({
  name = "Node",
  description = "Nodes store all participating ai Nodes",
}: VariableCompProp) => {
  return (
    <>
      <div>
        <h2>{name}</h2>
        <h3>Description</h3>
        <p>{description}</p>
        <p>Nodes store all participating ai Nodes</p>
      </div>
    </>
  );
};

export default VariableComp;
