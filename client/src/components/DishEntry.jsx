// React
import { useState, useEffect } from "react";

import { Controller, useForm } from "react-hook-form"; //React Hook Form

import Joi from "joi"; //Joi Validation Library
import objectId from "joi-objectid";
// Joi.objectId = objectId(Joi);
import { joiResolver } from "@hookform/resolvers/joi"; //Joi Resolver for React Hook Form. - This is needed to use Joi with React Hook Form
// Apollo Client
import { useMutation, gql, useQuery } from "@apollo/client"; //Apollo Client Hooks - useMutation
import { ADD_DISH } from "../graphQL/mutations/mutations"; //GraphQL Mutation
// React Bootstrap
import { Card, Col, Form, Row, Button, Alert } from "react-bootstrap"; //React Bootstrap
import { GET_DISH } from '../graphQL/queries/queries';


function DishEntry(props) {
  const userData = props.user; //User Data from App.js
  const dataCat = props.dataCat;

  //Joi Validation
  const schema = Joi.object({
    dish: Joi.string().min(3).max(256),
    spice: Joi.number().min(0).max(100),
    description: Joi.string().min(3).max(1024),
    // category: Joi.objectId(),

  });

  const { loading, error, data } = useQuery(GET_DISH, {
    context: {
      headers: {
        authorization: `${userData.token}`,
      },
    },
  });

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);
  //useForm
  //control - React Hook Forms Controller this is used to control the input
  //handleSubmit - React Hook Forms handleSubmit function this is used to handle the submit event
  //formState - React Hook Forms formState this is used to access the form state
  //reset - React Hook Forms reset function this is used to reset the form
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
      dish: "Please choose a Meal to Review Today! 🍽️",
      spice: 2,
      description: "How did you rate your meal on levels of spice, did you enjoy your meal?  Please leave a comment",
      category: ""
    },
  });

  const watchSpice = watch("spice"); //watch is a React Hook Form function that watches a specific input field. In this case, it is watching the mood input field.

  //onSubmit
  const onSubmit = async (data) => {
    console.log(data);
    data.user = userData.id; //Add the user id to the data object
    const { dish, description, spice, category } = data; //Destructure the data object
    const token = userData.token; //Get the token from the user data
    await addDish({ dish, description, spice, category }, token); //Call the createJournal function and pass in the data object and the token
  };

  //This function converts the mood score to an emoji
  const scoreToSpice = (score) => {
    const foodSpice = ["🧁", "🌶️", "🌶️🌶️", "🌶️🌶️🌶️", "🤯🌶️🌶️🌶️🌶️"];
    return foodSpice[score];
  };

  //GraphQL Mutation for creating a journal entry
  const [addDishEntry] = useMutation(ADD_DISH, {
    //update the cache to add the new journal entry
    update(cache, { data: { addDish } }) {
      cache.modify({
        fields: {
          //add the new journal entry to the journalEntries array
          dishEntries(existingEntries = []) {
            //create a new journal entry reference
            const newEntryRef = cache.writeFragment({
              data: addDish,
              fragment: gql`
                fragment NewDishEntry on DishEntry {
                  _id
                  dish
                  description
                  spice
                  category
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
  //This function is used to create a journal entry
  const addDish = async (data, token) => {
    //Destructure the data object
    let { dish, description, spice, category } = data;
    spice = parseInt(spice); //Convert the mood score to an integer
    try {
      //Send the mutation request with data as input
      console.log("await reached");
      const result = await addDishEntry({
        variables: {
          input: {
            dish,
            description,
            spice,
            category
          },
        },
        context: {
          headers: {
            authorization: `${token}`,
          },
        },
      });
      console.log(result.data.addDish);
    } catch (error) {
      console.error(error);
    }
  };

  // const [data, setData] = useState("Please choose one option");

  //   const options = [
  //     "soups",
  //     "mains",
  //     "entries",
  //     "deserts",
  //     "drinks",
  // ];

  //   const onOptionChangeHandler = (event) => {
  //     setData(event.target.value);
  //     console.log(
  //         "User Selected Value - ",
  //         event.target.value
  //     );
  // };
  // const validate = (value) => {
  //   const matches = value.match(
  //     /^(?:0\.(?:0[0-9]|[0-9]\d?)|[0-9]\d*(?:\.\d{1,2})?)(?:e[+-]?\d+)?$/
  //   );
  //   return matches?.length > 0 || "Not a Number";
  // };

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
                render={({ field }) => (
                  // Boostrap input text box component
                  <Form.Control
                    {...field}
                    type="text"
                    placeholder="Enter dish"
                    aria-label="why"
                    aria-describedby="Enter dish menu item to review"
                    className="bold mb-2 w-100 form-shadow"
                    size="lg"
                  />
                )}
              />
              {/* Error output */}
              {/* /Why Text Box */}

              {/* Date */}
              <Card.Subtitle className="pt-1 text-muted bold">
                <i className="bi bi-calendar-event"></i>{" "}
                {new Date().toLocaleString()}
              </Card.Subtitle>
              {/* /Date */}
            </div>
          </div>
          {/* Error output */}
          {errors.dish && (
            <Alert variant="dark" className="mt-2 mb-0">
              {errors.dish.message}
            </Alert>
          )}
          {/* Error output */}

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
            render={({ field }) => (
              // Boostrap input text box component
              <Form.Control
                {...field}
                as="textarea"
                rows={3}
                placeholder="Enter Your Dish to Review"
                aria-label="body"
                aria-describedby="How did you rate your meal on levels of spice, did you enjoy your meal?  Please leave a comment"
                className="mb-2 w-100 form-shadow"
              />
            )}
          />

          {/* <select onChange={onOptionChangeHandler} style={{width: "100%", textAlign: "center", padding: "12px"}}>*/}
          <select {...register("category", { required: true })} style={{ width: "100%", textAlign: "center", padding: "12px" }}>
            {/* <option>Please choose one option</option> */}
            {dataCat && dataCat.categories.map((option, index) => {
              return (
                <option key={index} value={option._id}>
                  {option.name}
                </option>
              );
            })}
          </select>
          <h4 style={{ textAlign: "center", padding: "12px" }}>You selected: {data} </h4>
          {/* { />
          )}
          /> */}
          {/* Error output */}
          {errors.description && (
            <Alert variant="dark" className="mt-2">
              {errors.description.message}
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
      </Card.Body>
    </Card>
  );
}

export default DishEntry;
