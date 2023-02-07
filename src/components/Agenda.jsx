// Chargement des dépendances (librairie React ici)
import React from 'react';
import OneEvent from './OneEvent.jsx'
import Input from './Input.jsx'
/*
 * API OpenData de la région Ile-de-France : 
 * https://data.iledefrance.fr/explore/dataset/evenements-publics-cibul/api
 *
 * URL finale à appeler en HTTP GET, récupère 36 résultats (paramètre rows)
 */
//const url = /* ... */;

// Composant React de type classe : le plus simple lorsqu'il y a du state
export default class Agenda extends React.Component {

    constructor(props) {
        super(props);
        this.state = { rawEvents: [], events: [] }
    }//plus besoin du constr et de this.

    componentDidMount() {
        let fetchEvents = fetch('https://data.iledefrance.fr/api/records/1.0/search/?dataset=evenements-publics-cibul&q=&rows=9&facet=keywords_fr&facet=updatedat&facet=firstdate_begin&facet=firstdate_end&facet=lastdate_begin&facet=lastdate_end&facet=location_city&facet=location_department&facet=location_region&facet=location_countrycode')
        fetchEvents.then(resp => resp.json())
            .then(result => {
                this.setState({ rawEvents: result.records, events: result.records });
            })
    }

    render() {

        const setFilter = (value) => {
            //filtrer si au moins 3 characteres, sinon monrter tout les resultats
            if (value.length <= 3) {
                if(this.state.events.length === this.state.rawEvents.length) return
                this.setState({ events: this.state.rawEvents })
                return
            }
            this.setState({
                events: this.state.rawEvents.filter((event) => {
                    return event.fields.title_fr.toLowerCase().includes(value.toLowerCase())
                })
            });
        }

        return (
            <>
                <label>Chercher dans le titre&nbsp;</label>
                <Input setFilter={setFilter} />
                <section className="card-list d-flex flex-wrap justify-content-around">
                    {
                        this.state.events.map((event, index) => {
                            return <OneEvent event={event} key={index} />
                        })
                    }
                </section>
            </>
        );
    }
}