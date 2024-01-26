"use client";

import { useEffect, useState } from "react";
import { ContractIds } from "@/deployments/deployments";
import {
  contractQuery,
  contractTx,
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
  const { api, activeAccount } = useInkathon();
  const { contract } = useRegisteredContract(ContractIds.Demi);

  /*Toast occuring Error*/
  useEffect(() => {
    if (!error) return;
    toast.error(error.message);
  }, [error]);

  /*************************************/
  /*Handling Read Functions in Debug UI*/
  /*************************************/

  const [owner, setOwner] = useControls("READ", () => ({
    ownerName: {
      label: "owner",
      value: "5Hr.....",
      disabled: true,
    },
    getOwner: button(() => {
      if (!contract || !api) return;
      (async () => {
        const result = await contractQuery(api!, "", contract!, "get_owner");
        const { output }: { output: boolean } = decodeOutput(
          result,
          contract!,
          "get_owner",
        );
        setOwner({ ownerName: output.toString() });
      })()
    }
    ),
  }), [api, contract]);

  const [validator, setValidator] = useControls("READ", () => ({
    validatorName: {
      label: "validator",
      value: "5Hr.....",
      disabled: true,
    },
    getValidator: button(() => {
      if (!contract || !api) return;
      (async () => {
        const result = await contractQuery(api!, "", contract!, "get_validator");
        const { output }: { output: boolean } = decodeOutput(
          result,
          contract!,
          "get_validator",
        );
        setValidator({ validatorName: output.toString() });
      })()
    }),
  }), [api, contract]);

  const [node, setNode] = useControls("READ", () => ({
    nodeName: {
      label: "node",
      value: "5Hr.....",
      disabled: true,
    },
    getNode: button(() => {
      if (!contract || !api) return;
      (async () => {
        const result = await contractQuery(api!, "", contract!, "get_node");
        const { output }: { output: boolean } = decodeOutput(
          result,
          contract!,
          "get_node",
        );
        setNode({ nodeName: output.toString() });
      })()
    }),
  }), [api, contract]);

  /**************************************/
  /*Handling Write Functions in Debug UI*/
  /**************************************/

  const [isInit, setIsInit] = useState(false)
  const [newNodi, setNewNodi] = useState('')
  const [newOwni, setNewOwni] = useState('')
  const [newVali, setNewVali] = useState('')


  useControls("WRITE", () => ({
    callInit: button(() => {
      if (!contract || !api || activeAccount!) return;
      (async () => {
        await contractTx(
          api,
          activeAccount!.address,
          contract,
          "init",
          {},
          [],
        );
        setIsInit(true)
        console.log(`isInit is now ${isInit}`)
      })()
    }),
  }), [api, contract, activeAccount]);

  useControls("WRITE", () => ({
    newOwnerInput: {
      label: "newOwnerInput",
      value: "...",
      onChange: (c) => { setNewOwni(c) },
      transient: true,
    },
    setNewOwner: button(() => {
      if (!contract || !api) return;
      (async () => {
        await contractTx(api!, activeAccount?.address!, contract!, "set_owner", {}, [
          newOwni,
        ]);
      })()
    }),
  }), [newNodi, api, contract]);

  useControls("WRITE", () => ({
    newNodeInput: {
      label: "newNodeInput",
      value: "...",
      onChange: (c) => { setNewNodi(c) },
      transient: true
    },
    setNewNode: button(() => {
      if (!contract || !api) return;
      (async () => {
        await contractTx(api!, activeAccount?.address!, contract!, "set_node", {}, [newNodi]);
      })()
    }
    ),
  }), [newNodi, api, contract]);

  useControls("WRITE", () => ({
    newValidatorInput: {
      label: "newValidatorInput",
      value: "...",
      onChange: (c) => { setNewVali(c) },
      transient: true
    },
    setNewValidator: button(() => {
      if (!contract || !api) return;
      (async () => {
        await contractTx(api!, activeAccount?.address!, contract!, "set_validator", {}, [
          newVali,
        ]);
      })()
    }),
  }), [newVali, api, contract]);

  if (!api || !contract) {
    return <div>Loading...Please wait...</div>;
  }

  return (
    <div className="overflow-x-hidden-container">
      <div className="center-container">
        <div className="flex-container">
          <Logo />
          <Input placeholder="Describe your Data" />
          <Button buttonText="generate" className="margin-left-auto" />
        </div>
      </div>
    </div>
  );
}
