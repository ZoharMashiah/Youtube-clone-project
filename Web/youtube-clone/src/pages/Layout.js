import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import UpBar from "../components/Feed/UpBar/UpBar";

export default function Layout({ context }) {
  const [searchText, setSearchText] = useState("");
  const [trigger, setTrigger] = useState(false);

  return (
    <div>
      <UpBar context={context} setSearchText={setSearchText} setTrigger={setTrigger} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
