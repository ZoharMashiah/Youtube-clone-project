import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import UpBar from "../components/Feed/UpBar/UpBar";

export default function Layout() {
  const [searchText, setSearchText] = useState("");
  const [trigger, setTrigger] = useState(false);

  return (
    <div>
      <UpBar setSearchText={setSearchText} setTrigger={setTrigger} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
