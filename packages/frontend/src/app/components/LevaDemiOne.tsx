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

const LevaDemiOne: React.FC<LevaProps> = () => {
  const { api, activeAccount, activeSigner } = useInkathon();
  const { contract: contractDemiOne } = useRegisteredContract(ContractIds.DemiOne);


  /******/
  /*DEMI*/
  /******/

  /*READ*/
  const [, setReadDemi] = useControls("DEMIONE_READ", () => ({
    owner: "...",
    node: "...",
    validator: "...",
    get_owner: button(() => getOwner()),
    get_node: button(() => getNode()),
    get_validator: button(() => getValidator()),
  }));
  /*WRITE*/
  const [isInit, setIsInit] = useState(false);
  const [owner, setOwner] = useState("");
  const [node, setNode] = useState("");
  const [validator, setValidator] = useState("");
  const [, setI] = useControls(
    "DEMIONE_WRITE",
    () => ({
      isInit: {
        value: false,
        disabled: true,
      },
      init: button(() => init()),
      new_owner: {
        value: "0x0000",
        onChange: (c) => {
          setOwner(c);
        },
      },
      change_owner: button(() => change_owner()),
      new_node: {
        value: "0x0000",
        onChange: (c) => {
          setNode(c);
        },
      },
      change_node: button(() => change_node()),
      new_validator: {
        value: "0x0000",
        onChange: (c) => {
          setValidator(c);
        },
      },
      change_validator: button(() => change_validator()),
    }),
    [activeAccount, contractDemiOne, activeSigner, api, isInit, owner, node, validator],
  );

  /*READ Functions*/
  const getOwner = async () => {
    if (!contractDemiOne || !api) return;
    const result = await contractQuery(api, "", contractDemiOne, "get_owner");
    const { output, isError, decodedOutput } = decodeOutput(
      result,
      contractDemiOne,
      "get_owner",
    );
    if (isError) throw new Error(decodedOutput);
    setReadDemi({ owner: output });
  };

  const getNode = async () => {
    if (!contractDemiOne || !api) return;
    const result = await contractQuery(api, "", contractDemiOne, "get_node");
    const { output, isError, decodedOutput } = decodeOutput(
      result,
      contractDemiOne,
      "get_node",
    );
    if (isError) throw new Error(decodedOutput);
    setReadDemi({ node: output });
  };

  const getValidator = async () => {
    if (!contractDemiOne || !api) return;
    const result = await contractQuery(api, "", contractDemiOne, "get_validator");
    const { output, isError, decodedOutput } = decodeOutput(
      result,
      contractDemiOne,
      "get_validator",
    );
    if (isError) throw new Error(decodedOutput);
    setReadDemi({ validator: output });
  };

  useEffect(() => {
    getOwner();
    getNode();
    getValidator();
  }, [api, contractDemiOne]);

  /*WRITE Functions*/
  const init = async () => {
    if (!activeAccount || !contractDemiOne || !activeSigner || !api) {
      return;
    }
    await contractTx(
      api,
      activeAccount.address,
      contractDemiOne,
      "init",
      {},
      [],
    );
    setIsInit(true);
    setI({ isInit: true });
  }

  const change_owner = async () => {
    if (!activeAccount || !contractDemiOne || !activeSigner || !api) {
      return;
    }
    await contractTx(
      api,
      activeAccount.address,
      contractDemiOne,
      "set_owner",
      {},
      [owner],
    );
    getOwner();
    setI({ new_owner: "" });
    setOwner("");
  }

  const change_node = async () => {
    if (!activeAccount || !contractDemiOne || !activeSigner || !api) {
      return;
    }
    await contractTx(
      api,
      activeAccount.address,
      contractDemiOne,
      "set_node",
      {},
      [node],
    );
    getNode();
    setI({ new_node: "" });
    setNode("");
  }

  const change_validator = async () => {
    if (!activeAccount || !contractDemiOne || !activeSigner || !api) {
      return;
    }
    await contractTx(
      api,
      activeAccount.address,
      contractDemiOne,
      "set_validator",
      {},
      [validator],
    );
    getValidator();
    setI({ new_validator: "" });
    setValidator("");
  }
  return null;
};

export default LevaDemiOne;
