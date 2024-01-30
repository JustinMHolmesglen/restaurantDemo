import { useQuery } from "@apollo/client"; // The useQuery hook allows send a query and get the response
import DishEntry from "../components/DishEntry"; // Import DishEntry component
import DishCard from "../components/DishCard"; // Import DishCard component
import { useEffect } from "react";
import { GET_ALL_DISHES, GET_ALL_CATEGORIES } from "../graphQL/queries/queries"; // Import GET_DISH query

function Dish({ user }) {

  //The useQuery hook allows send a query and get the response
  //Loading = true while the request is in progress
  //Error = true if the request fails
  //Data = the response from the server
  //Refetch = a function that refetches the query

  //This query is protected by the JWT token. A valid token must be sent in the request header
  const { loading, error, data, refetch } = useQuery(GET_ALL_DISHES, {
    context: {
      headers: {
        authorization: user.token,
      },
    },
  });

  const { loading: loadingCat, error: errorCat, data: dataCat, refetch: refetchCat } = useQuery(GET_ALL_CATEGORIES, {
    context: {
      headers: {
        authorization: user.token,
      },
    },
  });

  useEffect(() => {
    console.log(dataCat);
    refetch(); // Refetch the query
  }, [dataCat]);

  if (loading) return <p>Loading... 🤔</p>;   //If the request is in progress, display a loading message
  if (error) return <p>Error 😭</p>; //If the request fails, display an error message

  return (
    <>
      {/* JournalEntry component */}
      <DishEntry user={user} dataCat={dataCat} /> {/* Allows the user to add new entices */}
      {/* Display the journal entries in the JournalCard Component */}
      {data.dishes.map((data) => (
        <DishCard key={data._id} data={data} user={user} />
      ))}
    </>
  );
}

export default Dish;
