"use client"

import { useCallback, useRef, useReducer, useEffect } from "react"

const fileUploadReducer = (state, action) => {
  switch (action.type) {
    case "SET_FILES":
      return { ...state, files: action.payload }
    case "ADD_FILES":
      return { ...state, files: [...state.files, ...action.payload] }
    case "REMOVE_FILE":
      return {
        ...state,
        files: state.files.filter((file) => file.id !== action.payload),
        errors: [],
      }
    case "CLEAR_FILES":
      return { ...state, files: [], errors: [] }
    case "SET_DRAGGING":
      return { ...state, isDragging: action.payload }
    case "SET_ERRORS":
      return { ...state, errors: action.payload }
    case "CLEAR_ERRORS":
      return { ...state, errors: [] }
    default:
      return state
  }
}

export const useFileUpload = (options = {}) => {
  const {
    maxFiles = Number.POSITIVE_INFINITY,
    maxSize = Number.POSITIVE_INFINITY,
    accept = "*",
    multiple = false,
    initialFiles = [],
    onFilesChange,
    onFilesAdded,
  } = options

  const [state, dispatch] = useReducer(fileUploadReducer, {
    files: initialFiles.map((file) => ({ file, id: file.id, preview: file.url })),
    isDragging: false,
    errors: [],
  })

  const inputRef = useRef(null)
  const pendingFilesChangeRef = useRef(null)
  const pendingFilesAddedRef = useRef(null)

  useEffect(() => {
    if (pendingFilesChangeRef.current !== null) {
      try {
        // Callbacks may be undefined
        if (typeof onFilesChange === "function") onFilesChange(pendingFilesChangeRef.current)
      } finally {
        pendingFilesChangeRef.current = null
      }
    }
  }, [onFilesChange, state.files])

  useEffect(() => {
    if (pendingFilesAddedRef.current !== null) {
      try {
        if (typeof onFilesAdded === "function") onFilesAdded(pendingFilesAddedRef.current)
      } finally {
        pendingFilesAddedRef.current = null
      }
    }
  }, [onFilesAdded])

  const validateFile = useCallback(
    (file) => {
      if (file instanceof File) {
        if (file.size > maxSize) return `File "${file.name}" exceeds the maximum size of ${formatBytes(maxSize)}.`
      } else {
        if (file.size > maxSize) return `File "${file.name}" exceeds the maximum size of ${formatBytes(maxSize)}.`
      }

      if (accept !== "*") {
        const acceptedTypes = accept.split(",").map((t) => t.trim())
        const fileType = file instanceof File ? file.type || "" : file.type
        const fileExtension = `.${file instanceof File ? file.name.split(".").pop() : file.name.split(".").pop()}`

        const isAccepted = acceptedTypes.some((type) => {
          if (type.startsWith(".")) return fileExtension.toLowerCase() === type.toLowerCase()
          if (type.endsWith("/*")) {
            const baseType = type.split("/")[0]
            return fileType.startsWith(`${baseType}/`)
          }
          return fileType === type
        })

        if (!isAccepted) return `File "${file instanceof File ? file.name : file.name}" is not an accepted file type.`
      }

      return null
    },
    [accept, maxSize],
  )

  const createPreview = useCallback((file) => {
    if (file instanceof File) return URL.createObjectURL(file)
    return file.url
  }, [])

  const generateUniqueId = useCallback((file) => {
    if (file instanceof File) return `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    return file.id
  }, [])

  const clearFiles = useCallback(() => {
    // Clean up object URLs from current state
    state.files.forEach((file) => {
      if (file.preview && file.file instanceof File && file.file.type.startsWith("image/")) {
        URL.revokeObjectURL(file.preview)
      }
    })

    if (inputRef.current) inputRef.current.value = ""

    dispatch({ type: "CLEAR_FILES" })
    pendingFilesChangeRef.current = []
  }, [state.files])

  const addFiles = useCallback(
    (newFiles) => {
      if (!newFiles || newFiles.length === 0) return

      const newFilesArray = Array.from(newFiles)
      const errors = []

      dispatch({ type: "CLEAR_ERRORS" })

      if (!multiple) clearFiles()

      if (multiple && maxFiles !== Number.POSITIVE_INFINITY && state.files.length + newFilesArray.length > maxFiles) {
        errors.push(`You can only upload a maximum of ${maxFiles} files.`)
        dispatch({ type: "SET_ERRORS", payload: errors })
        return
      }

      const validFiles = []

      newFilesArray.forEach((file) => {
        if (multiple) {
          const isDuplicate = state.files.some(
            (existingFile) => existingFile.file.name === file.name && existingFile.file.size === file.size,
          )
          if (isDuplicate) return
        }

        if (file.size > maxSize) {
          errors.push(multiple ? `Some files exceed the maximum size of ${formatBytes(maxSize)}.` : `File exceeds the maximum size of ${formatBytes(maxSize)}.`)
          return
        }

        const error = validateFile(file)
        if (error) errors.push(error)
        else
          validFiles.push({
            file,
            id: generateUniqueId(file),
            preview: createPreview(file),
          })
      })

      if (validFiles.length > 0) {
        pendingFilesAddedRef.current = validFiles

        if (!multiple) {
          dispatch({ type: "SET_FILES", payload: validFiles })
          pendingFilesChangeRef.current = validFiles
        } else {
          dispatch({ type: "ADD_FILES", payload: validFiles })
          pendingFilesChangeRef.current = [...state.files, ...validFiles]
        }

        if (errors.length > 0) dispatch({ type: "SET_ERRORS", payload: errors })
      } else if (errors.length > 0) {
        dispatch({ type: "SET_ERRORS", payload: errors })
      }

      if (inputRef.current) inputRef.current.value = ""
    },
    [state.files, maxFiles, multiple, maxSize, validateFile, createPreview, generateUniqueId, clearFiles],
  )

  const removeFile = useCallback(
    (id) => {
      const fileToRemove = state.files.find((file) => file.id === id)
      if (fileToRemove && fileToRemove.preview && fileToRemove.file instanceof File && fileToRemove.file.type.startsWith("image/")) {
        URL.revokeObjectURL(fileToRemove.preview)
      }

      dispatch({ type: "REMOVE_FILE", payload: id })

      const updatedFiles = state.files.filter((file) => file.id !== id)
      pendingFilesChangeRef.current = updatedFiles
    },
    [state.files],
  )

  const clearErrors = useCallback(() => {
    dispatch({ type: "CLEAR_ERRORS" })
  }, [])

  const handleDragEnter = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch({ type: "SET_DRAGGING", payload: true })
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.currentTarget && e.currentTarget.contains && e.currentTarget.contains(e.relatedTarget)) return

    dispatch({ type: "SET_DRAGGING", payload: false })
  }, [])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      e.stopPropagation()
      dispatch({ type: "SET_DRAGGING", payload: false })

      if (inputRef.current && inputRef.current.disabled) return

      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        if (!multiple) addFiles([e.dataTransfer.files[0]])
        else addFiles(e.dataTransfer.files)
      }
    },
    [addFiles, multiple],
  )

  const handleFileChange = useCallback(
    (e) => {
      if (e.target && e.target.files && e.target.files.length > 0) addFiles(e.target.files)
    },
    [addFiles],
  )

  const openFileDialog = useCallback(() => {
    if (inputRef.current) inputRef.current.click()
  }, [])

  const getInputProps = useCallback(
    (props = {}) => {
      return {
        ...props,
        type: "file",
        onChange: handleFileChange,
        accept: props.accept || accept,
        multiple: props.multiple !== undefined ? props.multiple : multiple,
        ref: inputRef,
      }
    },
    [accept, multiple, handleFileChange],
  )

  return [
    state,
    {
      addFiles,
      removeFile,
      clearFiles,
      clearErrors,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      handleFileChange,
      openFileDialog,
      getInputProps,
    },
  ]
}

export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i]
}




