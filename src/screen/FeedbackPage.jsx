import React from 'react'
import Footer from '../components/Footer/footer'
import Navbar from '../components/Navbar/Navbar'
import UserDetails from '../components/Profile/UserDetails'
import Feedbacks from '../components/Profile/Feedbacks'

function ProfilePage() {
  return (
    <div>
      <Navbar />
      <Feedbacks />
      {/* <UserDetails /> */}
      <Footer />
    </div>
  )
}


export default ProfilePage
