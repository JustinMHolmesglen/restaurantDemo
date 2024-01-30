import React from 'react'
import DishEntry from '../components/DishEntry'

const Dishes = ({user}) => {
  return (
    <div><h2>Dishes</h2>

        <DishEntry user={user}/>
    </div>
  )
}

export default Dishes