import FunctionComp from "./FunctionComp";
import VariableComp from "./VariableComp";

const ContractOverview = () => {
  return (
    <>
      <div className="contract-overview-container">
        <h1>Variables</h1>
        <VariableComp name="node" description="store AiNode" />
        <h1>Functions</h1>
        <FunctionComp
          buttonText="get_node()"
          description="A function which return the current AI Node"
          result="<Address>"
        />
      </div>
    </>
  );
};

export default ContractOverview;
