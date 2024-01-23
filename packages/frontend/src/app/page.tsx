"use client";

import { useCallback, useEffect, useState } from "react";

import { ContractIds } from "@/deployments/deployments";
import { decodeAddress } from "@polkadot/util-crypto";
import {
  contractQuery,
  contractTx,
  decodeOutput,
  useInkathon,
  useRegisteredContract,
} from "@scio-labs/use-inkathon";
import { LevaInputs, button, useControls } from "leva";
import toast from "react-hot-toast";

import { contractTxWithToast } from "@/utils/contract-tx-with-toast";

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
    onwerName: {
      label: "owner",
      value: "5Hr.....",
      disabled: true,
    },
    getOwner: button(() => getOwner()),
  }));

  const [validator, setValidator] = useControls("READ", () => ({
    validatorName: {
      label: "validator",
      value: "5Hr.....",
      disabled: true,
    },
    getValidator: button(() => getValidator()),
  }));

  const [node, setNode] = useControls("READ", () => ({
    nodeName: {
      label: "node",
      value: "5Hr.....",
      disabled: true,
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
  }, [api, contract]);

  useEffect(() => {
    getOwner();
  }, [getOwner]);


  const getValidator = useCallback(async () => {
    if (!contract || !api) return;
    const result = await contractQuery(api, "", contract, "get_validator");
    const { output }: { output: boolean } = decodeOutput(
      result,
      contract,
      "get_validator",
    );
    setValidator({ validatorName: output.toString() });
  }, [api, contract]);

  useEffect(() => {
    getValidator()
  }, [getValidator])

  const getNode = useCallback(async () => {
    if (!contract || !api) return;
    const result = await contractQuery(api, "", contract, "get_node");
    const { output }: { output: boolean } = decodeOutput(
      result,
      contract,
      "get_node",
    );
    setNode({ nodeName: output.toString() });
  }, [api, contract]);

  useEffect(() => {
    getNode()
  }, [getNode])

  /**************************************/
  /*Handling Write Functions in Debug UI*/
  /**************************************/

  const callInit = useCallback(async () => {
    if (!contract || !api) return;
    await contractTxWithToast(
      api,
      activeAccount!.address,
      contract,
      "init",
      {},
      [],
    );
  }, [api, contract, activeAccount]);

  useControls("WRITE", () => ({
    callInit: button(() => {
      callInit();
    }),
  }), [callInit]);


  const [newOwner, setNewOwner] = useControls("WRITE", () => ({
    newOwnerInput: "...",
    setNewOwner: button(() => callSetNewOwner()),
  }));


  useEffect(() => {
    setNewOwner({ newOwnerInput: newOwner.newOwnerInput })
  }, [newOwner]);

  const callSetNewOwner = useCallback(async () => {
    console.log(newOwner)
    if (!contract || !api) return;
    try {
      await contractTx(api, activeAccount?.address!, contract, "set_owner", {}, [
        newOwner.newOwnerInput,
      ]);
      setNewOwner({ newOwnerInput: '' })
    } catch (e) {
      console.log(e)
    }
  }, [activeAccount?.address])

  const [newNode, setNewNode] = useControls("WRITE", () => ({
    newNodeInput: "...",
    setNewNode: button(() => callSetNewNode()),
  }));

  useEffect(() => {
    setNewNode({ newNodeInput: newNode.newNodeInput })
  }, [newNode]);

  const callSetNewNode = useCallback(async () => {
    try {
      console.log(newNode)
      if (!contract || !api) return;
      await contractTx(api, activeAccount?.address!, contract, "set_node", {}, [
        newNode.newNodeInput,
      ]);
      setNewNode({ newNodeInput: '' })
    } catch (e) {
      console.log(e)
    }
  }, [activeAccount?.address])

  const [newValidator, setNewValidator] = useControls("WRITE", () => ({
    newValidatorInput: "...",
    setNewValidator: button(() => callSetNewValidator()),
  }));

  useEffect(() => {
    setNewValidator({ newValidatorInput: newValidator.newValidatorInput })
  }, [newValidator]);

  const callSetNewValidator = useCallback(async () => {
    console.log(newValidator)
    try {
      if (!contract || !api) return;
      await contractTx(api, activeAccount?.address!, contract, "set_validator", {}, [
        newValidator.newValidatorInput,
      ]);
      setNewValidator({ newValidatorInput: '' })
    } catch (e) {
      console.log(e)
    }
  }, [activeAccount?.address])

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
