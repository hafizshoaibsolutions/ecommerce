import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchCategories } from "@/store/slices/categorySlice"

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
  
  const dispatch = useDispatch()
  const reduxCategories = useSelector((state) => state.categories.allCategories)

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Check localStorage cache first
        const cachedData = localStorage.getItem("appCategories")
        const cacheTimestamp = localStorage.getItem("appCategoriesTime")
        const now = new Date().getTime()

        // Use cache if valid and not expired
        if (cachedData && cacheTimestamp) {
          const timeDiff = now - parseInt(cacheTimestamp)
          if (timeDiff < cacheTimeout) {
            const parsedData = JSON.parse(cachedData)
            setCategories(parsedData)
            console.log("📦 Using cached categories from localStorage")
            setLoading(false)
            return
          }
        }

        // Check if categories exist in Redux store
        if (Array.isArray(reduxCategories) && reduxCategories.length > 0) {
          console.log("🔄 Using categories from Redux store...")
          const topLevelCategories = reduxCategories.filter((cat) => !cat.parent)
          
          // Save to localStorage cache
          localStorage.setItem("appCategories", JSON.stringify(topLevelCategories))
          localStorage.setItem("appCategoriesTime", now.toString())
          
          setCategories(topLevelCategories)
          console.log(`✅ Loaded ${topLevelCategories.length} categories from Redux`)
          setLoading(false)
          return
        }

        // Redux store is empty - fetch from API
        console.log("📡 Fetching categories from API...")
        const result = await dispatch(fetchCategories())
        
        if (result.payload?.categories && Array.isArray(result.payload.categories)) {
          const topLevelCategories = result.payload.categories.filter((cat) => !cat.parent)
          
          // Save to localStorage cache
          localStorage.setItem("appCategories", JSON.stringify(topLevelCategories))
          localStorage.setItem("appCategoriesTime", now.toString())
          
          setCategories(topLevelCategories)
          console.log(`✅ Fetched and cached ${topLevelCategories.length} categories from API`)
        } else {
          throw new Error("Failed to fetch categories from API")
        }
      } catch (err) {
        console.error("❌ Error fetching categories:", err.message)
        setError(err.message)
        
        // Fallback: Try to use stale cache even if expired
        const cachedData = localStorage.getItem("appCategories")
        if (cachedData) {
          console.log("⚠️ Using stale cache as fallback")
          setCategories(JSON.parse(cachedData))
          setError(null) // Clear error since we have fallback data
        }
      } finally {
        setLoading(false)
      }
    }

    fetchCategoriesData()
  }, [cacheTimeout, reduxCategories, dispatch])

  return { categories, loading, error }
}
