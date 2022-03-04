import axios from 'axios'
import { debounce } from 'lodash'
import { useState, useCallback, useEffect } from 'react'

function useInfiteScroll(urlName) {
  const [loading, setLoading] = useState(true)
  const [response, setResponse] = useState([])
  const [error, setError] = useState()
  const [pageNumber, setPageNumber] = useState(1)
  const [pageInfo, setPageInfo] = useState()
  const [loadingPage, setLoadingPage] = useState(false)
  const getMoreResultsController = new AbortController()
  const getInitialResultsController = new AbortController()
  const getPageInfoController = new AbortController()
  const debouncedLoadMoreEpisodes = useCallback(
    debounce(() => setPageNumber((prevState) => prevState + 1), 500),
    []
  )
  // infite scroll
  const handleScroll = (e) => {
    if (
      window.innerHeight + e.target.documentElement.scrollTop >
      e.target.documentElement.scrollHeight - 400
    ) {
      debouncedLoadMoreEpisodes()
    }
  }

  useEffect(() => {
    if (pageNumber > 1 && pageNumber <= pageInfo.info.pages) {
      setLoadingPage(true)
      axios
        .get(`https://rickandmortyapi.com/api/${urlName}?page=${pageNumber}`, {
          signal: getMoreResultsController.signal,
        })
        .then((res) =>
          setResponse((prevData) => [...prevData, ...res.data.results])
        )
        .catch((err) => setError(err))
        .finally(() => setTimeout(() => setLoadingPage(false), 500))
    }
    return () => {
      getMoreResultsController.abort()
    }
  }, [pageNumber])

  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/${urlName}?page=${pageNumber}`, {
        signal: getInitialResultsController.signal,
      })
      .then((res) =>
        setResponse((prevData) => [...prevData, ...res.data.results])
      )
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
    axios
      .get(`https://rickandmortyapi.com/api/${urlName}`, {
        signal: getPageInfoController.signal,
      })
      .then((res) => setPageInfo(res.data))
      .catch((err) => setError(err))

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      getInitialResultsController.abort()
      getPageInfoController.abort()
    }
  }, [])

  return { response, loading, loadingPage, error }
}

export default useInfiteScroll
