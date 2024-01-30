import React, { useEffect, useState } from "react";
import { ContractIds } from "@/deployments/deployments";
import { ApiPromise } from "@polkadot/api";
import { ContractPromise } from "@polkadot/api-contract";
import { InjectedAccount } from "@polkadot/extension-inject/types";
import { Signer } from "@polkadot/types/types";
import {
  contractQuery,
  contractTx,
  decodeOutput,
  useInkathon,
  useRegisteredContract,
} from "@scio-labs/use-inkathon";
import { button, useControls } from "leva";

interface LevaProps {
  api?: ApiPromise | undefined;
  activeAccount?: InjectedAccount | undefined;
  activeSigner?: Signer | undefined;
  contract?: ContractPromise | undefined;
}

const LevaGreeter: React.FC<LevaProps> = () => {
  const { api, activeAccount, activeSigner } = useInkathon();
  const { contract: contractGreeter } = useRegisteredContract(ContractIds.Greeter);

  /*********/
  /*GREETER*/
  /*********/

  /*READ*/
  const [, setRead] = useControls("GREETER_READ", () => ({
    greet: "...",
    get_greet: button(() => getGreet()),
  }));

  const getGreet = async () => {
    if (!contractGreeter || !api) return;
    const result = await contractQuery(api, "", contractGreeter, "greet");
    const { output, isError, decodedOutput } = decodeOutput(
      result,
      contractGreeter,
      "greet",
    );
    if (isError) throw new Error(decodedOutput);
    setRead({ greet: output });
  };

  useEffect(() => {
    getGreet();
  }, [api, contractGreeter]);

  /*WRITE*/
  const [message, setMessage] = useState("");
  const [, setM] = useControls(
    "GREETER_WRITE",
    () => ({
      new_greet: {
        value: "Hoi!",
        onChange: (c) => {
          setMessage(c);
        },
      },
      change_greet: button(() => {
        if (!activeAccount || !contractGreeter || !activeSigner || !api) {
          return;
        }
        (async () => {
          await contractTx(
            api,
            activeAccount.address,
            contractGreeter,
            "setMessage",
            {},
            [message],
          );
          getGreet();
          setM({ new_greet: "" });
          setMessage("");
        })();
      }),
    }),
    [message, activeAccount, contractGreeter, activeSigner, api],
  );

  return null;
};

export default LevaGreeter;
