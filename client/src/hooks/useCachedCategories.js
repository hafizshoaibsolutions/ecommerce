import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

/**
 * Custom hook to fetch and cache categories globally
 * Prevents multiple API calls across components
 * 
 * @param {number} cacheTimeout - Cache duration in milliseconds (default: 1 hour)
 * @returns {Object} { categories, loading, error }
 */
export function useCachedCategories(cacheTimeout = 1 * 60 * 60 * 1000) {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  // Move useSelector to the top level of the hook
  const reduxCategories = useSelector((state) => state.categories.allCategories)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        setError(null)

        // Check localStorage cache
        const cachedData = localStorage.getItem("appCategories")
        const cacheTimestamp = localStorage.getItem("appCategoriesTime")
        const now = new Date().getTime()

        // Use cache if valid and not expired
        if (cachedData && cacheTimestamp) {
          const timeDiff = now - parseInt(cacheTimestamp)
          if (timeDiff < cacheTimeout) {
            const parsedData = JSON.parse(cachedData)
            setCategories(parsedData)
            console.log("📦 Using cached categories from useCachedCategories hook")
            setLoading(false)
            return
          }
        }
        // Get categories from the redux store instead of making an API call
        // Cache expired or doesn't exist - use Redux store data
        console.log("🔄 Using categories from Redux store...")
       
        const data = reduxCategories

        console.log(data, "data from redux store in useCachedCategories hook")

        if (Array.isArray(data) && data.length > 0) {
          // Filter only top-level categories (parent: null)
          const topLevelCategories = data.filter((cat) => !cat.parent)
          
          // Save to cache
          localStorage.setItem("appCategories", JSON.stringify(topLevelCategories))
          localStorage.setItem("appCategoriesTime", now.toString())
          
          setCategories(topLevelCategories)
          console.log(`✅ Cached ${topLevelCategories.length} categories`)
        } else {
          throw new Error("No categories available in Redux store")
        }
      } catch (err) {
        console.error("❌ Error fetching categories:", err)
        setError(err.message)
        
        // Fallback: Try to use stale cache even if expired
        const cachedData = localStorage.getItem("appCategories")
        if (cachedData) {
          console.log("⚠️ Using stale cache due to error")
          setCategories(JSON.parse(cachedData))
        }
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [cacheTimeout, reduxCategories])

  return { categories, loading, error }
}
