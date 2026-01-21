// components/Events.jsx
import { useEffect, useState } from 'react'
import { client } from '../lib/sanity'

const Events = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log('Fetching events...')
        
        // SIMPLEST possible query
        const query = '*[_type == "event"]{name, description, date}'
        const data = await client.fetch(query)
        
        console.log('Data received:', data)
        setEvents(data)
        
      } catch (error) {
        console.error('Failed to fetch:', error)
        console.log('Error details:', {
          projectId: client.config().projectId,
          url: `https://${client.config().projectId}.apicdn.sanity.io`
        })
      } finally {
        setLoading(false)
      }
    }
    
    fetchEvents()
  }, [])

  if (loading) {
    return <div style={{padding: '20px'}}>Loading events...</div>
  }

  return (
    <div style={{padding: '20px'}}>
      <h2>Events ({events.length})</h2>
      
      {events.length === 0 ? (
        <div style={{background: '#666666', padding: '20px', borderRadius: '8px'}}>
          <p>No events found.</p>
        </div>
      ) : (
        events.map(event => (
          <div key={event._id} style={{
            border: '1px solid #ddd',
            padding: '15px',
            margin: '10px 0',
            borderRadius: '5px'
          }}>
            <h3 style={{margin: '0 0 10px 0'}}>{event.name}</h3>
            <p style={{margin: '0 0 10px 0'}}>{event.description}</p>
            <small style={{color: '#666'}}>{event.date}</small>
          </div>
        ))
      )}
    </div>
  )
}

export default Events