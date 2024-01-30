import { SubstrateDeployment } from "@scio-labs/use-inkathon";
import { env } from "@/config/environment";

import { address as addressGreeter } from '@inkathon/contracts/deployments/greeter/development'
import abiGreeter from '@inkathon/contracts/deployments/greeter/greeter.json'

import { address as addressDemione } from '@inkathon/contracts/deployments/demione/development'
import abiDemione from '@inkathon/contracts/deployments/demione/demione.json'

import { address as addressDemitwo } from '@inkathon/contracts/deployments/demitwo/development'
import abiDemitwo from '@inkathon/contracts/deployments/demitwo/demitwo.json'

/**
 * Add or change your custom contract ids here
 * DOCS: https://github.com/scio-labs/inkathon#2-custom-contracts
 */
export enum ContractIds {
  Greeter = "greeter",
  DemiOne = "demione",
  DemiTwo = "demitwo",
}

export const getDeployments = async (): Promise<SubstrateDeployment[]> => {
  // const networks = env.supportedChains;
  const deployments: SubstrateDeployment[] = [];
  deployments.push({ "contractId": "greeter", "networkId": "development", "abi": abiGreeter, address: addressGreeter });
  deployments.push({ "contractId": "demione", "networkId": "development", "abi": abiDemione, address: addressDemione });
  deployments.push({ "contractId": "demitwo", "networkId": "development", "abi": abiDemitwo, address: addressDemitwo });

  // for (const networkId of networks) {
  //   for (const contractId of Object.values(ContractIds)) {
  //     if (contractId !== "demione" && contractId !== "demitwo") {
  //       const abi = await import(
  //         `@inkathon/contracts/deployments/${contractId}/${contractId}.json`
  //       );
  //       const { address } = await import(
  //         `@inkathon/contracts/deployments/${contractId}/${networkId}.ts`
  //       );
  //       deployments.push({ contractId, networkId, abi, address });
  //     }
  //   }
  // }

  return deployments;
};
