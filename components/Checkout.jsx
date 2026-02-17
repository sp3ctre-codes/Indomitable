import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Package, Truck } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const locations = [
  { name: "Isebania", price: 740.0 },
  { name: "Kehancha", price: 740.0 },
  { name: "Garissa", price: 750.0 },
  { name: "Kendubay", price: 750.0 },
  { name: "Rachuonyo", price: 750.0 },
  { name: "Diani", price: 770.0 },
  { name: "Kapenguria", price: 780.0 },
  { name: "Klifi", price: 800.0 },
  { name: "Wundanyi", price: 800.0 },
  { name: "Malindi", price: 840.0 },
  { name: "Mwatate", price: 840.0 },
  { name: "Taveta", price: 850.0 },
  { name: "Watamu", price: 850.0 },
  { name: "Marasbit", price: 950.0 },
  { name: "Maralal", price: 1100.0 },
  { name: "Lamu", price: 2050.0 },
  { name: "Lodwar", price: 2050.0 },
  { name: "Lokichogio", price: 2850.0 },
  { name: "Kiganjo", price: 410.0 },
  { name: "Kutus", price: 410.0 },
  { name: "Mukurweini", price: 410.0 },
  { name: "Mwea", price: 410.0 },
  { name: "Chuka", price: 420.0 },
  { name: "Embu", price: 420.0 },
  { name: "Isinya", price: 420.0 },
  { name: "Kajiado", price: 420.0 },
  { name: "Kangema", price: 420.0 },
  { name: "Machakos", price: 420.0 },
  { name: "Matuu", price: 420.0 },
  { name: "Muranga", price: 420.0 },
  { name: "Murarandia", price: 420.0 },
  { name: "Narok", price: 420.0 },
  { name: "Nyeri", price: 420.0 },
  { name: "Orhaya", price: 420.0 },
  { name: "Runyenjes", price: 420.0 },
  { name: "Tala", price: 420.0 },
  { name: "Eldoret", price: 450.0 },
  { name: "Bungoma", price: 600.0 },
  { name: "Chwele", price: 600.0 },
  { name: "Keroka", price: 600.0 },
  { name: "Kilgoris", price: 600.0 },
  { name: "Kimilli", price: 600.0 },
  { name: "Lugari", price: 600.0 },
  { name: "Malaba", price: 600.0 },
  { name: "Migori", price: 600.0 },
  { name: "Mitto Andei", price: 600.0 },
  { name: "Mumias", price: 600.0 },
  { name: "Mwala", price: 600.0 },
  { name: "Ogembo", price: 600.0 },
  { name: "Oyugis", price: 600.0 },
  { name: "Voi", price: 600.0 },
  { name: "Webuye", price: 600.0 },
  { name: "Wote", price: 600.0 },
  { name: "Kapsabet", price: 620.0 },
  { name: "Kikuyu", price: 350.0 },
  { name: "Nairobi", price: 350.0 },
  { name: "Ngong", price: 350.0 },
  { name: "Tongata Rongai", price: 350.0 },
  { name: "Athi River", price: 360.0 },
  { name: "Kitengela", price: 360.0 },
  { name: "Makuyu", price: 360.0 },
  { name: "Nakuru", price: 360.0 },
  { name: "Ruiru", price: 360.0 },
  { name: "Sabasaba", price: 360.0 },
  { name: "Thika", price: 360.0 },
  { name: "Juja", price: 380.0 },
  { name: "Engineer", price: 400.0 },
  { name: "Kagio", price: 400.0 },
  { name: "Kangundo", price: 400.0 },
  { name: "Karatina", price: 400.0 },
  { name: "Kerugoya", price: 400.0 },
  { name: "Kitui", price: 450.0 },
  { name: "Turbo", price: 450.0 },
  { name: "Makutano", price: 460.0 },
  { name: "Nkubu", price: 460.0 },
  { name: "Eldama Ravine", price: 470.0 },
  { name: "Chogoria", price: 480.0 },
  { name: "Kakamega", price: 480.0 },
  { name: "Kericho", price: 480.0 },
  { name: "Mbale", price: 480.0 },
  { name: "Meru", price: 480.0 },
  { name: "Molo", price: 480.0 },
  { name: "Njoro", price: 480.0 },
  { name: "Nyahuuru", price: 480.0 },
  { name: "Oikalau", price: 480.0 },
  { name: "Sabatia", price: 480.0 },
  { name: "Sagana", price: 480.0 },
  { name: "Bomet", price: 500.0 },
  { name: "Kisii", price: 500.0 },
  { name: "Kisumu", price: 500.0 },
  { name: "Litein", price: 500.0 },
  { name: "Londiani", price: 500.0 },
  { name: "Maseno", price: 500.0 },
  { name: "Masii", price: 500.0 },
  { name: "Nyamira", price: 500.0 },
  { name: "Sotik", price: 500.0 },
  { name: "Burnt Forest", price: 520.0 },
  { name: "Kitale", price: 520.0 },
  { name: "Nanyuki", price: 520.0 },
  { name: "Naromoru", price: 520.0 },
  { name: "Timau", price: 520.0 },
  { name: "Moï's Bridge", price: 530.0 },
  { name: "Mwingi", price: 550.0 },
  { name: "Email", price: 580.0 },
  { name: "Kabarnet", price: 580.0 },
  { name: "Kibwezi", price: 580.0 },
  { name: "Makindu", price: 580.0 },
  { name: "Sultan Hamud", price: 580.0 },
  { name: "Nandi Hills", price: 620.0 },
  { name: "Ahero", price: 640.0 },
  { name: "Bondo", price: 640.0 },
  { name: "Mariakani", price: 640.0 },
  { name: "Mombasa", price: 640.0 },
  { name: "Mtwapa", price: 640.0 },
  { name: "Isiolo", price: 650.0 },
  { name: "Maua", price: 650.0 },
  { name: "Siaya", price: 650.0 },
  { name: "Ugunja", price: 650.0 },
  { name: "Busia", price: 660.0 },
  { name: "Luanda", price: 660.0 },
  { name: "Muhoroni", price: 660.0 },
  { name: "Nambale", price: 670.0 },
  { name: "Oloitoktok", price: 670.0 },
  { name: "Baraton", price: 700.0 },
  { name: "Homabay", price: 700.0 },
  { name: "Nzoia", price: 710.0 },
  { name: "Mbita", price: 720.0 },
];

const Checkout = ({ onCompleteOrder }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const cartItems = location.state?.cartItems || [];

  const [selectedLocation, setSelectedLocation] = useState('');
  const [paymentMethod, setPaymentMethod] = useState("");

  const shippingCost = () => {
    const match = locations.find((loc) => loc.name === selectedLocation);
    return match ? match.price : 0;
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const total = subtotal + shippingCost();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium mt-2 text-black">
            Please select items before checking out!
          </h2>
          <button
            onClick={() => navigate("/")}
            className="border bg-black text-white px-4 py-2 rounded-md hover:bg-black/40 transition mt-4"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleCompleteOrder = async () => {
    if (!selectedLocation || !paymentMethod) return;

    if (paymentMethod === "mpesa" && !mpesaNumber) return;
    if (paymentMethod === "card" && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv)) return;

    const response = await fetch("/api/payments/stk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cartItems,
        selectedLocation,
        paymentMethod,
        total,
        phone: mpesaNumber
      })
    });

    const data = await response.json();

    if (data.success) {
      alert("STK Push sent to your phone");
    }
  };
  const [mpesaNumber, setMpesaNumber] = useState("");
  const [cardDetails, setCardDetails] = useState({
    name:"",
    number: "",
    expiry: "",
    cvv: ""
  });



  return (
    <div className="min-h-screen bg-white text-black pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 md:px-12">

        <div className="flex items-center justify-between mb-12">
          <button onClick={() => navigate("/")} className="group flex items-center gap-2 text-sm font-bold uppercase tracking-tight">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          <h1 className="text-xl font-black uppercase italic tracking-tighter">Indomitable</h1>
          <div className="w-10"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-12">

            <section>
              <h2 className="text-2xl font-medium mb-6 flex items-center gap-3">
                <Truck size={24} /> Delivery Options
              </h2>
              <div className="space-y-4">
                <label className="text-xs font-bold uppercase text-gray-500 tracking-widest">Select Location</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full border-b-2 border-gray-200 py-4 text-lg focus:border-black outline-none transition-colors bg-transparent appearance-none"
                >
                  <option value="">-- Choose City --</option>
                  {locations.map((loc, idx) => (
                    <option key={idx} value={loc.name}>
                      {loc.name} (+Ksh {loc.price})
                    </option>
                  ))}
                </select>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-medium mb-6 flex items-center gap-3">
                <CreditCard size={24} /> Payment
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* MPESA */}
                <div 
                  onClick={() => setPaymentMethod("mpesa")}
                  className={`border-2 p-6 rounded-xl cursor-pointer transition-all flex flex-col gap-4 ${
                    paymentMethod === "mpesa" ? "border-black bg-zinc-50" : "border-gray-100 hover:border-gray-300"
                  }`}
                >
                  <span className="font-bold uppercase text-xs tracking-widest">M-Pesa</span>
                  <p className="text-sm text-gray-500 font-medium leading-tight">
                    Pay securely via your Safaricom line.
                  </p>

                  <AnimatePresence>
                    {paymentMethod === "mpesa" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="pt-4 border-t"
                      >
                        <input
                          type="tel"
                          placeholder="Enter M-Pesa Number (07XXXXXXXX)"
                          value={mpesaNumber}
                          onChange={(e) => setMpesaNumber(e.target.value)}
                          className="w-full border-b py-2 outline-none focus:border-black transition-colors"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* CARD */}
                <div 
                  onClick={() => setPaymentMethod("card")}
                  className={`border-2 p-6 rounded-xl cursor-pointer transition-all flex flex-col gap-4 ${
                    paymentMethod === "card" ? "border-black bg-zinc-50" : "border-gray-100 hover:border-gray-300"
                  }`}
                >
                  <span className="font-bold uppercase text-xs tracking-widest">
                    Credit or Debit Card
                  </span>

                  <AnimatePresence>
                    {paymentMethod === "card" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="space-y-4 pt-4 border-t"
                      >
                        <input
                          type="text"
                          placeholder="Cardholder Name"
                          value={cardDetails.name}
                          onChange={(e) =>
                            setCardDetails({ ...cardDetails, name: e.target.value })
                          }
                          className="w-full border-b py-2 outline-none focus:border-black transition-colors"
                        />
                        <input
                          type="text"
                          placeholder="Card Number"
                          value={cardDetails.number}
                          onChange={(e) =>
                            setCardDetails({ ...cardDetails, number: e.target.value })
                          }
                          className="w-full border-b py-2 outline-none focus:border-black transition-colors"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={cardDetails.expiry}
                            onChange={(e) =>
                              setCardDetails({ ...cardDetails, expiry: e.target.value })
                            }
                            className="border-b py-2 outline-none focus:border-black transition-colors"
                          />
                          <input
                            type="text"
                            placeholder="CVV"
                            value={cardDetails.cvv}
                            onChange={(e) =>
                              setCardDetails({ ...cardDetails, cvv: e.target.value })
                            }
                            className="border-b py-2 outline-none focus:border-black transition-colors"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white space-y-8">
              <h2 className="text-2xl font-medium mb-6 flex items-center gap-3">
                <Package size={24} /> Summary
              </h2>

              <div className="border-t border-b py-6 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>Ksh {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{selectedLocation ? `Ksh ${shippingCost().toLocaleString()}` : "—"}</span>
                </div>
                <div className="flex justify-between text-black font-bold text-lg pt-2">
                  <span>Total</span>
                  <span>Ksh {total.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={handleCompleteOrder}
                  disabled={!paymentMethod}
                  className="w-full bg-black text-white font-bold py-5 rounded-full hover:bg-zinc-800 transition-all disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed uppercase tracking-widest text-sm"
                >
                  Complete Order
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="w-full text-black font-bold py-2 text-sm underline hover:text-gray-600 transition-colors"
                >
                  Cancel and return to shop
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
