const express=require("express")
const app=express()
const path=require("path")

app.set("view engine","ejs")
app.set("views", path.join(__dirname, "views")); 
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,'public')))

// app.get('/', (req, res) => {
//   res.send("Homepage route is working! Add a homepage view later.");
// });

// http://localhost:3000/product/1


app.get('/product/:id',(req,res)=>{
    const product = {
    id: req.params.id,
    title: 'iPhone 12 - 64GB',
    price: 38000,
    description: 'Used iPhone 12, good condition, no scratches.',
    image:[
      '/images/iphone.jpg',
      '/images/iphone1.jpg',
      '/images/iphone2.jpg'
    ],
    category: 'Mobiles',
    condition: 'Used',
    location: 'Delhi',
    datePosted: '14 June 2025',
    sellerName: 'Rahul Sharma',
    sellerContact: '9876543210'
  };

  const relatedProducts = [
    { title: 'Samsung Galaxy S21', price: 31000, image: '/images/samsung.png' },
    { title: 'OnePlus 9', price: 28000, image: '/images/oneplus.png' }
  ];

    res.render("product_details",{ product, relatedProducts });
})

app.listen(3000, () => {

});
