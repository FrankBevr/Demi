import { useState } from "react";

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
const LevaDemiThree: React.FC<LevaProps> = () => {
  const { api, activeAccount, activeSigner } = useInkathon();
  const { contract: contractDemiThree } = useRegisteredContract(
    ContractIds.DemiThree,
  );

  /***********/
  /*DEMITHREE*/
  /***********/

  /******/
  /*READ*/
  /******/
  /*Actors*/
  const [owner, set_owner] = useState("");
  const [registered_nodesArr, set_registered_nodesArr] = useState([""]);
  const [registered_validatorsArr, set_registered_validatorsArr] = useState([
    "",
  ]);
  const [approved_nodesArr, set_approved_nodesArr] = useState([""]);
  const [approved_validatorsArr, set_approved_validatorsArr] = useState([""]);
  /*TaskManagement*/
  const [tasksArr, setTasksArr] = useState([""]);
  const [task_count, set_task_count] = useState(0);
  const [validated_tasksArr, set_validated_tasksArr] = useState([""]);
  const [validated_task_count, set_validated_task_count] = useState(0);
  /*Miscellaneous*/
  const [isInit, setIsInit] = useState(false);

  const [, setRead] = useControls(
    "DEMITHREE_READ",
    () => ({
      //Actors
      owner: {
        value: owner,
        disabled: true,
      },
      registered_nodes: {
        value: "ALL REGISTERED NODES",
        options: registered_nodesArr,
      },
      registered_validators: {
        value: "ALL REGISTERED VALIDATORS",
        options: registered_validatorsArr,
      },
      approved_nodes: {
        value: "ALL APPROVED NODES",
        options: approved_nodesArr,
      },
      approved_validators: {
        value: "ALL APPROVED VALIDATORS",
        options: approved_validatorsArr,
      },

      //Task Managment
      tasks: {
        value: "ALL TASKS",
        options: tasksArr,
      },
      task_count: {
        value: task_count,
        disabled: true,
      },
      validated_tasks: {
        value: "ALL VALIDATED TASKS",
        options: validated_tasksArr,
      },
      validated_tasks_count: {
        value: validated_task_count,
        disabled: true,
      },

      //Miscellaneous
      is_init: {
        value: isInit,
        disabled: true,
      },

      //Actors
      get_owner: button(() => get_owner()),
      get_registered_nodes: button(() => get_registered_nodes()),
      get_registered_validators: button(() => get_registered_validators()),
      get_approved_nodes: button(() => get_approved_nodes()),
      get_approved_validators: button(() => get_approved_validators()),

      //Task Managment
      get_tasks: button(() => get_tasks()),
      get_task_count: button(() => get_task_count()),
      get_validated_tasks: button(() => get_validated_tasks()),

      //Miscellaneous
      get_init: button(() => get_init()),
    }),
    [
      activeAccount,
      contractDemiThree,
      activeSigner,
      api,
      owner,
      registered_nodesArr,
      registered_validatorsArr,
      approved_nodesArr,
      approved_validatorsArr,
      tasksArr,
      task_count,
      validated_tasksArr,
      validated_task_count,
      isInit,

    ],
  );

  /*WRITE*/
  const [newNode, setNewNode] = useState<string>();
  const [newOwner, setNewOwner] = useState<string>();
  const [newValidator, setNewValidator] = useState<string>();
  const [newTask, setNewTask] = useState<string>();
  const [taskIndex, setTaskIndex] = useState<number>();
  const [taskRating, setTaskRating] = useState<number>();
  const [toRegisterNode, setToRegisterNode] = useState<string>();
  const [toRegisterValidator, setToRegisterValidator] = useState<string>();
  const [toUnregisterNode, setToUnregisterNode] = useState<string>();
  const [toUnregisterValidator, setToUnregisterValidator] = useState<string>();
  const [toAppoveNode, setToAppoveNode] = useState<string>();
  const [toAppoveValidator, setToAppoveValidator] = useState<string>();
  const [, setWrite] = useControls(
    "DEMITHREE_WRITE",
    () => ({
      init: button(() => init()),
      newOwner: {
        value: "",
        onChange: (c) => {
          setNewOwner(c);
        },
      },
      changeOwner: button(() => change_owner()),
      newTask: {
        value: "",
        onChange: (c) => {
          setNewTask(c);
        },
      },
      addTask: button(() => add_task()),
      taskIndex: {
        value: 0,
        onChange: (c) => {
          setTaskIndex(c);
        },
      },
      taskRating: {
        value: 0,
        onChange: (c) => {
          setTaskRating(c);
        },
      },
      validateTask: button(() => validate_task()),
      toRegisterNode: {
        value: "",
        onChange: (c) => {
          setToRegisterNode(c);
        },
      },
      register_node: button(() => register_node()),
      toRegisterValidator: {
        value: "",
        onChange: (c) => {
          setToRegisterValidator(c);
        },
      },
      register_validator: button(() => register_validator()),
      toUnregisterNode: {
        value: "",
        onChange: (c) => {
          setToUnregisterNode(c);
        },
      },
      unregister_node: button(() => unregister_node()),
      toUnregisterValidator: {
        value: "",
        onChange: (c) => {
          setToUnregisterValidator(c);
        },
      },
      unregister_validator: button(() => unregister_validator()),
      toAppoveNode: {
        value: "",
        onChange: (c) => {
          setToAppoveNode(c);
        },
      },
      approve_node: button(() => approve_node()),
      toAppoveValidator: {
        value: "",
        onChange: (c) => {
          setToAppoveValidator(c);
        },
      },
      approved_validator: button(() => approved_validator()),
    }),
    [
      activeAccount,
      contractDemiThree,
      activeSigner,
      api,
      owner,
      registered_nodesArr,
      registered_validatorsArr,
      approved_nodesArr,
      approved_validatorsArr,
      tasksArr,
      task_count,
      validated_tasksArr,
      validated_task_count,
      isInit,

      newOwner,
      newNode,
      newOwner,
      newValidator,
      newTask,
      taskIndex,
      taskRating,
      toUnregisterNode,
      toUnregisterValidator,
      toAppoveNode,
      toAppoveValidator,
    ],
  );

  /****************/
  /*READ Functions*/
  /****************/
  //Actors
  const get_owner = async () => {
    if (!contractDemiThree || !api) return;
    const result = await contractQuery(api, "", contractDemiThree, "get_owner");
    const { output, isError, decodedOutput } = decodeOutput(
      result,
      contractDemiThree,
      "get_owner",
    );
    if (isError) throw new Error(decodedOutput);
    setRead({ owner: output });
    set_owner(output);
  };
  const get_registered_nodes = async () => {
    if (!contractDemiThree || !api) return;
    const result = await contractQuery(
      api,
      "",
      contractDemiThree,
      "get_registered_nodes",
    );
    const { output } = decodeOutput(
      result,
      contractDemiThree,
      "get_registered_nodes",
    );
    set_registered_nodesArr(output);
  };
  const get_registered_validators = async () => {
    if (!contractDemiThree || !api) return;
    const result = await contractQuery(
      api,
      "",
      contractDemiThree,
      "get_registered_validators",
    );
    const { output } = decodeOutput(
      result,
      contractDemiThree,
      "get_registered_validators",
    );
    set_registered_validatorsArr(output);
  };
  const get_approved_nodes = async () => {
    if (!contractDemiThree || !api) return;
    const result = await contractQuery(
      api,
      "",
      contractDemiThree,
      "get_approved_nodes",
    );
    const { output } = decodeOutput(
      result,
      contractDemiThree,
      "get_approved_nodes",
    );
    set_approved_nodesArr(output);
  };
  const get_approved_validators = async () => {
    if (!contractDemiThree || !api) return;
    const result = await contractQuery(
      api,
      "",
      contractDemiThree,
      "get_approved_validators",
    );
    const { output } = decodeOutput(
      result,
      contractDemiThree,
      "get_approved_validators",
    );
    set_approved_validatorsArr(output);
  };

  //Task Managment
  const get_tasks = async () => {
    if (!contractDemiThree || !api) return;
    const result = await contractQuery(api, "", contractDemiThree, "get_tasks");
    const { output } = decodeOutput(result, contractDemiThree, "get_tasks");
    setTasksArr(output);
  };
  const get_task_count = async () => {
    if (!contractDemiThree || !api) return;
    const result = await contractQuery(
      api,
      "",
      contractDemiThree,
      "get_task_count",
    );
    const { output } = decodeOutput(
      result,
      contractDemiThree,
      "get_task_count",
    );
    set_task_count(output);
  };
  const get_validated_tasks = async () => {
    if (!contractDemiThree || !api) return;
    const result = await contractQuery(
      api,
      "",
      contractDemiThree,
      "get_task_count",
    );
    const { output } = decodeOutput(
      result,
      contractDemiThree,
      "get_task_count",
    );
    set_validated_tasksArr(output)
  };

  //Miscellaneous
  const get_init = async () => {
    if (!contractDemiThree || !api) return;
    const result = await contractQuery(api, "", contractDemiThree, "get_init");
    const { output } = decodeOutput(result, contractDemiThree, "get_init");
    setRead({ is_init: output });
    setIsInit(output);
  };

  /*****************/
  /*WRITE Functions*/
  /*****************/
  const init = async () => {
    if (!activeAccount || !contractDemiThree || !activeSigner || !api) {
      return;
    }
    await contractTx(
      api,
      activeAccount.address,
      contractDemiThree,
      "init",
      {},
      [],
    );
    await get_init();
  };

  const change_owner = async () => {
    if (!activeAccount || !contractDemiThree || !activeSigner || !api) {
      return;
    }
    await contractTx(
      api,
      activeAccount.address,
      contractDemiThree,
      "change_owner",
      {},
      [newOwner],
    );
    await get_owner();
    setWrite({ newOwner: "" });
    setNewOwner("");
  };

  const add_task = async () => {
    if (!activeAccount || !contractDemiThree || !activeSigner || !api) {
      return;
    }
    await contractTx(
      api,
      activeAccount.address,
      contractDemiThree,
      "add_task",
      {},
      [newTask],
    );
    await get_tasks();
    setWrite({ newTask: "" });
    setNewTask("");
  };
  const validate_task = async () => {
    if (!activeAccount || !contractDemiThree || !activeSigner || !api) {
      return;
    }
    await contractTx(
      api,
      activeAccount.address,
      contractDemiThree,
      "validate_task",
      {},
      [taskIndex, taskRating],
    );
    await get_validated_tasks();
    setWrite({ taskIndex: 0, taskRating: 0 });
    setTaskIndex(0);
    setTaskRating(0);
  };
  const register_node = async () => {
    if (!activeAccount || !contractDemiThree || !activeSigner || !api) {
      return;
    }
    await contractTx(
      api,
      activeAccount.address,
      contractDemiThree,
      "register_node",
      {},
      [toRegisterNode],
    );
    await get_registered_nodes();
    setWrite({ toRegisterNode: "" });
    setToRegisterNode("")
  };
  const register_validator = async () => {
    if (!activeAccount || !contractDemiThree || !activeSigner || !api) {
      return;
    }
    await contractTx(
      api,
      activeAccount.address,
      contractDemiThree,
      "register_validator",
      {},
      [toRegisterValidator],
    );
    await get_registered_validators();
    setWrite({ toRegisterValidator: "" });
    setToRegisterValidator("")
  };
  const unregister_node = async () => {
    if (!activeAccount || !contractDemiThree || !activeSigner || !api) {
      return;
    }
    await contractTx(
      api,
      activeAccount.address,
      contractDemiThree,
      "unregister_node",
      {},
      [toUnregisterNode],
    );
    await get_registered_nodes();
    setWrite({ toUnregisterNode: "" });
    setToUnregisterNode("")
  };
  const unregister_validator = async () => {
    if (!activeAccount || !contractDemiThree || !activeSigner || !api) {
      return;
    }
    await contractTx(
      api,
      activeAccount.address,
      contractDemiThree,
      "unregister_validator",
      {},
      [toUnregisterValidator],
    );
    await get_registered_validators();
    setWrite({ toUnregisterValidator: "" });
    setToUnregisterValidator("")
  };
  const approve_node = async () => {
    if (!activeAccount || !contractDemiThree || !activeSigner || !api) {
      return;
    }
    await contractTx(
      api,
      activeAccount.address,
      contractDemiThree,
      "approve_node",
      {},
      [toAppoveNode],
    );
    await get_approved_nodes();
    setWrite({ toAppoveNode: "" });
    setToAppoveNode("")
  };
  const approved_validator = async () => {
    if (!activeAccount || !contractDemiThree || !activeSigner || !api) {
      return;
    }
    await contractTx(
      api,
      activeAccount.address,
      contractDemiThree,
      "approved_validator",
      {},
      [toAppoveValidator],
    );
    await get_approved_validators();
    setWrite({ toAppoveValidator: "" });
    setToAppoveValidator("")
  };

  return null;
};
export default LevaDemiThree;
