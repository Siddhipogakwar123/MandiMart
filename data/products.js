module.exports = [
  {
    id: "1",
    title: "Bluetooth Speaker",
    price: 1200,
    description: "Loud and portable speaker.",
    userId: "user123",
    createdAt: new Date(),
    purchaseBy: "-1" // not purchased
  },
  {
    id: "2",
    title: "Smart Watch",
    price: 3500,
    description: "Tracks your steps, heart rate, and more.",
    userId: "user456",
    createdAt: new Date(),
    purchaseBy: "user123" // purchased by current user
  },
  {
    id: "3",
    title: "Bookshelf",
    price: 2500,
    description: "5-tier wooden shelf.",
    userId: "user789",
    createdAt: new Date(),
    purchaseBy: "-1"
  }
];
