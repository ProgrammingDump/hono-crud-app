'use client'
import { Button } from '@/components/ui/button'
import { SunIcon, MoonIcon } from 'lucide-react'
import { useTheme } from '@/app/context/ThemeContext'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 ease-in-out"
    >
      {theme === 'light' ? (
        <MoonIcon className="h-5 w-5" />
      ) : (
        <SunIcon className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
} 