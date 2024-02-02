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
    some_read_text: "...",
    some_read_button: button(() => console.log("a button is pressed")),
  }));

  /*WRITE*/
  const [, setWrite] = useControls("DEMITHREE_WRITE", () => ({
    some_write_text: "...",
    some_write_button: button(() => console.log("a button is pressed")),
  }));

  return null;
};
export default LevaDemiThree;
