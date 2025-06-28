
import React, { useState } from "react";
import { format } from "date-fns";

const daysOfWeek = ["NIEDZIELA", "PONIEDZIAŁEK", "WTOREK", "ŚRODA", "CZWARTEK", "PIĄTEK", "SOBOTA"];

const printTypes = [
  "CZARNY", "KOLOROWY", "LASER", "LASER/CZARNY", "Czarny/kolorowy", "Biały", "CZARNY/BIAŁY",
  "LASER/BIAŁY", "Biały/kolor", "LASER/ KOLOROWY"
];

const carriers = [
  "DPD", "INPOST KURIER", "PACZKOMAT", "DHL", "ORLEN PACZKA", "UPS", "ODBIÓR OSOBISTY", "AMAZON", "Olza"
];

const statuses = ["ZROBIONE", "OCZEKUJE", "ANULOWANE"];
const modes = ["P", "L", "E"];

export default function OrderApp() {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({
    date: "",
    nick: "",
    amount: "",
    mode: "P",
    printType: "CZARNY",
    carrier: "PACZKOMAT",
    status: "OCZEKUJE",
    note: ""
  });

  const addOrder = () => {
    if (!form.date || !form.nick || !form.amount) return;
    setOrders([...orders, { ...form }]);
    setForm({
      date: "",
      nick: "",
      amount: "",
      mode: "P",
      printType: "CZARNY",
      carrier: "PACZKOMAT",
      status: "OCZEKUJE",
      note: ""
    });
  };

  const deleteOrder = (index) => {
    const newOrders = [...orders];
    newOrders.splice(index, 1);
    setOrders(newOrders);
  };

  const groupedOrders = orders.reduce((acc, order) => {
    const date = new Date(order.date);
    const key = `${daysOfWeek[date.getDay()]} - ${format(date, 'dd.MM.yyyy')}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(order);
    return acc;
  }, {});

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <div style={{ marginBottom: 20 }}>
        <h2>DODAJ ZLECENIE</h2>
        <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
        <input placeholder="NUMER ZAMÓWIENIA / NICK Z ALLEGRO" value={form.nick} onChange={e => setForm({ ...form, nick: e.target.value.toUpperCase() })} />
        <input placeholder="ILOŚĆ" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value.toUpperCase() })} />
        <select value={form.mode} onChange={e => setForm({ ...form, mode: e.target.value })}>
          {modes.map(mode => <option key={mode} value={mode}>{mode}</option>)}
        </select>
        <select value={form.printType} onChange={e => setForm({ ...form, printType: e.target.value })}>
          {printTypes.map(type => <option key={type} value={type}>{type}</option>)}
        </select>
        <select value={form.carrier} onChange={e => setForm({ ...form, carrier: e.target.value })}>
          {carriers.map(carrier => <option key={carrier} value={carrier}>{carrier}</option>)}
        </select>
        <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
          {statuses.map(status => <option key={status} value={status}>{status}</option>)}
        </select>
        <input placeholder="UWAGI" value={form.note} onChange={e => setForm({ ...form, note: e.target.value.toUpperCase() })} />
        <button onClick={addOrder}>DODAJ</button>
      </div>

      {Object.entries(groupedOrders).sort().map(([day, orders], i) => (
        <div key={i} style={{ border: "1px solid #ccc", marginBottom: 20, padding: 10 }}>
          <h3>{day}</h3>
          <table border="1" cellPadding="5" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>LP</th>
                <th>DATA</th>
                <th>NUMER / NICK</th>
                <th>ILOŚĆ</th>
                <th>TRYB</th>
                <th>NADRUK</th>
                <th>PRZEWOŹNIK</th>
                <th>STATUS</th>
                <th>UWAGI</th>
                <th>AKCJE</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{format(new Date(order.date), 'dd.MM.yyyy')}</td>
                  <td>{order.nick}</td>
                  <td>{order.amount}</td>
                  <td>{order.mode}</td>
                  <td>{order.printType}</td>
                  <td>{order.carrier}</td>
                  <td>{order.status}</td>
                  <td>{order.note}</td>
                  <td><button onClick={() => deleteOrder(idx)}>Usuń</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
