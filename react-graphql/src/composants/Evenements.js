import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Link, BrowserRouter , Route } from 'react-router-dom'

import Details from './Details'
import '../css/style.css'

const GET_ALLEVENTS = gql`
	{
		allEvents(tags: "vod", limit: 10){
			items{
				id
				Video{poster}
                name
                Challengers {
                    name
                    pictureUrl
                }
				Tags {
					tagType
					name
					placeholders
				}
			}
		}
	}
`

function afficherEvenement (id) {
	alert("ID selectionné : " + id)
}


function Evenements() {
  const { loading, error, data} = useQuery(GET_ALLEVENTS);
  if (loading) return <h2>Chargement en cours ...</h2>;
  if (error) return <h2>Erreur d'exécution ! ${error.message}</h2>;
  if (!data.allEvents.items) return <h2>Aucune donnée</h2>;

  return (
	<div class="first">
        <div><h2 class ="title">Liste des évènements</h2></div>
        <div class="container">

            <BrowserRouter>
            {
                data.allEvents.items.map(evenement => (
                <div class = "card" key={evenement.id}>

                    <h4>
                        Évènements: <Link to={`/Details?eventName=${evenement.name}`}onClick={() => afficherEvenement(evenement.id)}>{evenement.name}</Link>
                    </h4>

                    <div>{evenement.Challengers.map(challeng => (
                        <div key={challeng.id}>
                            <div>Nom Challengers: {challeng.name}</div>
                            <div>img: {challeng.pictureUrl}</div>
                        </div>
                        ))}
                    </div>

                    <div>{evenement.Tags.map( tag => (
                        <fieldset>
                            <legend>Tags</legend>
                            <div key={tag.id}>
                                <div>Type tag: {tag.tagType }</div>
                                <div>Nom tag: {tag.name}</div>
                                <div>{tag.placeholders}</div>
                            </div>
                        </fieldset>
                        )
                        )}
                    </div>
                <Route  path="/Details" component={Details} />

                </div>
                ))
            }            
            </BrowserRouter>

        </div>
	</div>
  )
}

export default Evenements;