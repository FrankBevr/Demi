import { useEffect, useState } from "react";

import { ContractIds } from "@/deployments/deployments";
import {
  contractQuery,
  decodeOutput,
  useInkathon,
  useRegisteredContract,
} from "@scio-labs/use-inkathon";
import toast from "react-hot-toast";

import Button from "./Button";

interface FunctionCompProp {
  description: string;
  result: string;
  buttonText: string;
}

const FunctionComp = ({
  description = "Insert Description",
  result = "<Result>",
  buttonText = "getNodes()",
}: FunctionCompProp) => {
  const { error } = useInkathon();
  useEffect(() => {
    if (!error) return;
    toast.error(error.message);
  }, [error]);

  const { api, activeAccount, activeSigner } = useInkathon();
  const { contract, address: contractAddress } = useRegisteredContract(
    ContractIds.Demi,
  );

  /* Get Flip */
  const get = async () => {
    getNode();
  };
  const getNode = async () => {
    if (!contract || !api) return;
    const result = await contractQuery(api, "", contract, "get_node");
    const { output }: { output: boolean } = decodeOutput(
      result,
      contract,
      "get_node",
    );
    console.log(output);
  };

  return (
    <>
      <div>
        <h2>get_nodes()</h2>
        <h3>Description</h3>
        <p>{description}</p>
        <Button buttonText={buttonText} onClick={get} />
        <h3>Result</h3>
        <p>{result}</p>
      </div>
    </>
  );
};
export default FunctionComp;
