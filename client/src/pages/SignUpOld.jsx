//React
import { useState } from "react";
//Bootstrap
import { Card, Form, Button, Alert } from "react-bootstrap";
//React Router
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//React Hook Forms
import { Controller, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
//Apollo Client
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphQL/mutations/mutations";

function SignUp({ onLogin }) {

  //JOI Validation for React-Hook-Forms
  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string().required(),
  });

  //React-Hook-Forms
  //control - React Hook Forms Controller this is used to control the input
  //handleSubmit - React Hook Forms handleSubmit function this is used to handle the submit event
  //formState - React Hook Forms formState this is used to access the form state
  //reset - React Hook Forms reset function this is used to reset the form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  //?Apollo Client Mutation
  const [createUser, { loading, error }] = useMutation(CREATE_USER); //createUser - The mutation function 
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const navigate = useNavigate(); // Navigate function to navigate to a different page

  //?Submit New User
  //This function is called when the form is submitted by react hook forms
  const onSubmit = async (data, event) => {
    event.preventDefault(); // Prevents page from refreshing on submit
    const { username, email, password } = data; // Destructure data from form

    try {
      // Send the mutation request with data as input
      const result = await createUser({
        variables: {
          input: {
            username,
            email,
            password,
          },
        },
      });
      console.log(result.data); //Response from the server
      onLogin(result.data.createUser); // Call onLogin function with the user to be save to state and session storage
      navigate("/"); // Navigate to the home page
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message); // Set error message state
    }
  };

  //Generates a random number that is used to select a background colour for the card component
  function getRandomNumber() {
    return Math.floor(Math.random() * 5);
  }
  //Generates a random emoji that is used to display a random emoji in the card component
  function getRandomPersonEmoji() {
    const personEmojis = ["👩", "👨", "🧑", "👧", "👦"];
    const randomIndex = Math.floor(Math.random() * personEmojis.length);
    return personEmojis[randomIndex];
  }

  return (
    <Card className={`shadow m-3 bg-${getRandomNumber()}`}>
      <Card.Body>
        {/* Form Header */}
        <div className="d-flex mb-3">
          <div className="emoji display-6 me-2 p-2 rounded-circle inner-shadow-emoji">
            {getRandomPersonEmoji()}
          </div>
          <div className="title">
            <Card.Title className="bold text-white">Sign Up</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              <i className="bi bi-calendar-event"></i>{" "}
              {new Date().toLocaleDateString()}
            </Card.Subtitle>
          </div>
        </div>
        {/* /Form Header */}
        <Form noValidate="noValidate" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Text Box */}
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              // Bootstrap input text box component
              <Form.Group controlId="username">
                <Form.Label className="visually-hidden">Username</Form.Label>
                <Form.Control
                  {...field}
                  type="text"
                  placeholder="Username"
                  size="lg"
                  className="form-shadow mb-2"
                />
                {errors.username && (
                  <Alert variant="danger" className="mb-2 alert-dark mb-0">
                    {errors.username.message}
                  </Alert>
                )}
              </Form.Group>
            )}
          />
          {/* /Email Text Box */}

          {/* Email Text Box */}
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              // Bootstrap input text box component
              <Form.Group controlId="email">
                <Form.Label className="visually-hidden">
                  Email address
                </Form.Label>
                <Form.Control
                  {...field}
                  type="email"
                  placeholder="Enter email"
                  size="lg"
                  className="form-shadow"
                />
                {errors.email && (
                  <Alert variant="danger" className="mt-2 alert-dark mb-0">
                    {errors.email.message}
                  </Alert>
                )}
              </Form.Group>
            )}
          />
          {/* /Email Text Box */}

          {/* Password Text Box */}
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              // Bootstrap input text box component
              <Form.Group controlId="password" className="mt-2">
                <Form.Label className="visually-hidden">Password</Form.Label>
                <Form.Control
                  {...field}
                  type="password"
                  placeholder="Password"
                  size="lg"
                  className="form-shadow"
                />
                {errors.password && (
                  <Alert variant="danger" className="mt-2 alert-dark mb-0">
                    {errors.password.message}
                  </Alert>
                )}
              </Form.Group>
            )}
          />
          {/* /Password Text Box */}
          {/* General Error Messages */}
          {errorMessage && (
            <Alert variant="danger" className="mt-2 alert-dark mb-0">
              {errorMessage}
            </Alert>
          )}
          {/* General Error Messages */}
          {/* Submit Button */}
          <Button
            variant="dark"
            size="lg"
            block="true"
            className="w-100 mt-2"
            type="submit"
          >
            Login <i className="bi bi-send-fill"></i>
          </Button>
          {/* /Submit Button */}
        </Form>
        {/* Login Link */}
        <p className="m-0 mt-1">
          Already have an account? <Link to="/signup">Login</Link> now!
        </p>
        {/* Login Link */}
      </Card.Body>
    </Card>
  );
}
export default SignUp;
