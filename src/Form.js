import React, {useState} from 'react'

const Form = ({searchText}) => {
    const [search, setSearch] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        searchText(search)
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="e.g politics" className="py-1 px-2 rounded-l-lg" onChange={(e) => setSearch(e.target.value)}/>
        <button type="submit" className="bg-blue-400 py-1 px-2 rounded-r-lg text-white">Search</button>
      </form>
    </div>
  )
}

export default Form
