// import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom"; 
// import { getAuth, signOut } from "firebase/auth";
// import { collection, addDoc } from 'firebase/firestore';
// import { db } from "../../firebase"; 
// import { auth } from "../../firebase";
// import Navbar from "../../components/navbar";
// import Logo from "../../assets/img/logo.png";
// import Menu1 from "../../assets/img/menu1.png";
// import Menu2 from "../../assets/img/menu2.png";
// import Menu3 from "../../assets/img/menu3.png";
// import Menu4 from "../../assets/img/menu4.png";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus, faEdit, faTrash, faPrint, faTimes } from '@fortawesome/free-solid-svg-icons';

// const initialMenuData = [
//     {
//         name: "Pork Satay",
//         image: Menu1,
//         description: "It consists of marinated and skewered pork pieces that are grilled to perfection, resulting in tender, juicy, and flavorful meat.",
//         price: "Rp 45.000"
//     },
//     {
//         name: "Papaya salad",
//         image: Menu2,
//         description: "Consists of a combination of lime juice, fish sauce, palm sugar, and chili peppers.",
//         price: "Rp 32.000"
//     },
//     {
//         name: "Chicken satay",
//         image: Menu3,
//         description: "It consists of marinated and skewered pork pieces that are grilled to perfection, resulting in tender, juicy, and flavorful meat.",
//         price: "Rp 40.000"
//     },
//     {
//         name: "Shrimp fried rice",
//         image: Menu4,
//         description: "Shrimp fried rice, such as diced carrots, peas, onions, and bell peppers.",
//         price: "Rp 48.000"
//     }
// ];

// export default function Dashboard() {
//     const navigate = useNavigate(); 
//     const auth = getAuth(); 
//     const [showModal, setShowModal] = useState(false);
//     const [showOrderModal, setShowOrderModal] = useState(false);
//     const [showReceiptModal, setShowReceiptModal] = useState(false);
//     const [newMenu, setNewMenu] = useState({
//         name: "",
//         image: null,
//         description: "",
//         price: ""
//     });
//     const [editMenuIndex, setEditMenuIndex] = useState(null);
//     const [editMenu, setEditMenu] = useState({
//         name: "",
//         description: "",
//         price: "",
//         image: null
//     });
//     const [menuData, setMenuData] = useState(initialMenuData);


//     async function handleSignOut() {
//         try {
//             await signOut(auth);
//             navigate('/'); 
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     const [expandedDescription, setExpandedDescription] = useState(null);

//     const handleDescriptionCollapse = (menuIndex) => {
//         setExpandedDescription(menuIndex === expandedDescription ? null : menuIndex);
//     }

//     const truncateDescription = (description) => {
//         const maxLength = 85;
//         if (description.length > maxLength) {
//             return description.substring(0, maxLength) + '...';
//         }
//         return description;
//     }

//     const handleModalToggle = () => {
//         setShowModal(!showModal);
//     };

//     const handleOrderModalToggle = () => {
//         setShowOrderModal(!showOrderModal);
//     };
    
//     const handlePrintReceipt = () => {
//         setShowReceiptModal(true);
//     }

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setNewMenu({ ...newMenu, [name]: value });
//     };

//     const handleImageUpload = (e) => {
//         const file = e.target.files[0];
//         const reader = new FileReader();
//         reader.onloadend = () => {
//             setNewMenu({ ...newMenu, image: reader.result });
//         };
//         reader.readAsDataURL(file);
//     };

//     const handleAddMenu = () => {
//         // Menambahkan menu baru ke dalam daftar menu
//         menuData.push(newMenu);
//         // Menutup modal setelah menambahkan menu
//         setShowModal(false);
//         // Reset form menu baru
//         setNewMenu({
//             name: "",
//             description: "",
//             price: "",
//             image: null
//         });
//     };

//     // Fungsi untuk menampilkan modal edit menu
//     const handleEditModalToggle = (index) => {
//         setEditMenuIndex(index);
//         setEditMenu(menuData[index]);
//         setShowModal(true);
//     };

//     // Fungsi untuk mengupdate data menu yang di-edit
//     const handleEditMenu = () => {
//         menuData[editMenuIndex] = editMenu;
//         setShowModal(false);
//         setEditMenuIndex(null);
//         setEditMenu({
//             name: "",
//             description: "",
//             price: "",
//             image: null
//         });
//     };

//     const handleDeleteMenu = (index) => {
//         const updatedMenuData = [...menuData];
//         updatedMenuData.splice(index, 1);
//         setMenuData(updatedMenuData);
//     };
    

//     return (
//         <>
//             <Navbar />

//             <div className="container mx-auto pt-32">
//                 <div className="text-center mb-5">
//                     <h1 className="text-4xl font-semibold text-black mb-2">Menu List</h1>
//                     <hr className="w-36 mx-auto border-t-4 border-yellow-500 mb-5" />
//                 </div>
//                 <div className="flex justify-end mb-6">
//                     <button onClick={() => setShowModal(true)} className="bg-yellow-400 text-gray-900 rounded-full py-2 px-3">
//                         <FontAwesomeIcon icon={faPlus} className=" h-6" />
//                     </button>
//                 </div>
//                 <div className="grid grid-cols-12 gap-6">
//                     {menuData.map((menu, index) => (
//                         <div key={index} className="col-span-3">
//                             <div className="bg-white rounded-lg border border-gray-200 p-6">
//                                 <img src={menu.image} alt={menu.name} className="mb-4" />
//                                 <h2 className="font-medium text-2xl mb-2">{menu.name}</h2>
//                                 <p className="text-base font-normal mb-4">
//                                     {expandedDescription === index ? menu.description : truncateDescription(menu.description)}
//                                     {menu.description.length > 85 && (
//                                         <span className="text-yellow-500 cursor-pointer ml-2" onClick={() => handleDescriptionCollapse(index)}>
//                                             {expandedDescription === index ? 'Show Less' : 'Details'}
//                                         </span>
//                                     )}
//                                 </p>
//                                 <div className="flex justify-between items-center mb-5">
//                                     <span className="font-medium text-xl">{menu.price}</span>
//                                     <div className="flex space-x-4">
//                                         <button onClick={() => handleEditModalToggle(index)} className="bg-yellow-500 rounded-full p-2 px-3">
//                                             <FontAwesomeIcon icon={faEdit} className="text-gray-700" />
//                                         </button>
//                                         <button onClick={() => handleDeleteMenu(index)} className="bg-red-600 rounded-full p-2 px-3">
//                                             <FontAwesomeIcon icon={faTrash} className="text-white" />
//                                         </button>
//                                     </div>
//                                 </div>
//                                 <div className="text-center">
//                                     <button onClick={handleOrderModalToggle} className="bg-yellow-500 text-white rounded-lg px-2 py-2 text-center font-bold">Add Order</button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//                 {showOrderModal && (
//                     <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
//                         <div className="bg-white rounded-lg p-8 max-w-md w-full">
//                             <h2 className="text-2xl font-semibold mb-4">Order Form</h2>
//                             <form>
//                                 <div className="mb-4">
//                                     <label htmlFor="orderDate" className="block text-sm font-medium text-gray-700">Order Date</label>
//                                     <input type="date" id="orderDate" name="orderDate" className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700">Pickup Date</label>
//                                     <input type="date" id="pickupDate" name="pickupDate" className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
//                                     <input type="number" id="quantity" name="quantity" min="1" className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="totalPrice" className="block text-sm font-medium text-gray-700">Total Price</label>
//                                     <input type="text" id="totalPrice" name="totalPrice" readOnly className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
//                                 </div>
//                                 <div className="flex justify-end">
//                                     <button onClick={handlePrintReceipt} type="button" className="bg-yellow-500 text-white px-4 py-2 rounded-md flex items-center justify-center">
//                                         Print <FontAwesomeIcon icon={faPrint} className="ml-2" />
//                                     </button>
//                                     <button type="button" onClick={() => setShowOrderModal(false)} className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Cancel</button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 )}
//                 {showModal && (
//                     <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
//                         <div className="bg-white rounded-lg p-8 max-w-md w-full">
//                             <h2 className="text-2xl font-semibold mb-4">Add New Menu</h2>
//                             <form>
//                                 <div className="mb-4">
//                                     <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
//                                     <input 
//                                         type="text" 
//                                         id="name" 
//                                         name="name" 
//                                         value={newMenu.name}
//                                         onChange={handleInputChange}
//                                         className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border" 
//                                     />  
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
//                                     <textarea 
//                                         id="description" 
//                                         name="description" 
//                                         value={newMenu.description}
//                                         onChange={handleInputChange}
//                                         className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border" 
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
//                                     <input 
//                                         type="text" 
//                                         id="price" 
//                                         name="price" 
//                                         value={newMenu.price}
//                                         onChange={handleInputChange}
//                                         className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border" 
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
//                                     <input 
//                                         type="file" 
//                                         id="image" 
//                                         name="image" 
//                                         accept="image/*"
//                                         onChange={handleImageUpload}
//                                         className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border" 
//                                     />
//                                 </div>
//                                 <div className="flex justify-end">
//                                     <button onClick={handleAddMenu} type="button" className="bg-yellow-500 text-white px-4 py-2 rounded-md">Add Menu</button>
//                                     <button type="button" onClick={() => setShowModal(false)} className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Cancel</button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 )}
//                 {editMenuIndex !== null && (
//                     <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
//                         <div className="bg-white rounded-lg p-8 max-w-md w-full">
//                             <h2 className="text-2xl font-semibold mb-4">Edit Menu</h2>
//                             <form>
//                                 <div className="mb-4">
//                                     <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
//                                     <input 
//                                         type="text" 
//                                         id="name" 
//                                         name="name" 
//                                         value={editMenu.name}
//                                         onChange={(e) => setEditMenu({ ...editMenu, name: e.target.value })}
//                                         className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border" 
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
//                                     <textarea 
//                                         id="description" 
//                                         name="description" 
//                                         value={editMenu.description}
//                                         onChange={(e) => setEditMenu({ ...editMenu, description: e.target.value })}
//                                         className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border" 
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
//                                     <input 
//                                         type="text" 
//                                         id="price" 
//                                         name="price" 
//                                         value={editMenu.price}
//                                         onChange={(e) => setEditMenu({ ...editMenu, price: e.target.value })}
//                                         className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border" 
//                                     />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
//                                     <input 
//                                         type="file" 
//                                         id="image" 
//                                         name="image" 
//                                         accept="image/*"
//                                         onChange={handleImageUpload}
//                                         className="mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border" 
//                                     />
//                                 </div>
//                                 <div className="flex justify-end">
//                                     <button onClick={handleEditMenu} type="button" className="bg-yellow-500 text-white px-4 py-2 rounded-md">Save Changes</button>
//                                     <button type="button" onClick={() => setEditMenuIndex(null)} className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Cancel</button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 )}
//                 {showReceiptModal && (
//                     <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
//                         <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
//                             <button onClick={() => setShowReceiptModal(false)} className="absolute top-0 right-0 m-4 bg-red-500 text-white px-2 rounded-full">
//                                 <FontAwesomeIcon icon={faTimes} />
//                             </button>
//                             <div className="text-center mb-4">
//                                 <img src={Logo} alt="Logo" className="h-16 mx-auto mb-4" />
//                             </div>
//                             <div className="mb-4">
//                                 <h2 className="text-xl font-semibold mb-2 text-center">Order Details</h2>
//                                 <p><strong>Order Date:</strong> 2024-05-03</p>
//                                 <p><strong>Pickup Date:</strong> 2024-05-05</p>
//                                 <p><strong>Quantity:</strong> 2</p>
//                                 <p><strong>Total Price:</strong> Rp 90.000</p>
//                             </div>
//                             <p className="mt-5 text-center">Thank you for your order🤩</p>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </>
//     );
// }