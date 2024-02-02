"use client";

import { useInkathon } from "@scio-labs/use-inkathon";

import Button from "./components/Button";
import Input from "./components/Input";
import LevaDemiOne from "./components/LevaDemiOne";
import LevaDemiThree from "./components/LevaDemiThree";
import LevaDemiTwo from "./components/LevaDemiTwo";
import LevaGreeter from "./components/LevaGreeter";
import Logo from "./components/Logo";

export default function HomePage() {
  const { api } = useInkathon();

  if (!api) return null;
  return (
    <>
      <LevaGreeter />
      <LevaDemiOne />
      <LevaDemiTwo />
      <LevaDemiThree />
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
