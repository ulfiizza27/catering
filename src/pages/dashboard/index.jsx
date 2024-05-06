import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"; 
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db, storage } from "../../firebase"; 
import { ref as refStorage, getDownloadURL, uploadBytes } from "firebase/storage";
import Navbar from "../../components/navbar";
import Logo from "../../assets/img/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faPrint, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Dashboard() {
    const [expandedDescription, setExpandedDescription] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [showReceiptModal, setShowReceiptModal] = useState(false);
    const [menuData, setMenuData] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        description: '',
        price: ''
    });
    const [editMenu, setEditMenu] = useState(null); 

    useEffect(() => {
        fetchMenuData();
    }, []);

    const handleOrderModalToggle = () => {
        setShowOrderModal(!showOrderModal);
    };

    const handleDescriptionCollapse = (menuIndex) => {
        setExpandedDescription(menuIndex === expandedDescription ? null : menuIndex);
    }

    const handlePrintReceipt = () => {
        setShowReceiptModal(true);
    }

    const truncateDescription = (description) => {
        const maxLength = 75;
        if (description.length > maxLength) {
            return description.substring(0, maxLength) + '...';
        }
        return description;
    }

    const fetchMenuData = async () => {
        const menuCollection = collection(db, 'menu');
        const menuSnapshot = await getDocs(menuCollection);
        const menuList = menuSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setMenuData(menuList);
    };

    const handleAddMenu = async () => {
        try {
            let imageUrl = ''; // Variable to store image URL
    
            if (formData.image) {
                // Generate a unique image name
                const imageName = `${Date.now()}_${formData.image.name}`;
    
                // Upload image to Firebase Storage
                const storageRef = refStorage(storage, `/menu/${imageName}`);
                await uploadBytes(storageRef, formData.image);
    
                // Get the URL of the uploaded image
                imageUrl = await getDownloadURL(storageRef);
            }
    
            // Save menu data to Firestore along with the image URL
            await addDoc(collection(db, 'menu'), { ...formData, image: imageUrl });
            setShowModal(false);
            setFormData({
                name: '',
                image: '',
                description: '',
                price: ''
            });
            fetchMenuData();
            alert('Menu added successfully!');
        } catch (error) {
            console.error("Error adding menu:", error);
            alert('Failed to add menu. Please try again later.');
        }
    };
 
    // Fungsi untuk menangani perubahan pada input gambar
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            image: file // Update state with the file object
        });
    };
    
    const handleEditMenu = async () => {
        try {
            let imageUrl = editMenu.image; // Use the original image URL if no new image is selected
    
            if (formData.image && formData.image !== editMenu.image) {
                // Upload the new image to Firebase Storage
                const storageRef = refStorage(storage, `/menu/${formData.image.name}`);
                await uploadBytes(storageRef, formData.image);
    
                // Get the URL of the uploaded image
                imageUrl = await getDownloadURL(storageRef);
            }
    
            // Update the menu data in Firestore with the new image URL if applicable
            const menuDocRef = doc(db, 'menu', editMenu.id);
            await updateDoc(menuDocRef, { ...editMenu, price: parseFloat(editMenu.price), image: imageUrl });
            fetchMenuData();
            setEditMenu(null);
            alert('Menu updated successfully!');
        } catch (error) {
            console.error("Error updating menu:", error);
            alert('Failed to update menu. Please try again later.');
        }
    };    
    
    const handleEdit = (menu) => {
        setEditMenu(menu);
    };

    const handleDeleteMenu = async (id) => {
        if (window.confirm('Are you sure you want to delete this menu?')) {
            try {
                await deleteDoc(doc(db, 'menu', id));
                fetchMenuData();
                alert('Menu deleted successfully!');
            } catch (error) {
                console.error("Error deleting menu:", error);
                alert('Failed to delete menu. Please try again later.');
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Jika name adalah price atau quantity, konversi value menjadi number
        const newValue = (name === 'price' || name === 'quantity') ? parseFloat(value) : value;

        // Update formData
        setFormData({
            ...formData,
            [name]: newValue
        });

        // Hitung total price jika name adalah price atau quantity
        if (name === 'price' || name === 'quantity') {
            const totalPrice = parseFloat(formData.price) * parseFloat(formData.quantity);
            setFormData(prevState => ({
                ...prevState,
                totalPrice: totalPrice
            }));
        }
    };

    // State tambahan untuk menyimpan jumlah yang diinput pengguna
    const [quantity, setQuantity] = useState(1);

    // Fungsi untuk menghitung total harga
    const calculateTotalPrice = () => {
        if (editMenu && editMenu.price && quantity) {
            const totalPrice = editMenu.price * quantity;
            return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalPrice);
        } else {
            return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(0);
        }
    };
    
    const handleSaveOrder = async () => {
        try {
            // Pastikan editMenu tidak null sebelum mengakses propertinya
            if (editMenu) {
                const totalPrice = editMenu.price * quantity;
                const orderData = {
                    orderDate: formData.orderDate,
                    pickupDate: formData.pickupDate,
                    quantity,
                    totalPrice
                };
                await addDoc(collection(db, 'order'), orderData);
                setShowOrderModal(false);
                alert('Order added successfully!');
            } else {
                alert('Please select a menu to add an order.');
            }
        } catch (error) {
            console.error("Error adding order:", error);
            alert('Failed to add order. Please try again later.');
        }
    };    
    

    // Fungsi untuk menangani perubahan pada input jumlah
    const handleQuantityChange = (e) => {
        const { value } = e.target;
        setQuantity(value);
        setFormData(prevState => ({
            ...prevState,
            quantity: parseFloat(value)
        }));
    };
    

    return (
        <>
            <Navbar />

            <div className="container mx-auto pt-32">
                <div className="text-center mb-5">
                    <h1 className="text-4xl font-semibold text-black mb-2">Menu List</h1>
                    <hr className="w-36 mx-auto border-t-4 border-yellow-500 mb-5" />
                </div>
                <div className="flex justify-end mb-6">
                    <button onClick={() => setShowModal(true)} className="bg-yellow-400 text-gray-900 rounded-full py-2 px-3">
                        <FontAwesomeIcon icon={faPlus} className=" h-6" />
                    </button>
                </div>
                <div className="grid grid-cols-12 gap-6">
                    {menuData.map((menu, index) => (
                        <div key={index} className="col-span-3">
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <img src={menu.image} alt={menu.name} className="mb-4" />
                                <h2 className="font-medium text-2xl mb-2">{menu.name}</h2>
                                <p className="text-base font-normal mb-4">
                                    {expandedDescription === index ? menu.description : truncateDescription(menu.description)}
                                    {menu.description.length > 85 && (
                                        <span className="text-yellow-500 cursor-pointer ml-2" onClick={() => handleDescriptionCollapse(index)}>
                                            {expandedDescription === index ? 'Show Less' : 'Details'}
                                        </span>
                                    )}
                                </p>
                                <div className="flex justify-between items-center mb-5">
                                    <span className="font-medium text-xl">{menu.price}</span>
                                    <div className="flex space-x-4">
                                        <button onClick={() => handleEdit(menu)} className="bg-yellow-500 rounded-full p-2 px-3">
                                            <FontAwesomeIcon icon={faEdit} className="text-gray-700" />
                                        </button>
                                        <button onClick={() => handleDeleteMenu(menu.id)} className="bg-red-600 rounded-full p-2 px-3">
                                            <FontAwesomeIcon icon={faTrash} className="text-white" />
                                        </button>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button onClick={handleOrderModalToggle} className="bg-yellow-500 text-white rounded-lg px-2 py-2 text-center font-bold">Add Order</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Order Modal */}
                {showOrderModal && (
                    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white rounded-lg p-8 max-w-md w-full">
                            <h2 className="text-2xl font-semibold mb-4">Order Form</h2>
                            <form>
                                <div className="mb-4">
                                    <label htmlFor="orderDate" className="block text-sm font-medium text-gray-700">Order Date</label>
                                    <input type="date" id="orderDate" name="orderDate" className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700">Pickup Date</label>
                                    <input type="date" id="pickupDate" name="pickupDate" className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                                    <input 
                                        type="number" 
                                        id="quantity" 
                                        name="quantity" 
                                        min="1" 
                                        value={quantity} 
                                        onChange={handleQuantityChange} 
                                        className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="totalPrice" className="block text-sm font-medium text-gray-700">Total Price</label>
                                    <div className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                                        {calculateTotalPrice()}
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button onClick={handleSaveOrder} type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">Save</button>
                                    <button onClick={handlePrintReceipt} type="button" className="bg-yellow-500 text-white px-4 py-2 rounded-md flex items-center justify-center">
                                        Print <FontAwesomeIcon icon={faPrint} className="ml-2" />
                                    </button>
                                    <button type="button" onClick={handleOrderModalToggle} className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {/* Add Menu Modal */}
                {showModal && (
                    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white rounded-lg p-8 max-w-md w-full">
                            <h2 className="text-2xl font-semibold mb-4">Add New Menu</h2>
                            <form>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        name="name" 
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border" 
                                    />  
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea 
                                        id="description" 
                                        name="description" 
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border" 
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                                    <input 
                                        type="number" 
                                        id="price" 
                                        name="price" 
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border" 
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                                    <input 
                                        type="file" 
                                        id="image" 
                                        name="image" 
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border" 
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button onClick={handleAddMenu} type="button" className="bg-yellow-500 text-white px-4 py-2 rounded-md">Add Menu</button>
                                    <button type="button" onClick={() => setShowModal(false)} className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {/* Edit Menu Modal */}
                {editMenu && (
                    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white rounded-lg p-8 max-w-md w-full">
                            <h2 className="text-2xl font-semibold mb-4">Edit Menu</h2>
                            <form>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        name="name" 
                                        value={editMenu.name}
                                        onChange={(e) => setEditMenu({ ...editMenu, name: e.target.value })}
                                        className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border" 
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea 
                                        id="description" 
                                        name="description" 
                                        value={editMenu.description}
                                        onChange={(e) => setEditMenu({ ...editMenu, description: e.target.value })}
                                        className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border" 
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                                    <input 
                                        type="number" 
                                        id="price" 
                                        name="price" 
                                        value={editMenu.price}
                                        onChange={(e) => setEditMenu({ ...editMenu, price: e.target.value })}
                                        className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border" 
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                                    <input 
                                        type="file" 
                                        id="image" 
                                        name="image" 
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border" 
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button onClick={handleEditMenu} type="button" className="bg-yellow-500 text-white px-4 py-2 rounded-md">Save Changes</button>
                                    <button type="button" onClick={() => setEditMenu(null)} className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {/* Receipt Modal */}
                {showReceiptModal && (
                    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
                        <button onClick={() => setShowReceiptModal(false)} className="absolute top-0 right-0 m-4 bg-red-500 text-white px-2 rounded-full">
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        <div className="text-center mb-4">
                            <img src={Logo} alt="Logo" className="h-16 mx-auto mb-4" />
                        </div>
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold mb-2 text-center">Order Details</h2>
                                <p><strong>Order Date:</strong> 2024-05-03</p>
                                <p><strong>Pickup Date:</strong> 2024-05-05</p>
                                <p><strong>Quantity:</strong> 2</p>
                                <p><strong>Total Price:</strong> Rp 90.000</p>
                        </div>
                        <p className="mt-5 text-center">Thank you for your order🤩</p>
                    </div>
                </div>
                )}
            </div>
        </>
    );
}