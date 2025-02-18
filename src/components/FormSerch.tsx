import {faSpinner} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useState} from 'react'

export default function FormSerch() {
  const [inputForm, setInputForm] = useState('')
  const [responseArray, setResponseArray] = useState([])
  const [typeHeadArray, setTypeHeadArray] = useState([])

  const [loading, setLoading] = useState(false)
  const [invalidQueryMessage, setInvalidQueryMessage] = useState(false)
  const [noContentFoundMessage, setNoContentFoundMessage] = useState(false)

  // On submit button
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setResponseArray([])
    // manage error message if query is invalid
    if (inputForm.length < 4) {
      setInvalidQueryMessage(true)
      setNoContentFoundMessage(false)
    } else {
      callApi(inputForm)
    }
  }

  // Main Search API call
  const callApi = async (query: string) => {
    setTypeHeadArray([])
    setInvalidQueryMessage(false)
    setLoading(true)
    const url = 'https://jsonplaceholder.typicode.com/comments?q='
    const resp = await fetch(`${url}${query}`)

    // Manage API response
    if (resp.ok) {
      const data = await resp.json()
      const filteredList = data.slice(0, 20)
      setLoading(false)
      setResponseArray(filteredList)
      if (data.length) {
        setNoContentFoundMessage(true)
      }
    } else {
      setLoading(false)
      return []
    }
  }

  // TypeHead API call - on Input change
  const handleTypeaheadInput = async (query: string) => {
    setInvalidQueryMessage(false)
    setNoContentFoundMessage(false)
    // setResponseArray([]) // activate this field to hide result while typing

    const cleanQuery = query.replace(/^\s+/, '')
    setInputForm(cleanQuery)

    const url = 'https://jsonplaceholder.typicode.com/comments?q='
    let filteredArray = []

    // Manage query conditions
    if (query.length > 3) {
      const resp = await fetch(`${url}${query}`)
      const data = await resp.json()

      if (data.length) {
        filteredArray = data.slice(0, 5)
      }
    }
    setTypeHeadArray(filteredArray)
  }

  // Selection of typehead
  const handleTypeHeadSelection = (type: string) => {
    setInputForm(type)

    // Imposta il focus sull'elemento con id="formInput"
    const inputElement = document.getElementById('formInput') as HTMLInputElement
    if (inputElement) {
      inputElement.focus()
    }
  }

  return (
    <section className="flex justify-center min-h-[85dvh]">
      <div className="container relative">
        <form onSubmit={handleSubmit} className="w-full flex z-100 relative mt-36">
          <input
            id="formInput"
            value={inputForm}
            type="text"
            placeholder="Search here"
            className="p-4 w-full bg-white rounded-s-4xl shadow-xl"
            onChange={e => handleTypeaheadInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit}
          ></input>
          <button className="min-w-[100px] rounded-e-full px-4 bg-emerald-600 hover:bg-yellow-200 text-white hover:text-gray-700 font-light shadow-xl cursor-pointer">
            {!loading ? 'Submit' : <FontAwesomeIcon icon={faSpinner} spin />}
          </button>
        </form>

        {typeHeadArray.length > 0 && (
          <div className="relative">
            <div className="absolute -top-[30px] z-10 bg-white shadow-xl  rounded-b-xl text-gray-400 text-sm font-light pb-2 px-6 pt-12 w-[96%] left-1/2 transform -translate-x-1/2 ">
              {typeHeadArray.map((el: {email: string}, index) => (
                <div key={index} className="mb-4 italic cursor-pointer" onClick={() => handleTypeHeadSelection(el?.email)}>
                  {el?.email}
                </div>
              ))}
            </div>
          </div>
        )}
        {invalidQueryMessage && <div className="text-red-600 text-sm font-light p-3">Search must be at least 3 charactes long</div>}
        {noContentFoundMessage && (
          <div className="bg-white rounded-2xl mt-4 text-emerald-600 text-sm font-light p-3">No Content Found, try again</div>
        )}

        {responseArray.length > 0 && (
          <>
            <div className="p-4 bg-white rounded-2xl mt-7 mb-3 max-h-[400px] overflow-auto">
              {responseArray.map((post: {name: number; body: string; email: string}, index: number) => (
                <div key={index} className=" border-b-1 border-gray-200 p-2">
                  <div className="mb-2">
                    <span className="text-xs font-bold block mb-1">{post.name}</span>
                    <span className="text-xs block">{post.email}</span>
                  </div>
                  <div>
                    <span className="text-xs block text-gray-400 font-light italic">{post.body.substring(0, 64)} ...</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="px-4 py-1 bg-blue-500 text-white hover:bg-blue-400 rounded-2xl cursor-pointer" onClick={() => setResponseArray([])}>
              Clear all {responseArray.length} results
            </button>
          </>
        )}
      </div>
    </section>
  )
}
