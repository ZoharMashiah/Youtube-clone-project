import React, { useState } from "react";
import ButtonField from "../ButtonField/ButtonField";

export default function Subscribers() {
  const [subscribers, setSubscribers] = useState([]);
  return (
    <div>
      <h3>Subscribers</h3>
      {subscribers.length === 0 ? (
        <p>No subscribers yet.</p>
      ) : (
        subscribers.map((subscriber) => {
          return <ButtonField text={subscriber.name} icon={subscriber.icon} />;
        })
      )}
    </div>
  );
}
