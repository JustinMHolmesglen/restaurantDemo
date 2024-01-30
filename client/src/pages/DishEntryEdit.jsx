//React
import { useEffect } from "react"; // useEffect hook
import { Controller, useForm } from "react-hook-form"; // React Hook Forms
import Joi from "joi"; // Joi Validation
import { joiResolver } from "@hookform/resolvers/joi"; // Joi Resolver for React Hook Forms
import { useParams, useNavigate } from "react-router-dom"; // React Router
//Apollo Client
import { useMutation, useQuery } from "@apollo/client"; // Apollo Client Hooks - useMutation
import { GET_DISH } from "../graphQL/queries/queries"; // GraphQL Query
import { EDIT_DISH } from "../graphQL/mutations/mutations"; // GraphQL Mutation
//React Bootstrap
import { GET_ALL_DISHES, GET_ALL_CATEGORIES } from "../graphQL/queries/queries"; // Import GET_DISH query
import { Card, Col, Form, Row, Button, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';


// This component is used to edit journal entries
function DishEntryEdit(props) {
  const userData = props.user; // User Data from App.js
  const { dishId } = useParams(); // Get the journal entry id from the url
  const navigate = useNavigate(); // Navigate function to navigate to a different page
  console.log(dishId);
  // GraphQL Query to get the journal entry
  // GET_JOURNAL_ENTRY - GraphQL Query
  // journalEntryId - The id of the journal entry to get
  // userData.token - The token from the user data
  const { loading, error, data } = useQuery(GET_DISH, {
    variables: { dishId },
    context: {
      headers: {
        authorization: `${userData.token}`,
      },
    },
  });

  const { loading: loadingCat, error: errorCat, data: dataCat, refetch: refetchCat } = useQuery(GET_ALL_CATEGORIES, {
    context: {
      headers: {
        authorization: `${userData.token}`,
      },
    },
  });

  // GraphQL Mutation for updating a journal entry
  const [editDish] = useMutation(EDIT_DISH);

  const onSubmit = async (formData, e) => {
    e.preventDefault();
    console.log(formData);
    const { dish, spice, description, category } = formData;
    try {
      // update the journal entry
      
      await editDish ({
        variables: {
          editDishId: dishId,
          input: { dish, spice, description, category, user: userData._id },
        },
        context: {
          headers: {
            authorization: `${userData.token}`,
          },
        },
      });
      
      // redirect to journal entry page
      navigate("/");
    } catch (error) {
      console.log(error);
      console.error(`Failed to update dish entry: ${error.message}`);
    }
  };
  


  // JOI Validation for React-Hook-Forms
  const schema = Joi.object({
    dish: Joi.string().min(3).max(256),
    spice: Joi.number().min(0).max(100),
    description: Joi.string().min(3).max(1024),
    category: Joi.string()
  });

  // React-Hook-Forms
  // control - React Hook Forms Controller this is used to control the input
  // watch - React Hook Forms watch function this is used to watch an input
  // handleSubmit - React Hook Forms handleSubmit function this is used to handle the submit event
  // setValue - React Hook Forms setValue function this is used to set the value of an input
  // formState - React Hook Forms formState this is used to access the form state
  // resolver - React Hook Forms resolver this is used to validate the form
  const {
    control,
    watch,
    handleSubmit,
    register,
    setValue,
    
    formState: { errors },
  } = useForm({
    //take out if doesn't work
    resolver: joiResolver(schema),
  });

  const watchSpice = watch("spice"); // watch is a React Hook Form function that watches a specific input field. In this case, it is watching the mood input field.

  // This function converts the mood score to an emoji
  const scoreToSpice = (score) => {
    const foodSpice = ["🧁", "🌶️", "🌶️🌶️", "🌶️🌶️🌶️", "🤯"];
    return foodSpice[score];
  };
  //I need this as the mood loads in a few secs after the page loads and I need to set the value of the mood to the current mood
  useEffect(() => {
    if (data) {
      setValue("spice", data.dish.spice);
    }
  }, [data]);

  if (loading) return <p>Loading... 🤔</p>;
  if (error) {
    console.log(error);
  }

  return (
    <Card className={"shadow text-black m-3 " + `bg-${watchSpice}`}>
      <Card.Body>
        <Form noValidate="noValidate" onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex align-items-center">
            {/* Displays emoji based on mood score */}
            <div className="emoji me-2 rounded-circle inner-shadow-emoji-large">
              {scoreToSpice(watchSpice)}
            </div>
            {/* /Displays emoji based on mood score */}
            <div className="title w-100">
              {/* Why Text Box */}
              <Controller
                name="dish"
                control={control}
                defaultValue={data.dish.dish}
                render={({ field }) => (
                  // Boostrap input text box component
                  <Form.Control
                    
                    type="text"
                    placeholder="Enter dish"
                    {...field}
                    className="bold mb-2 w-100 form-shadow"
                    size="lg"
                  />
                )}
              />
             

              {/* Date */}
              <Card.Subtitle className="pt-1 text-muted bold">
              <FontAwesomeIcon icon="fa-solid fa-calendar-days" />{" "}
                {new Date().toLocaleString()}
              </Card.Subtitle>
              {/* /Date */}
              {/* Error output */}
              {errors.dish && (
                <Alert variant="dark" className="mt-2 mb-0">
                  {errors.dish.message}
                </Alert>
              )}
            </div>
          </div>
          

          {/* Mood Range Slider */}
          <Row>
            <Col xs="2" className="text-center emoji">
              🌶️
            </Col>
            <Col xs="8">
              {/* Range Slider */}
              <Controller
                name="spice"
                control={control}
                defaultValue={2}
                render={({ field: { onChange, value } }) => (
                  <Form.Range
                    onChange={onChange}
                    value={value}
                    className="mt-3"
                    min="0"
                    max="4"
                  />
                )}
              />
              {/* /Range Slider */}
            </Col>
            <Col xs="2" className="text-center emoji">
              🤯
            </Col>
          </Row> 
          {/* /Mood Range Slider */}
          {/* Why Text Box */}
          <Controller
            name="description"
            control={control}
            defaultValue={data.dish.description}
            render={({ field }) => (
              // Boostrap input text box component
              <Form.Control
                {...field}
                as="textarea"
                rows={3}
                placeholder="Enter Your Dish to Review"
                aria-label="body"
                aria-describedby="How did you rate your meal on levels of spice, did you enjoy your meal?  Please leave a comment"
                className="mb-2 w-80 form-shadow"
              />
            )}
          />

        
          {/* Error output */}
          {errors.description && (
            <Alert variant="dark" className="mt-2">
              {errors.description.message}
            </Alert>
          )}
          <div>
           {/* <select onChange={onOptionChangeHandler} style={{width: "100%", textAlign: "center", padding: "12px"}}>*/}
           <Controller name="category" control={control} render={({ field }) => (
           <select {...register("category", { required: true })} style={{ width: "100%", textAlign: "center", padding: "12px" }}>
            {/* <option>Please choose one option</option> */}
            {dataCat && dataCat.categories.map((option, index) => (
              
                <option key={index} value={option._id}>
                  {option.name}
                </option>
              
            ))}
          </select>
           )}
           />
          </div>
          {/* /Error output */}
          {/* Submit Button */}
          <Button
            variant="dark"
            size="lg"
            block="true"
            className="w-100"
            type="submit"
          >
            Submit &nbsp;&nbsp;<FontAwesomeIcon icon="fa-solid fa-share-from-square" />
          </Button>
          {/* Submit Button */}
        </Form>
      </Card.Body>
    </Card>
  );
}

export default DishEntryEdit;
