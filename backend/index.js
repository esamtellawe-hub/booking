require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/authRoutes");
const db = require("./models");
const { Hotel } = require("./models");
const { User } = require("./models");
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(express.json());
app.use(cors());
app.use("/Hotels", express.static("Hotels"));
// ربط المسارات
app.use("/auth", authRoutes);

// اختبار الاتصال وإنشاء الجداول تلقائيًا
db.sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Connected to MySQL");
    return db.sequelize.sync({ alter: true }); // ينشئ الجداول حسب الموديلات
  })
  .then(() => {
    console.log("✅ Tables synced");
  })
  .catch((err) => {
    console.error("❌ DB error:", err);
  });

app.get("/", (req, res) => {
  res.json({ message: "Hotel Booking API is running 🎉" });
});

app.get("/hotels", async (req, res) => {
  try {
    const hotels = await Hotel.findAll();
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ error: "خطأ في جلب الفنادق" });
  }
});
app.get("/hotels/:id", async (req, res) => {
  const hotel = await Hotel.findByPk(req.params.id);
  if (!hotel) {
    return res.status(404).json({ message: "Hotel not found" });
  }
  res.json(hotel);
});
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     console.log("📥 بيانات الدخول:", email, password);

//     // تعديل اسم الجدول من users إلى user
//     const [user] = await db.query("SELECT * FROM User WHERE email = ?", [
//       email,
//     ]);

//     if (!user || user.password !== password) {
//       return res.status(401).json({ message: "بيانات الدخول غير صحيحة" });
//     }

//     const token = jwt.sign({ userId: user.id }, "secretKey", {
//       expiresIn: "1d",
//     });

//     res.json({ token });
//   } catch (err) {
//     console.error("❌ خطأ في تسجيل الدخول:", err.message);
//     res.status(500).json({ error: "فشل في تسجيل الدخول" });
//   }
// });

// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // جلب المستخدم من جدول user
//     const user = await User.findOne({ where: { email } });

//     if (!user) {
//       return res.status(404).json({ message: "المستخدم غير موجود" });
//     }

//     // تحقق من كلمة المرور
//     // لو كانت مشفّرة:
//     // const match = await bcrypt.compare(password, user.password);
//     // if (!match) return res.status(401).json({ message: "كلمة المرور غير صحيحة" });

//     // لو كانت غير مشفّرة:
//     if (user.password !== password) {
//       return res.status(401).json({ message: "كلمة المرور غير صحيحة" });
//     }

//     // إنشاء JWT token
//     const token = jwt.sign({ userId: user.id }, "secretKey", {
//       expiresIn: "1d",
//     });

//     // إرسال token للواجهة
//     res.json({ message: "✅ تم تسجيل الدخول بنجاح", token });
//   } catch (err) {
//     console.error("❌ خطأ في تسجيل الدخول:", err.message);
//     res.status(500).json({ error: "فشل في تسجيل الدخول" });
//   }
// });
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  console.log(user);

  if (!user) return res.status(404).json({ message: " User Not Found" });

  if (user.password !== password) {
    return res.status(401).json({ message: " Password Is Not Corrct " });
  }

  res.json({ message: "تم تسجيل الدخول بنجاح", user });
});

app.get("/hotels/:id/rooms", async (req, res) => {
  try {
    const hotelId = parseInt(req.params.id);

    if (isNaN(hotelId)) {
      return res.status(400).json({ error: "رقم الفندق غير صالح" });
    }

    const rooms = await db.Room.findAll({
      where: {
        hotel_id: hotelId,
        isAvailable: true,
      },
      include: [
        {
          model: db.Media,
          attributes: ["url", "type"],
        },
      ],
    });

    res.json(rooms);
  } catch (err) {
    console.error("❌ خطأ في جلب الغرف:", err);
    res.status(500).json({ error: "خطأ في جلب الغرف" });
  }
});
app.post("/booking", async (req, res) => {
  const { roomId, userId, checkIn, checkOut, guests, totalPrice } = req.body;

  try {
    await db.query(
      `INSERT INTO Booking (user_id, room_id, checkIn, checkOut, guests, status, totalPrice, dateCreated)
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      [userId, roomId, checkIn, checkOut, guests, "confirmed", totalPrice]
    );

    await db.query("UPDATE room SET isAvailable = false WHERE id = ?", [
      roomId,
    ]);

    res.status(200).json({ message: "✅ تم الحجز بنجاح" });
  } catch (err) {
    console.error("❌ خطأ في الحجز:", err.message);
    res.status(500).json({ error: "فشل في تنفيذ الحجز" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
