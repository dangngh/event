import React from 'react'

const EventsList = (props) => {
  console.log(props.events)
  return (
    <div>
      <ul class='events-list'>
        {props.events.map(event => (
          <li className='event-details' key={event.id} style={{ width: 295, backgroundImage: `url(${event.images[0].url})` }}>
            <a className='event-link' href={event.url} target='_blank' rel='noreferrer'>
              <p className='event-name'>{event.name}</p>
              <p className='event-date'>{event.dates.start.localDate}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default EventsList