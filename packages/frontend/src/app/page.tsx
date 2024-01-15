"use client";
import Button from "./components/Button";
import ContractOverview from "./components/ContractOverview";
import Input from "./components/Input";
import Logo from "./components/Logo";
export default function HomePage() {

  return (
    <>
      <div className="center-container">
        <div className="flex-container">
          <Logo />
          <Input placeholder="Describe your Data" />
          <Button buttonText="generate" className="margin-left-auto" />
          <ContractOverview />
        </div>
      </div>
    </>
  );
}
