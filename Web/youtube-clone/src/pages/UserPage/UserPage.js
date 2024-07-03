import React from "react";
import { useParams } from "react-router-dom";
import UserInfo from "../../components/UserPage/UserInfo/UserInfo";
import UserVideos from "../../components/UserPage/UserVideos/UserVideos";

export default function UserPage() {
  const { userId } = useParams();
  console.log(userId);
  return (
    <div>
      <div>
        <UserInfo userId={userId} />
      </div>
      <hr />
      <div>
        <UserVideos userId={userId} />
      </div>
    </div>
  );
}
