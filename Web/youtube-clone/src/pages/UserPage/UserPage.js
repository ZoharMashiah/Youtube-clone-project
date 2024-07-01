import React from 'react'
import UserInfo from '../../components/UserPage/UserInfo/UserInfo'
import UserVideos from '../../components/UserPage/UserVideos/UserVideos'

export default function UserPage() {
  return (
      <div>
          <div>
              <UserInfo />
          </div>
          <hr/>
          <div>
              <UserVideos />
          </div>
    </div>
  )
}
