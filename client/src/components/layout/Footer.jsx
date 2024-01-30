// Imports

import { useState, useEffect } from 'react';
import { Controller, useForm } from "react-hook-form";
import * as styles from "./Footer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useMutation, gql, useQuery } from "@apollo/client";
import { ADD_ENQUIRY } from '../../graphQL/mutations/mutations';
import { GET_ENQUIRY } from '../../graphQL/queries/queries';


function Footer(props) {
  // Component Logic / Scripts
  const userData = props.user

  

  library.add(fas)

  const {
    control,
    watch,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    //take out if doesn't
    // resolver: joiResolver(schema),
    defaultValues: {
      message: ""
    },
  });

  const handleTextChange = (e) =>  {
    setUser({ 
      ...user,
      [e.target.name]: e.target.value
      }) 
  } 
//make this work
  const onSubmit = async (data) => {
    console.log(userData)
    data.user = userData._id; //Add the user id to the data object
    
    const { message } = data; //Destructure the data object
    //not reaching here
    console.log(data.user); //id
  
    const token = userData.token; //Get the token from the user data - minting token
    await addEnquiry({ message }, token); //Call the createJournal function and pass in the data object and the token
  };

  const [addEnquiryEntry] = useMutation(ADD_ENQUIRY, {
    //update the cache to add the new journal entry
    update(cache, { data: { addEnquiry } }) {
      cache.modify({
        fields: {
          //add the new journal entry to the journalEntries array
          enquiryEntries(existingEntries = []) {
            //create a new journal entry reference
            const newEntryRef = cache.writeFragment({
              data: addEnquiry,
              fragment: gql`
                fragment NewEnquiryEntry on EnquiryEntry {
                  _id
                  message
                }
              `,
            });
            //return the new journal entry reference and the existing journal entries
            return [...existingEntries, newEntryRef];
          },
        },
      });
    },
  });

  const addEnquiry = async (data, token) => {
    //Destructure the data object
    const { message } = data;

    try {
      //Send the mutation request with data as input
      console.log("await reached");
      const result = await addEnquiryEntry({
        variables: {
          input: {
            
            message
          },
        },
        context: {
          headers: {
            authorization: `${token}`,
          },
        },
      });
      console.log(result.data.addEnquiry);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // Component Template (rendering)
    <footer className={styles.footer}>
      <div className="row my-3">
          <div className="col-md-3">
          <img src="../../src/assets/bg-footer.jpg" alt="Food-gallery-1" /></div>
          <div className="col-md-3"><h3 className="mb-4">Melbourne</h3><p>mon-thurs | 11.30am-3pm, 5pm-9.30pm </p><p> fri | 11.30-3pm, 5pm-11pm </p><p>sat | 11.30-3pm, 5pm-11pm</p><p>sun | 11.30-3pm, 5pm-11pm</p></div>
          <div className="col-md-3">
              <div style={{display: "flex", justifyItems: "center"}}><img src="../../src/assets/f_logo.png" alt="social-link-1" style={{width: "15%"}} /><h4 className="m-auto">TasteOfAsia</h4></div>
              <hr></hr>
              <div style={{display: "flex", justifyItems: "center"}}><img src="../../src/assets/i_logo.png" alt="social-link-2" style={{width: "15%"}} /><h4 className="m-auto">TasteOfAsia</h4></div>
              <hr></hr>
              <p className="mt-4"><FontAwesomeIcon icon="fa-solid fa-phone" />&nbsp;&nbsp;Tel: 0411 - X11 - 111</p>
              <p><FontAwesomeIcon icon="fa-solid fa-envelope" />&nbsp;&nbsp;Mail: info@TasteOfAsia</p>
          </div>
                 
            {/* <div className="d-flex align-items-center"> */}
          {userData && 
          <div className="col-md-3">
          <Form noValidate="noValidate" onSubmit={handleSubmit(onSubmit)}>
           
            
            
           
          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              // Boostrap input text box component
              <Form.Control
                {...field}
                type="text"
                placeholder="Enter Your Message Here"
                aria-label="message"
                aria-describedby="Your message"
                className="bold mb-2 w-100 form-shadow"
                size="lg"
              />
            )}
          />
           
                    {/* Error output */}
          {errors.message && (
            <Alert variant="dark" className="mt-2">
              {errors.message.message}
            </Alert>
          )}
          {/* /Error output */}
          {/* Submit Button */}
          <Button
            variant="dark"
            size="lg"
            block="true"
            className="w-100"
            type="submit"
            >
            Submit <i className="bi bi-send-fill"></i>
          </Button>
          {/* Submit Button */}
        </Form>
      </div>
          }
{/* } */}
      
        </div>
      <div className="text-center py-2">
      <hr></hr>
      <span className={styles.copy}>&copy; 2023 JP Computer Systems |  Taste of Asia&trade;</span>
      </div>
    </footer>
  )
}

// CSS-in-JS / Prop-Types

// Exports
export default Footer