import React from 'react'
import type { Route } from './+types/details';
import { Loading } from '~/components/loadingIcon';

export function meta({params}: Route.MetaArgs){
  return [
    {
      title: params.movieName + " Review",
    },
    {
      name: "description",
      content: "This is the details page for " + params.movieName,
    },
  ]
}

export async function loader({params} : Route.LoaderArgs){
  const movieDetails = "Details about " + params.movieName;
  return { details: movieDetails };
}

export function HydrateFallBack(){
  return <Loading />;
}

export const DetailsPage = ({loaderData} : Route.ComponentProps) => {
  return (
    <div>
      <h1>{loaderData.details}</h1>
    </div>
  )
}

export default DetailsPage;
