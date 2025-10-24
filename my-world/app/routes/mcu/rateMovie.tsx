import React from 'react'
import type { Route } from './+types/rateMovie';
import { Loading } from '~/components/loadingIcon';
import supabase from '~/superbaseclient';
import { Form } from 'react-router';
import { useRouteLoaderData, useParams } from "react-router";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: "Vote for " + params.movieId },
    { name: "description", content: "Cast your vote for " + params.movieId },
  ];
}

export async function action({request}: Route.ClientActionArgs){
  const formData = await request.formData();
  const vote = formData.get("vote");
  console.log("Vote received: ", vote);
  return null;
}


export const VoteModal = ({
  actionData,
}: Route.ComponentProps) => {

  const params = useParams();
  const movieId = params.movieId;

  const data = useRouteLoaderData("MCUMovieDetail");
  if (!data) {
    return <Loading />;
  }

  const movie_data = data.movieData;

  return (
    <div className='h-full w-[300px]  bg-amber-400'>
      <h1>Vote for {movie_data.title}</h1>
      <Form method='post'>
        <label htmlFor="vote">Your Vote:</label>
        <input type="text" name="vote" placeholder="Your Vote" />
        <button type="submit">Submit Vote</button>
      </Form>
    </div>
  )
}

export default VoteModal;