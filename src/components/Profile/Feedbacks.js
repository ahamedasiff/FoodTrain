import React, { useEffect, useState } from 'react'
import FeedbackForm2 from './Form/FeedbackForm2'
import Modal from 'react-modal'
import {data} from './Form/Data'
import CustomerDetails from './CustomerDetails.module.css'
import axios from 'axios'

Modal.setAppElement('#root')

function Feedbacks() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [feedbackData, setFeedbackData] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [id, setId] = useState('');

  useEffect(() => {
    fetchFeedbackData();
  }, []);

  const fetchFeedbackData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/feedback/');
      setFeedbackData(response.data);
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  const handleOpenModal = () => {
    setModalOpen(true)
    setSelectedFeedback(null); // Reset selected feedback when opening the modal
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  const handleUpdate = (feedback) => {
    setSelectedFeedback(feedback);
    setModalOpen(true);
  };

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:8000/api/feedback/${_id}`);
      fetchFeedbackData(); // Fetch updated data after deletion
      console.log('Delete clicked for ID:', _id);
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

 

  return (
    <div>
      <div className={CustomerDetails.feedbackHeader}>
        You can let us know you thoughts about <span className={CustomerDetails.fbSpan}>US</span>. 
        So that we provide a worry-free service <span className={CustomerDetails.fbSpan}>for you</span>
      </div>
      <div className={CustomerDetails.container}>
        <button className={CustomerDetails.feedback} onClick={handleOpenModal}>
          Enter Feedback
        </button>
        
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          className={CustomerDetails.modal}
          overlayClassName={CustomerDetails.overlay}
        >
          <div>
          <button className={CustomerDetails.close} onClick={handleCloseModal}>
            X
          </button>

        <FeedbackForm2 closeModal={handleCloseModal} feedback={selectedFeedback} />
        </div>
        </Modal>
      </div>
      
      <div>
        <table>
          <tbody>
              <tr>
                {/* <th>ID</th> */}
                <th>feedback Type</th>
                <th>Category</th>
                <th>Description</th>
                {/* <th>Date</th> */}
                <th>Actions</th> {/* Added column for buttons */}
              </tr>
              {feedbackData.map((data) => (
                <tr key={data._id}>
                  {/* <td>{data._id}</td>  */}
                  <td>{data.feedbackType}</td>
                  <td>{data.category}</td>
                  <td>{data.description}</td>
                  {/* <td>{data.createdAt}</td> */}
                  <td>
                    <div className={CustomerDetails.actionBtn}>
                      <button onClick={() => handleUpdate(data)} className={CustomerDetails.updateBtn}>Update</button>
                      <button onClick={() => handleDelete(data._id)} className={CustomerDetails.deleteBtn}>Delete</button>
                    </div>
                </td>
                </tr>
              ))}
         </tbody>
        </table>
      </div>
    </div>
  )
}


export default Feedbacks


// import React, { useState } from 'react'
// import FeedbackForm2 from './Form/FeedbackForm2'
// import Modal from 'react-modal'
// import {data} from './Form/Data'
// import CustomerDetails from './CustomerDetails.module.css'

// Modal.setAppElement('#root')

// function Feedbacks() {
//   const [isModalOpen, setModalOpen] = useState(false);


//   const handleOpenModal = () => {
//     setModalOpen(true)
//   }

//   const handleCloseModal = () => {
//     setModalOpen(false)
//   }

//   return (
//     <div >
//       <div className={CustomerDetails.container}>
//         <button className={CustomerDetails.feedback} onClick={handleOpenModal}>
//           Enter Feedback
//         </button>
        
//         <Modal
//           isOpen={isModalOpen}
//           onRequestClose={handleCloseModal}
//           className={CustomerDetails.modal}
//           overlayClassName={CustomerDetails.overlay}
//         >
//           <div>
//           <button className={CustomerDetails.close} onClick={handleCloseModal}>
//             X
//           </button>

//         <FeedbackForm2 closeModal={handleCloseModal}/>
//         </div>
//         </Modal>
//       </div>
      
//       <div>
//         <table>
//           <tbody>
//               <tr>
//                 <th>ID</th>
//                 <th>feedback Type</th>
//                 <th>Category</th>
//                 <th>Description</th>
//                 <th>Date</th>
//               </tr>
//               {data.map((data) => (
//                 <tr key={data.id}>
//                   <td>{data.id}</td>
//                   <td>{data.feedbackType}</td>
//                   <td>{data.category}</td>
//                   <td>{data.description}</td>
//                   <td>{data.date}</td>
//                 </tr>
//               ))}
//          </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }


// export default Feedbacks

