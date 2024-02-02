import React, { useState } from "react";

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

const LevaDemiTwo: React.FC<LevaProps> = () => {
  const { api, activeAccount, activeSigner } = useInkathon();
  const { contract: contractDemi } = useRegisteredContract(ContractIds.DemiTwo);

  /*********/
  /*DEMITWO*/
  /*********/

  /*READ*/
  const [isInit, setIsInit] = useState(false);
  const [nodesArr, setNodesArr] = useState([""]);
  const [validatorsArr, setValidatorsArr] = useState([""]);
  const [tasksArr, setTasksArr] = useState([""]);

  const [, setReadDemiTwo] = useControls(
    "DEMITWO_READ",
    () => ({
      isInit: {
        value: false,
        disabled: true,
      },
      nodes: {
        value: "ALL NODES",
        options: nodesArr,
      },
      validators: {
        value: "ALL VALIDATORS",
        options: validatorsArr,
      },
      tasks: {
        value: "ALL TASKS",
        options: tasksArr,
      },
      get_nodes: button(() => getNodes()),
      get_validators: button(() => getValidators()),
      get_tasks: button(() => getTasks()),
    }),
    [nodesArr, validatorsArr, tasksArr, isInit],
  );

  /*WRITE*/
  const [newNode, setNewNode] = useState<string>();
  const [newValidator, setNewValidator] = useState<string>();
  const [newTask, setNewTask] = useState<string>();

  const [, setNs] = useControls(
    "DEMITWO_WRITE",
    () => ({
      init: button(() => init()),
      new_nodes: {
        value: "0x0000",
        onChange: (c) => {
          setNewNode(c);
        },
      },
      addNode: button(() => add_node()),
      new_validators: {
        value: "0x0000",
        onChange: (c) => {
          setNewValidator(c);
        },
      },
      addValidator: button(() => add_validator()),
      new_tasks: {
        value: "",
        onChange: (c) => {
          setNewTask(c);
        },
      },
      addTask: button(() => add_task()),
    }),
    [
      activeAccount,
      contractDemi,
      activeSigner,
      api,
      newNode,
      newValidator,
      newTask,
    ],
  );

  /*READ Function*/
  const getNodes = async () => {
    if (!contractDemi || !api) return;
    const result = await contractQuery(api, "", contractDemi, "get_nodes");
    const { output } = decodeOutput(result, contractDemi, "get_nodes");
    setNodesArr(output);
  };

  const getValidators = async () => {
    if (!contractDemi || !api) return;
    const result = await contractQuery(api, "", contractDemi, "get_validators");
    const { output } = decodeOutput(result, contractDemi, "get_validators");
    setValidatorsArr(output);
  };

  const getTasks = async () => {
    if (!contractDemi || !api) return;
    const result = await contractQuery(api, "", contractDemi, "get_tasks");
    const { output } = decodeOutput(result, contractDemi, "get_tasks");
    setTasksArr(output);
  };

  /*WRITE Functions*/
  const init = async () => {
    if (!activeAccount || !contractDemi || !activeSigner || !api) {
      return;
    }
    await contractTx(api, activeAccount.address, contractDemi, "init", {}, []);
    setIsInit(true);
    setReadDemiTwo({ isInit: true });
  };

  const add_node = async () => {
    if (!activeAccount || !contractDemi || !activeSigner || !api) {
      return;
    }
    await contractTx(api, activeAccount.address, contractDemi, "add_node", {}, [
      newNode,
    ]);
    setNs({ new_nodes: "" });
    setNewNode("");
  };
  const add_validator = async () => {
    if (!activeAccount || !contractDemi || !activeSigner || !api) {
      return;
    }
    await contractTx(
      api,
      activeAccount.address,
      contractDemi,
      "add_validator",
      {},
      [newNode],
    );
    setNs({ new_validators: "" });
    setNewValidator("");
  };

  const add_task = async () => {
    if (!activeAccount || !contractDemi || !activeSigner || !api) {
      return;
    }
    await contractTx(api, activeAccount.address, contractDemi, "add_task", {}, [
      newTask,
    ]);
    setNs({ new_tasks: "" });
    setNewTask("");
  };

  return null;
};

export default LevaDemiTwo;
