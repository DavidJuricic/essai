import React from 'react';

export default function OneEvent(props) {
    let description=''
    if(typeof props.event.fields.longdescription_fr != 'undefined'){
        //description=props.event.fields.longdescription_fr
        description=props.event.fields.longdescription_fr.replace(/<[^>]+>/gm, '')
        //console.log(props.event.fields.longdescription_fr.replace('/<[^>]+>/gm', ''))
        // remplace tous les tag entre parenthèses: ici (p|br|strong|em) dans une chaine de charactères et retire les double quotes 
        //description= JSON.stringify(props.event.fields.longdescription_fr).replaceAll(/<(/)(p|br|strong|em|)[^>]>/g, ' ').replaceAll('"', '') 
    }

    return (
        <div className=' card text-center mb-2' style={{ width: "350px" }}>
            <div className=""><img className="card-image-top" src={props.event.fields.thumbnail} alt="appercu" /></div>
            <h2>{props.event.fields.title_fr}</h2>
            <p>{props.event.fields.location_name}</p>
            <p>{props.event.fields.daterange_fr}</p>
            <p>{description}</p>
        </div>
    )
}
