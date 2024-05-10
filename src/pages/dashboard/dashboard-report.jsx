import React, { useState, useEffect } from 'react';
import Navbar from "../../components/navbar";
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from "../../firebase";
import { PDFDownloadLink } from '@react-pdf/renderer';
import MyDocument from './MyDocument'; 

export default function DashboardReport() {
    const [totalIncome, setTotalIncome] = useState(0);
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const ordersCollection = collection(db, 'order');
            const ordersSnapshot = await getDocs(ordersCollection);
            const ordersList = [];
            for (const orderDoc of ordersSnapshot.docs) {
                const orderData = orderDoc.data();
                const menuDoc = await getDoc(doc(db, 'menu', orderData.menuId));
                if (menuDoc.exists()) {
                    const menuData = menuDoc.data();
                    ordersList.push({
                        id: orderDoc.id,
                        menuName: menuData.name,
                        ...orderData
                    });
                } else {
                    console.error("Menu not found for order:", orderData);
                }
            }
            setOrders(ordersList);
            calculateTotalIncome(ordersList);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setLoading(false);
        }
    };
    

    const calculateTotalIncome = (ordersList) => {
        const total = ordersList.reduce((acc, order) => acc + order.totalPrice, 0);
        setTotalIncome(total);
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleString('id-ID', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        });
    };

    return (
        <div>
            <Navbar />
            <div className="pt-32 px-4 sm:px-8">
                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : (
                    <div>
                        <h2 className="text-3xl font-semibold mb-6 text-end">
                            Total Income: {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalIncome)}
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-yellow-300">
                                        <th className="border border-gray-300 px-4 py-2">Order ID</th>
                                        <th className="border border-gray-300 px-4 py-2">Menu</th>
                                        <th className="border border-gray-300 px-4 py-2">Order Date</th>
                                        <th className="border border-gray-300 px-4 py-2">Pickup Date</th>
                                        <th className="border border-gray-300 px-4 py-2">Quantity</th>
                                        <th className="border border-gray-300 px-4 py-2">Total Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order.id}>
                                            <td className="border border-gray-300 px-4 py-2">{order.id}</td>
                                            <td className="border border-gray-300 px-4 py-2">{order.menuName}</td>
                                            <td className="border border-gray-300 px-4 py-2">{formatDate(order.orderDate)}</td>
                                            <td className="border border-gray-300 px-4 py-2">{formatDate(order.pickupDate)}</td>
                                            <td className="border border-gray-300 px-4 py-2">{order.quantity}</td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(order.totalPrice)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* Tombol Print */}
                        <div className="text-end mt-4">
                            <PDFDownloadLink
                                document={<MyDocument orders={orders} />}
                                fileName="orders.pdf"
                                className="inline-block bg-yellow-300 px-4 py-2 rounded text-black font-bold cursor-pointer"
                            >
                                {({ blob, url, loading, error }) =>
                                    loading ? 'Loading document...' : 'Print PDF'
                                }
                            </PDFDownloadLink>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}