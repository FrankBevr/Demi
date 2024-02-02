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

  /*READ*/
  const [, setRead] = useControls("DEMITHREE_READ", () => ({
    owner: "",
    registered_nodes: "",
    registered_validators: "",
    approved_nodes: "",
    approved_validators: "",
    //Task Managment
    tasks: "",
    task_count: 0,
    validated_tasks: "",
    validated_tasks_count: 0,
    //Miscellaneous
    is_init: false,
    get_init: button(() => get_init()),
    get_owner: button(() => get_owner()),
    get_task: button(() => get_task()),
    get_validated_rating: button(() => get_validated_rating()),
    get_registered_nodes: button(() => get_registered_nodes()),
    get_registered_validators: button(() => get_registered_validators()),
    get_approved_nodes: button(() => get_approved_nodes()),
    get_approved_validators: button(() => get_approved_validators()),
  }));

  /*WRITE*/
  const [, setWrite] = useControls("DEMITHREE_WRITE", () => ({
    some_write_text: "...",
    some_write_button: button(() => console.log("a button is pressed")),
  }));

  /*READ Functions*/
  const get_init = async () => { }
  const get_owner = async () => { }
  const get_task = async () => { }
  const get_validated_rating = async () => { }
  const get_registered_nodes = async () => { }
  const get_registered_validators = async () => { }
  const get_approved_nodes = async () => { }
  const get_approved_validators = async () => { }


  return null;
};
export default LevaDemiThree;
