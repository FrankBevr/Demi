import { useState } from "react";

import { ContractIds } from "@/deployments/deployments";
import { ApiPromise } from "@polkadot/api";
import { ContractPromise } from "@polkadot/api-contract";
import { InjectedAccount } from "@polkadot/extension-inject/types";
import { Signer } from "@polkadot/types/types";
import { useInkathon, useRegisteredContract } from "@scio-labs/use-inkathon";
import { button, useControls } from "leva";

interface LevaProps {
  api?: ApiPromise | undefined;
  activeAccount?: InjectedAccount | undefined;
  activeSigner?: Signer | undefined;
  contract?: ContractPromise | undefined;
}
const LevaDemiThree: React.FC<LevaProps> = () => {
  const { api, activeAccount, activeSigner } = useInkathon();
  const { contract: contractGreeter } = useRegisteredContract(
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

  const [, setRead] = useControls("DEMITHREE_READ", () => ({
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
  }));

  /*WRITE*/
  const [, setWrite] = useControls("DEMITHREE_WRITE", () => ({
    some_write_text: "...",
    some_write_button: button(() => console.log("a button is pressed")),
  }));

  /*READ Functions*/
  //Actors
  const get_owner = async () => {};
  const get_registered_nodes = async () => {};
  const get_registered_validators = async () => {};
  const get_approved_nodes = async () => {};
  const get_approved_validators = async () => {};

  //Task Managment
  const get_tasks = async () => {};
  const get_task_count = async () => {};
  const get_validated_tasks = async () => {};

  //Miscellaneous
  const get_init = async () => {};

  return null;
};
export default LevaDemiThree;
