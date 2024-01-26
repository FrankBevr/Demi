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

const LevaDebugUi: React.FC<LevaProps> = () => {
  const { api, activeAccount, activeSigner } = useInkathon();
  const { contract: contractGreeter } = useRegisteredContract(
    ContractIds.Greeter,
  );
  const { contract: contractDemi } = useRegisteredContract(ContractIds.Demi);
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
    [message],
  );

  /******/
  /*DEMI*/
  /******/

  /*READ*/
  const [, setReadDemi] = useControls("DEMI_READ", () => ({
    owner: "...",
    node: "...",
    validator: "...",
    get_owner: button(() => getOwner()),
    get_node: button(() => getNode()),
    get_validator: button(() => getValidator()),
  }));

  const getOwner = async () => {
    if (!contractDemi || !api) return;
    const result = await contractQuery(api, "", contractDemi, "get_owner");
    const { output, isError, decodedOutput } = decodeOutput(
      result,
      contractDemi,
      "get_owner",
    );
    if (isError) throw new Error(decodedOutput);
    setReadDemi({ owner: output });
  };

  const getNode = async () => {
    if (!contractDemi || !api) return;
    const result = await contractQuery(api, "", contractDemi, "get_node");
    const { output, isError, decodedOutput } = decodeOutput(
      result,
      contractDemi,
      "get_node",
    );
    if (isError) throw new Error(decodedOutput);
    setReadDemi({ node: output });
  };

  const getValidator = async () => {
    if (!contractDemi || !api) return;
    const result = await contractQuery(api, "", contractDemi, "get_validator");
    const { output, isError, decodedOutput } = decodeOutput(
      result,
      contractDemi,
      "get_validator",
    );
    if (isError) throw new Error(decodedOutput);
    setReadDemi({ validator: output });
  };

  useEffect(() => {
    getOwner();
    getNode();
    getValidator();
  }, [api, contractDemi]);

  /*WRITE*/
  const [isInit, setIsInit] = useState(false);

  const [, setI] = useControls(
    "DEMI_WRITE",
    () => ({
      isInit: {
        value: false,
        disabled: true,
      },
      init: button(() => {
        if (!activeAccount || !contractDemi || !activeSigner || !api) {
          return;
        }
        (async () => {
          await contractTx(
            api,
            activeAccount.address,
            contractDemi,
            "init",

            {},
            [],
          );
          setI({ isInit: true });
          setIsInit(true);
          setIsInit(true);
        })();
      }),
    }),
    [isInit, api, contractDemi],
  );

  const [owner, setOwner] = useState("");
  const [, setO] = useControls(
    "DEMI_WRITE",
    () => ({
      new_owner: {
        value: "0x0000",
        onChange: (c) => {
          setOwner(c);
        },
      },
      change_owner: button(() => {
        if (!activeAccount || !contractDemi || !activeSigner || !api) {
          return;
        }
        (async () => {
          await contractTx(
            api,
            activeAccount.address,
            contractDemi,
            "set_owner",
            {},
            [owner],
          );
          getOwner();
          setO({ new_owner: "" });
          setOwner("");
        })();
      }),
    }),
    [owner],
  );

  const [node, setNode] = useState("");
  const [, setN] = useControls(
    "DEMI_WRITE",
    () => ({
      new_node: {
        value: "0x0000",
        onChange: (c) => {
          setNode(c);
        },
      },
      change_node: button(() => {
        if (!activeAccount || !contractDemi || !activeSigner || !api) {
          return;
        }
        (async () => {
          await contractTx(
            api,
            activeAccount.address,
            contractDemi,
            "set_node",
            {},
            [node],
          );
          getNode();
          setN({ new_node: "" });
          setNode("");
        })();
      }),
    }),
    [node],
  );

  const [validator, setValidator] = useState("");
  const [, setV] = useControls(
    "DEMI_WRITE",
    () => ({
      new_validator: {
        value: "0x0000",
        onChange: (c) => {
          setValidator(c);
        },
      },
      change_validator: button(() => {
        if (!activeAccount || !contractDemi || !activeSigner || !api) {
          return;
        }
        (async () => {
          await contractTx(
            api,
            activeAccount.address,
            contractDemi,
            "set_validator",
            {},
            [validator],
          );
          getValidator();
          setV({ new_validator: "" });
          setValidator("");
        })();
      }),
    }),
    [validator],
  );

  return null; // Render whatever you want or just return null if the component doesn't render anything.
};

export default LevaDebugUi;
