"use client";

import { useCallback, useEffect, useState } from "react";

import { ContractIds } from "@/deployments/deployments";
import {
  contractQuery,
  decodeOutput,
  useInkathon,
  useRegisteredContract,
} from "@scio-labs/use-inkathon";
import { button, useControls } from "leva";
import toast from "react-hot-toast";

import Button from "./components/Button";
import Input from "./components/Input";
import Logo from "./components/Logo";

export default function HomePage() {
  const { error } = useInkathon();
  const { api } = useInkathon();
  const { contract } = useRegisteredContract(ContractIds.Demi);

  useEffect(() => {
    if (!error) return;
    toast.error(error.message);
  }, [error]);

  const [owner, setOwner] = useControls(() => ({
    onwerName: {
      label: "owner",
      value: "5Hr.....",
      onChange: (c) => {
        setOwner({ onwerName: c });
        toast.success("Owner changed");
      },
    },
    getOwner: button(() => getOwner()),
  }));

  const [validator, setValidator] = useControls(() => ({
    validatorName: {
      label: "validator",
      value: "5Hr.....",
      onChange: (c) => {
        setValidator({ validatorName: c });
        toast.success("Validator changed");
      },
    },
    getValidator: button(() => getValidator()),
  }));

  const [node, setNode] = useControls(() => ({
    nodeName: {
      label: "node",
      value: "5Hr.....",
      onChange: (c) => {
        setNode({ nodeName: c });
        toast.success("Node changed");
      },
    },
    getNode: button(() => getNode()),
  }));


  const getOwner = useCallback(async () => {
    if (!contract || !api) return;
    const result = await contractQuery(api, "", contract, "get_owner");
    const { output }: { output: boolean } = decodeOutput(
      result,
      contract,
      "get_owner",
    );
    setOwner({ onwerName: output.toString() });
  }, [contract, api]);

  const getValidator = useCallback(async () => {
    if (!contract || !api) return;
    const result = await contractQuery(api, "", contract, "get_validator");
    const { output }: { output: boolean } = decodeOutput(
      result,
      contract,
      "get_validator",
    );
    setValidator({ validatorName: output.toString() });
  }, [contract, api]);

  const getNode = useCallback(async () => {
    if (!contract || !api) return;
    const result = await contractQuery(api, "", contract, "get_node");
    const { output }: { output: boolean } = decodeOutput(

      result,
      contract,
      "get_node",
    );
    setNode({ nodeName: output.toString() });
  }, [contract, api]);

  useEffect(() => {
    getOwner();
    getValidator()
    getNode()
  }, [getOwner, getValidator, getNode, contract, api]);


  return (
    <>
      {api && contract && (
        <>
          <div className="overflow-x-hidden-container">
            <div className="center-container">
              <div className="flex-container">
                <Logo />
                <Input placeholder="Describe your Data" />
                <Button buttonText="generate" className="margin-left-auto" />
              </div>
            </div>
          </div>
        </>
      )}
      {!api || (!contract && <div></div>)}
    </>
  );
}
