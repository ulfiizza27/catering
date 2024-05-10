import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: { flexDirection: 'row' },
  tableCell: { fontSize: 10, padding: 8, borderStyle: 'solid', borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0 },
  tableHeader: { backgroundColor: '#f0f0f0', fontWeight: 'bold', borderStyle: 'solid', borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0 },
  totalIncome: { alignSelf: 'flex-end', marginTop: 20, fontSize: 14, fontWeight: 'bold' },
});

// Create Document Component
const MyDocument = ({ orders }) => {
  const totalIncome = orders.reduce((acc, order) => acc + parseFloat(order.totalPrice), 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>Order Report</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.tableHeader]}>Order ID</Text>
              <Text style={[styles.tableCell, styles.tableHeader]}>Menu</Text>
              <Text style={[styles.tableCell, styles.tableHeader]}>Order Date</Text>
              <Text style={[styles.tableCell, styles.tableHeader]}>Pickup Date</Text>
              <Text style={[styles.tableCell, styles.tableHeader]}>Quantity</Text>
              <Text style={[styles.tableCell, styles.tableHeader]}>Total Price</Text>
            </View>
            {orders.map(order => (
              <View style={styles.tableRow} key={order.id}>
                <Text style={styles.tableCell}>{order.id}</Text>
                <Text style={styles.tableCell}>{order.menuName}</Text>
                <Text style={styles.tableCell}>{order.orderDate}</Text>
                <Text style={styles.tableCell}>{order.pickupDate}</Text>
                <Text style={styles.tableCell}>{order.quantity}</Text>
                <Text style={styles.tableCell}>{order.totalPrice}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.totalIncome}>Total Income: Rp. {totalIncome}</Text> 
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
