import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Linkedin, Mail, ArrowRight } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div>
                        <div className="flex items-center space-x-2 mb-6">
                            <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-xl">C</span>
                            </div>
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                Carbon Mkt
                            </span>
                        </div>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Accelerating the transition to a net-zero future through transparent, high-impact carbon credit trading.
                        </p>
                        <div className="flex space-x-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-500 transition-all duration-300 group">
                                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-white" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Marketplace</h3>
                        <ul className="space-y-4">
                            {['All Projects', 'New Arrivals', 'High Impact', 'Verra Certified'].map((item) => (
                                <li key={item}>
                                    <Link to="/" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Company</h3>
                        <ul className="space-y-4">
                            {['About Us', 'Sustainability', 'Patners', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link to="#" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Stay Updated</h3>
                        <p className="text-gray-400 mb-4">
                            Get the latest updates on new projects and sustainability trends.
                        </p>
                        <div className="space-y-3">
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full bg-gray-800 border-none rounded-lg py-3 pl-4 pr-12 text-white focus:ring-2 focus:ring-primary-500 transition-all"
                                />
                                <button className="absolute right-2 top-2 p-1 bg-primary-600 rounded-md hover:bg-primary-700 transition-colors">
                                    <ArrowRight className="w-4 h-4 text-white" />
                                </button>
                            </div>
                            <p className="text-xs text-gray-500">
                                By subscribing, you agree to our Privacy Policy.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                    <p>© 2024 Carbon Marketplace. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
