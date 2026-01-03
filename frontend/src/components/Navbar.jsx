import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sun, Moon, ShoppingCart, User, LayoutDashboard, Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const navLinks = [
    { name: 'Projects', path: '/' },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm transition-colors duration-300 dark:bg-gray-900/80 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-primary-500/30 transition-all duration-300 transform group-hover:scale-105">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
              Carbon Mkt
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center space-x-2 text-sm font-medium transition-colors duration-200 ${isActive(link.path)
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
                  }`}
              >
                {link.icon && <link.icon className="w-4 h-4" />}
                <span>{link.name}</span>
              </Link>
            ))}

            <div className="flex items-center space-x-4 pl-4 border-l border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-300 transition-colors"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <Link
                to="/cart"
                className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-300 transition-colors group"
              >
                <ShoppingCart className="w-5 h-5 group-hover:text-primary-600 transition-colors" />
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary-600 rounded-full">
                  2
                </span>
              </Link>

              <Link
                to="/login"
                className="flex items-center space-x-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-md hover:shadow-lg active:scale-95 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-300"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 absolute w-full shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/cart"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 dark:text-gray-300"
              onClick={() => setIsOpen(false)}
            >
              Cart (2 items)
            </Link>
            <Link
              to="/login"
              className="block w-full text-center mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

