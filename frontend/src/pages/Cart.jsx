import { Link } from 'react-router-dom'

const Cart = () => {
    // Mock cart items
    const cartItems = [
        { id: 1, name: 'Amazon Rainforest Conservation', price: 28.50, quantity: 2, image: 'https://images.unsplash.com/photo-1511497532942-9f382b8136c4?auto=format&fit=crop&w=200&q=80' },
        { id: 2, name: 'Direct Air Capture - Iceland', price: 850.00, quantity: 1, image: 'https://images.unsplash.com/photo-1569163139599-0f4517e36b31?auto=format&fit=crop&w=200&q=80' }
    ]

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    const fee = subtotal * 0.05 // 5% service fee
    const total = subtotal + fee

    if (cartItems.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
                <p className="text-gray-500 mb-8">Looks like you haven't added any carbon credits yet.</p>
                <Link to="/" className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                    Browse Projects
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-6">
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                            <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="ml-6 flex-1 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-gray-800">{item.name}</h3>
                                    <button className="text-gray-400 hover:text-red-500">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div className="flex items-center border border-gray-200 rounded-lg">
                                        <button className="px-3 py-1 text-gray-500 hover:bg-gray-50">-</button>
                                        <span className="px-3 py-1 font-medium text-gray-800 border-x border-gray-200">{item.quantity}</span>
                                        <button className="px-3 py-1 text-gray-500 hover:bg-gray-50">+</button>
                                    </div>
                                    <div className="font-bold text-lg text-gray-800">${(item.price * item.quantity).toFixed(2)}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sticky top-24">
                        <h3 className="text-lg font-bold text-gray-800 mb-6">Order Summary</h3>
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Service Fee (5%)</span>
                                <span>${fee.toFixed(2)}</span>
                            </div>
                            <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-xl text-gray-800">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                        <button className="w-full bg-primary-600 text-white font-bold py-4 rounded-xl hover:bg-primary-700 transition-transform active:scale-95 shadow-md hover:shadow-lg">
                            Proceed to Checkout
                        </button>
                        <p className="text-xs text-center text-gray-500 mt-4">
                            Secure checkout verified by Stripe 🔒
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
