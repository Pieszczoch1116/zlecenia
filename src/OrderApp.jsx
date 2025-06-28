
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { format } from "date-fns";

const daysOfWeek = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];

const printTypes = [
  "CZARNY", "KOLOROWY", "LASER", "LASER/CZARNY", "Czarny/kolorowy", "Biały", "CZARNY/BIAŁY",
  "LASER/BIAŁY", "Biały/kolor", "LASER/ KOLOROWY"
];

const carriers = [
  "DPD", "INPOST KURIER", "PACZKOMAT", "DHL", "ORLEN PACZKA", "UPS", "ODBIÓR OSOBISTY", "AMAZON", "Olza"
];

const statuses = ["ZROBIONE", "OCZEKUJE", "ANULOWANE"];

const modes = [
  { value: "P", color: "bg-red-500" },
  { value: "L", color: "bg-green-500" },
  { value: "E", color: "bg-blue-500" },
];

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
    <div className="p-4 space-y-4">
      <Card>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-4">
          <Input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          <Input
            placeholder="NUMER ZAMÓWIENIA / NICK Z ALLEGRO"
            value={form.nick}
            onChange={(e) => setForm({ ...form, nick: e.target.value.toUpperCase() })}
          />
          <Input
            placeholder="ILOŚĆ"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value.toUpperCase() })}
          />
          <Select value={form.mode} onValueChange={(value) => setForm({ ...form, mode: value })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {modes.map((m) => (
                <SelectItem key={m.value} value={m.value} className={`${m.color} text-white`}>{m.value}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={form.printType} onValueChange={(value) => setForm({ ...form, printType: value })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {printTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={form.carrier} onValueChange={(value) => setForm({ ...form, carrier: value })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {carriers.map((carrier) => (
                <SelectItem key={carrier} value={carrier}>{carrier}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={form.status} onValueChange={(value) => setForm({ ...form, status: value })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="UWAGI"
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value.toUpperCase() })}
          />
          <Button onClick={addOrder}>DODAJ</Button>
        </CardContent>
      </Card>

      {Object.entries(groupedOrders).sort().map(([day, orders], i) => (
        <div key={i} className="border rounded-xl p-4 shadow-md">
          <h2 className="text-xl font-bold mb-4">{day}</h2>
          {orders.map((order, idx) => (
            <div key={idx} className="grid grid-cols-9 gap-2 items-center border-b py-2">
              <span>{idx + 1}</span>
              <span>{format(new Date(order.date), 'dd.MM.yyyy')}</span>
              <span>{order.nick}</span>
              <span>{order.amount}</span>
              <span>{order.mode}</span>
              <span>{order.printType}</span>
              <span>{order.carrier}</span>
              <span>{order.status}</span>
              <span>{order.note}</span>
              <Button variant="destructive" size="sm" onClick={() => deleteOrder(idx)}>Usuń</Button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
