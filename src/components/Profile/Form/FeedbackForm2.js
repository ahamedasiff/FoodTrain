import React, { useEffect, useState } from 'react';
import { options, categories } from './Data';
import Form from './Form.module.css';
import axios from 'axios';

function FeedbackForm({ closeModal, feedback }) {
  const [feedbackType, setFeedbackType] = useState('N/A');
  const [category, setCategory] = useState('N/A');
  const [description, setDescription] = useState('');
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (feedback) {
      setFeedbackType(feedback.feedbackType);
      setCategory(feedback.category);
      setDescription(feedback.description);
    }
  }, [feedback]);

  const handleType = (event) => {
    setFeedbackType(event.target.value);
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const validateForm = () => {
    const errors = {};

    if (feedbackType === 'N/A') {
      errors.feedbackType = 'Please select a feedback type';
    }

    if (category === 'N/A') {
      errors.category = 'Please select a category';
    }

    if (description.trim() === '') {
      errors.description = 'Please enter a description';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      const formData = { feedbackType, category, description };

      if (feedback) {
        try {
          const response = await axios.put(
            `http://localhost:8000/api/feedback/${feedback._id}`,
            formData
          );
          console.log('Updated feedback:', response.data);
          closeModal();
        } catch (error) {
          console.log('Error:', error.message);
        }
      } else {
        try {
          const response = await axios.post(
            'http://localhost:8000/api/feedback/',
            formData
          );
          console.log('Response:', response.data);
          alert('Feedback Submitted');
          closeModal();
        } catch (error) {
          console.log('Error:', error.message);
        }
      }
    }
  };

  return (
    <div className={Form.container}>
      <h1 className={Form.header}>Feedback Form</h1>
      <form onSubmit={handleSubmit}>
        <label className={Form.label}>Select Type: </label>
        <select value={feedbackType} onChange={handleType} className={Form.select}>
          {options.map((option) => (
            <option key={option.id} value={option.label}>
              {option.label}
            </option>
          ))}
        </select>
        {formErrors.feedbackType && (
          <p className={Form.error}>{formErrors.feedbackType}</p>
        )}

        <label className={Form.label}>Select Category: </label>
        <select value={category} onChange={handleCategory} className={Form.select}>
          {categories.map((category) => (
            <option key={category.id} value={category.label}>
              {category.label}
            </option>
          ))}
        </select>
        {formErrors.category && <p className={Form.error}>{formErrors.category}</p>}

        <label className={Form.label}>Description </label>
        <textarea
          value={description}
          onChange={handleDescription}
          rows={5}
          cols={50}
          className={Form.select}
          placeholder="Enter Your Message"
        />
        {formErrors.description && (
          <p className={Form.error}>{formErrors.description}</p>
        )}

        <button type="submit" className={Form.submit}>
          {feedback ? 'Update' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default FeedbackForm;

// import React, { useEffect, useState } from 'react'
// import {options , categories} from './Data'
// import Form from './Form.module.css'
// import axios from 'axios'

// function FeedbackForm({ closeModal, feedback }) {
//     const [feedbackType, setFeedbackType] = useState('N/A')
//     const [category, setCategory] = useState('N/A')
//     const [description, setDescription] = useState('')
//     const [formErrors, setFormErrors] = useState({});

//     useEffect(() => {
//       if (feedback) {
//         setFeedbackType(feedback.feedbackType);
//         setCategory(feedback.category);
//         setDescription(feedback.description);
//       }
//     }, [feedback]);

//     const handleType = (event) => {
//         setFeedbackType(event.target.value)
//     }

//     const handleCategory = (event) => {
//         setCategory(event.target.value)
//     }

//     const handleDescription = (event) => {
//         setDescription(event.target.value)
//     }

//     const validateForm = () => {
//       const errors = {};
  
//       if (feedbackType === 'N/A') {
//         errors.feedbackType = 'Please select a feedback type';
//       }
  
//       if (category === 'N/A') {
//         errors.category = 'Please select a category';
//       }
  
//       if (description.trim() === '') {
//         errors.description = 'Please enter a description';
//       }
  
//       setFormErrors(errors);
  
//       return Object.keys(errors).length === 0;
//     };

//    const handleSubmit = async (event) => {
//       event.preventDefault();
//       const formData = { feedbackType, category, description };
//       // console.log("Form data:", formData);
//       // code to submit form data

//       if (feedback) {
//         try {
//           const response = await axios.put(`http://localhost:8000/api/feedback/${feedback._id}`, formData)          
//           console.log('Updated feedback:', response.data)
//           closeModal()
//         } catch (error) {
//           console.log('Error:', error.message)
//         }
//       } else {
//       try {
//         const response = await axios.post('http://localhost:8000/api/feedback/', formData);
//         console.log('Response:', response.data);
//         alert("Feedback Submitted")
//         closeModal()
//       } catch (error) {
//         console.log('Error:', error.message);
//       }

//     }
//   }

//   return (
//     <div className={Form.container}> 
//       <h1 className={Form.header}>Feedback Form</h1>
//       <form onSubmit={handleSubmit}>
//         <label className={Form.label}>Select Type: </label>
//         <select value={feedbackType} onChange={handleType} className={Form.select}>
//             {options.map((option) => (
//                 <option key={option.id} value={option.label}>
//                     {option.label}
//                 </option>
//             ))}
//         </select>
//         {formErrors.feedbackType && (
//           <p className={Form.error}>{formErrors.feedbackType}</p>
//         )}

//         <label className={Form.label}>Select Category: </label>
//         <select value={category} onChange={handleCategory} className={Form.select}>
//             {categories.map((category) => (
//                 <option key={category.id} value={category.label}>
//                     {category.label}
//                 </option>
//             ))}
//         </select>
//         {formErrors.category && <p className={Form.error}>{formErrors.category}</p>}

//         <label className={Form.label}>Description </label>
//         <textarea 
//             value={description} onChange={handleDescription}
//             rows={5} cols={50} className={Form.select}
//             placeholder='Enter Your Message'
//         />
//         {formErrors.description && (
//           <p className={Form.error}>{formErrors.description}</p>
//         )}
//         <button type='submit' className={Form.submit}>
//           {feedback ? 'Update' : 'Submit'}
//         </button>
//       </form>
      
//     </div>
//   )
// }

// export default FeedbackForm


// import React, { useState } from 'react'
// import {options , categories} from './Data'
// import Form from './Form.module.css'
// import axios from 'axios'

// function FeedbackForm() {
//     const [feedbackType, setFeedbackType] = useState('N/A')
//     const [category, setCategory] = useState('N/A')
//     const [description, setDescription] = useState('')
//     const [submittedData, setSubmittedData] = useState([])

//     const handleType = (event) => {
//         setFeedbackType(event.target.value)
//     }

//     const handleCategory = (event) => {
//         setCategory(event.target.value)
//     }

//     const handleDescription = (event) => {
//         setDescription(event.target.value)
//     }

//    const handleSubmit = async (event) => {
//      event.preventDefault();
//       const formData = { feedbackType, category, description };
//       console.log("Form data:", formData);
//       // code to submit form data
//       try {
//         const response = await axios.post('http://localhost:8000/api/feedback/', formData);
//         console.log('Response:', response.data);
//         setSubmittedData(response.data);
//         alert("Submitted")
//       } catch (error) {
//         console.log('Error:', error.message);
//       }
//     }
    

//   return (
//     <div className={Form.container}> 
//       <h1 className={Form.header}>Feedback Form</h1>
//       <form onSubmit={handleSubmit}>
//         <label className={Form.label}>Select Type: </label>
//         <select value={feedbackType} onChange={handleType} className={Form.select}>
//             {options.map((option) => (
//                 <option key={option.id} value={option.label}>
//                     {option.label}
//                 </option>
//             ))}
//         </select>

//         <label className={Form.label}>Select Category: </label>
//         <select value={category} onChange={handleCategory} className={Form.select}>
//             {categories.map((category) => (
//                 <option key={category.id} value={category.label}>
//                     {category.label}
//                 </option>
//             ))}
//         </select>


//         <label className={Form.label}>Description </label>
//         <textarea 
//             value={description} onChange={handleDescription}
//             rows={5} cols={50} className={Form.select}
//             placeholder='Enter Your Message'
//         />


//         <button type='submit' className={Form.submit}>Submit</button>
//       </form>
      
//     </div>
//   )
// }

// export default FeedbackForm


// import React, { useState } from 'react'
// import {options , categories} from './Data'
// import Form from './Form.module.css'
// import axios from 'axios'

// function FeedbackForm() {
//     // const [feedbackType, setFeedbackType] = useState('N/A')
//     // const [category, setCategory] = useState('N/A')
//     // const [description, setDescription] = useState('')
//     const [ data, setData] = useState({feedbackType: "", category: "", description: ""})
//     // const [submittedData, setSubmittedData] = useState([])

//     const handleChange = (event) => {
//       const name = event.target.name;
//       const value = event.target.value;
//       setData({...data, [name]: value})
//     }

//     const handleSubmit = (event) => {
//         event.preventDefault();
        
    
//         axios.post('http://localhost:8000/api/contacts', data)
//       .then(response => {
//         console.log(response.data);
//         alert('Successfully Submitted')
//         setData({feedbackType:" ", category:" ", description:" "});
//       })
//       .catch(error => {
//         console.log(error);
//         alert("Something went wrong. Please try again later")
//       })

//         // setSubmittedData([...submittedData, data])
//         // setFeedbackType('N/A')
//         // setCategory('N/A')
//         // setDescription('')
//         // alert('Successfully Submitted')

        
//     }

//   return (
//     <div className={Form.container}> 
//       <h1 className={Form.header}>Feedback Form</h1>
//       <form onSubmit={handleSubmit}>
//         <label className={Form.label}>Select Type: </label>
//         <input type='text' name='feedbackType' onChange={handleChange} value={data.feedbackType} placeholder='Enter Feedback Type'/>
        
//         <label className={Form.label}>Select Category: </label>
//         <input type='text' name='category' onChange={handleChange} value={data.category} placeholder='Enter Category'/>
        
//         <label className={Form.label}>Description </label>

//         <textarea onChange={handleChange} rows={5} cols={50} className={Form.select} placeholder='Enter Your Message' value={data.description} />
//         {/* <textarea 
//             onChange={handleChange}  
//             rows={5} cols={50} className={Form.select}
//             placeholder='Enter Your Message'
//             value={data.description}
//         /> */}


//         <button type='submit' className={Form.submit}>Submit</button>
//       </form>
      
//     </div>
//   )
// }

// export default FeedbackForm
