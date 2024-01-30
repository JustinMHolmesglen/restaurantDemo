import { Card, Button, Container } from "react-bootstrap"; //import the Card and Button components from react bootstrap
import { useMutation, useQuery, gql } from "@apollo/client"; //import the useMutation hook from apollo client
import { Link } from "react-router-dom"; //import the Link component
import { DELETE_DISH } from "../graphQL/mutations/mutations"; //import the delete journal entry mutation
import { GET_ALL_CATEGORIES } from "../graphQL/queries/queries";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import * as styles from './DishCard.css'

//This component is used to display the journal entries on the home page
function DishCard({ data, user }) {

  const userData = user;
  //function to convert the mood score to an emoji
  const scoreToEmoji = (score) => {
    const emojiSadToHappy = ["🧁", "🌶️", "🌶️🌶️", "🌶️🌶️🌶️", "🤯"];
    return emojiSadToHappy[score];

  };
  //function to convert the timestamp to a date
  const formatDate = (timestamp) => {
    const date = new Date(parseInt(timestamp)).toLocaleDateString();
    return toString(date);
  };

  const { loading: loadingCat, error: errorCat, data: dataCat, refetch: refetchCat } = useQuery(GET_ALL_CATEGORIES, {
    context: {
      headers: {
        authorization: `${userData.token}`,
      },
    },
  });

  //useMutation hook to delete journal entries
  const [deleteDish] = useMutation(DELETE_DISH, {
    context: {
      headers: {
        authorization: `${user.token}`,
      },
    },
    //update the cache to remove the deleted journal entry
    update(cache) {
      cache.modify({
        fields: {
          //remove the deleted journal entry from the journalEntries array
          //existingEntries is the array of journal entries
          //readField is a function that reads a field from the cache
          dishEntries(existingEntries = [], { readField }) {
            //find the journal entry that was deleted and remove it from the array
            return existingEntries.filter(
              (entryRef) => data._id !== readField("_id", entryRef)
            );
          },
        },
      });
    },
  });

  function filterIdToNames(array, idArray) {
    return array.filter(item => idArray.includes(item._id)).map(item => item.name);
  }

  //handle delete function for deleting dish review entries, running this funciton upon click of the delete button in the DishCard element
  const handleDelete = async () => {
    console.log(data._id);
    try {
      //delete the dish review entry
      //deleteDishId is the id of the dish review entry to be deleted
      const result = await deleteDish({
        variables: { deleteDishId: data._id },
      });
      //send result of the script to the console to check if the data has been deleted
      console.log(result)

      if (result.errors) {
        //if there are errors, throw an error
        throw new Error(result.errors[0].message);
      }
    } catch (error) {
      console.error(`Failed to delete your review: ${error.message}`);
    }
  };
  //end javascript

  if (loadingCat) return <p>Loading... 🤔</p>;
  if (errorCat) {
    console.log(errorCat);
  }
  console.log(dataCat);

  return (
    <Container className={`styles.flex row`}>
    <Card className={`shadow bg-${data.spice} text-black m-3`}>
      <Card.Body>
        <div className="d-flex">
          {/* Displays the mood emoji */}
          <div className="emoji display-6 me-2 p-2 rounded-circle inner-shadow-emoji">
            {scoreToEmoji(data.spice)}
          </div>
          {/* /Displays the mood emoji */}
          {/* Displays the title and date of the journal entry */}
          <div className="title">
            <Card.Title className="bold">{data.dish}</Card.Title>
            <Card.Subtitle className="mb-2 text-black">
              {/* Date */}
              {/* <Card.Subtitle className="pt-1 text-muted bold">
              <FontAwesomeIcon icon="fa-solid fa-calendar-days" />{" "}
                {new Date().toLocaleString()}
              &nbsp;
              </Card.Subtitle> */}
              {/* /Date */}
              
            </Card.Subtitle>
            </div>
          {/* /Displays the title and date of the journal entry */}
          {/* Displays the edit and delete buttons */}
          <div className="ms-auto">
            <Link
              to={`./edit/${data._id}`}
              variant="dark"
              size="sm"
              className="btn btn-dark rounded-circle inner-shadow mx-2"
            >
              <FontAwesomeIcon icon="fa-solid fa-scissors" />
            </Link>
            <Button
              variant="dark"
              size="sm"
              className="rounded-circle inner-shadow"
              onClick={handleDelete}
            >
              <FontAwesomeIcon icon="fa-solid fa-trash-can"/>
            </Button>
            {/* /Displays the edit and delete buttons */}
          </div>
        </div>
        {/* Displays the body of the journal entry */}
        <Card.Text className="mt-2">{data.description}</Card.Text>
        <Card.Text className="mt-2">{filterIdToNames(dataCat.categories, data.category)}</Card.Text>
        {/* /Displays the body of the journal entry */}
      </Card.Body>
    </Card>
    </Container>
  );
}

export default DishCard;
