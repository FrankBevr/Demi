"use client";
import { useEffect, useState } from "react";
import { contractQuery, decodeOutput, useInkathon, useRegisteredContract } from "@scio-labs/use-inkathon";
import Button from "./components/Button";
import Input from "./components/Input";
import Logo from "./components/Logo";
import { button, useControls } from "leva";
import toast from "react-hot-toast";
import { ContractIds } from "@/deployments/deployments";

export default function HomePage() {
  const { error } = useInkathon();
  const { api } = useInkathon();
  const { contract } = useRegisteredContract(ContractIds.Demi);

  useEffect(() => {
    if (!error) return;
    toast.error(error.message);
  }, [error]);

  useEffect(() => {
    if (contract && api) {
      getNode();
    }
  }, [contract, api]);


  const [owner, setOwner] = useControls(() => ({
    name: {
      label: "owner",
      value: "5Hr.....",
      onChange: (c) => {
        setOwner({ name: c });
      },
    },
  }));

  useControls(
    {
      "getOwner": button(() => getNode())
    }
  );

  const getNode = async () => {
    if (!contract || !api) return;
    const result = await contractQuery(api, "", contract, "get_node");
    const { output }: { output: boolean } = decodeOutput(result, contract, "get_node");
    setOwner({ name: output.toString() })
  };

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
      {!api || !contract && <div></div>}
    </>
  );
}
