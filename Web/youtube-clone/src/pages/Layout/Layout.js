import React, { useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import UpBar from "../../components/Feed/UpBar/UpBar";
import AppContext from "../../AppContext";

export default function Layout() {
  const [searchText, setSearchText] = useState("");
  const [trigger, setTrigger] = useState(false);

  return (
    <div>
      <div>
        <UpBar setSearchText={setSearchText} setTrigger={setTrigger} />
      </div>
      <main>
        <Outlet context={{ trigger, setTrigger, searchText, setSearchText }} />
      </main>
    </div>
  );
}
