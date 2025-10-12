import React from 'react'
import type { Route } from './+types/vote';
import { Loading } from '~/components/loadingIcon';
import supabase from '~/superbaseclient';
import { Form } from 'react-router';

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: "Vote for " + params.movieId },
    { name: "description", content: "Cast your vote for " + params.movieId },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const movieId = params.movieId;
  return { movieId };
}

export function HydrateFallBack(){
  return <Loading />;
}

export async function clientAction({request}: Route.ClientActionArgs){
  const formData = await request.formData();
  const vote = formData.get("vote");
  console.log("Vote received: ", vote);
  return null;
}


export const VotingPage = ({
  loaderData,
  actionData,
}: Route.ComponentProps) => {
  return (
    <div>
      <h1>Vote for {loaderData.movieId}</h1>
      <Form method='post'>
        <label htmlFor="vote">Your Vote:</label>
        <input type="text" name="vote" placeholder="Your Vote" />
        <button type="submit">Submit Vote</button>
      </Form>
    </div>
  )
}

export default VotingPage;