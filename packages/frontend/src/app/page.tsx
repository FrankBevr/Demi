"use client";

import { useInkathon } from "@scio-labs/use-inkathon";

import Button from "./components/Button";
import Input from "./components/Input";
import LevaDebugUi from "./components/LevaDebugUi";
import Logo from "./components/Logo";

export default function HomePage() {
  const { api, activeAccount, activeSigner } = useInkathon();

  if (!api) return null;
  return (
    <>
      <LevaDebugUi
        activeAccount={activeAccount}
        api={api}
        activeSigner={activeSigner}
      />
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
  );
}
