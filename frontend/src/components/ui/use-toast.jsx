"use client"

import * as React from "react"
import { createContext, useContext, useState, useCallback } from "react"

const ToastContext = createContext()

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = "success") => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3500)
  }, [])

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[9999] space-y-3">
        {toasts.map(({ id, message, type }) => (
          <div
            key={id}
            className={`px-4 py-3 rounded-lg shadow-lg text-white animate-in fade-in slide-in-from-bottom-5
              ${type === "success" ? "bg-green-500" :
                type === "error" ? "bg-red-500" :
                type === "warning" ? "bg-yellow-500 text-black" : "bg-gray-800"}`}
          >
            {message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
