import React from 'react'
import type {Route} from './+types/index';
import { Loading } from '~/components/loadingIcon';

export function meta({}: Route.MetaArgs ) {
  return [
    { title: "A Monument to the Marvel Cinematic Universe"},
    { name: "description", content: "Rewatch cinematic glory and participate in a fun ranking of the Marvel Cinematic Universe"},
  ]
}

export async function loader({} : Route.LoaderArgs){
  const mcuList = "Hello";
  return { listOfMovies: mcuList};
}

export function HydrateFallBack(){
  return <Loading />;
}

export const IndexPage = () => {
  return (
    <div>IndexPage</div>
  )
}

export default IndexPage;