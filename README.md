# � GlamourShop - Cosmetics Sales App

A modern, full-stack cosmetics e-commerce application built with React and Node.js. Features a beautiful UI, user authentication, shopping cart, and order management.

![GlamourShop](https://img.shields.io/badge/GlamourShop-Cosmetics%20Sales%20App-pink?style=for-the-badge&logo=shopify)

## ✨ Features

- 🎨 **Beautiful UI**: Modern, responsive design with gradient themes
- 🛒 **Shopping Cart**: Add/remove products, quantity management
- 👤 **User Authentication**: Register, login, logout functionality
- 📦 **Order Management**: Place orders, view order history
- 🔍 **Product Catalog**: Search, filter, and browse products
- � **Responsive Design**: Works on desktop, tablet, and mobile
- 🔐 **Secure**: JWT authentication and password hashing

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cosmetics-sales-app
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📋 Available Scripts

- `npm run dev` - Start both client and server in development mode
- `npm run server` - Start the backend server only
- `npm run client` - Start the React frontend only
- `npm run build` - Build the React app for production
- `npm start` - Start the production server

## �️ Tech Stack

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **Styled Components** - CSS-in-JS styling
- **Axios** - HTTP client
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **UUID** - Unique ID generation

### Data Storage
- **JSON Files** - Simple file-based storage (for demo purposes)
- *Note: In production, use a proper database like MongoDB or PostgreSQL*

## � Project Structure

```
cosmetics-sales-app/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.js         # Main app component
│   │   └── index.js       # Entry point
│   └── package.json
├── server/                 # Node.js backend
│   ├── data/              # JSON data files
│   ├── index.js           # Server entry point
│   └── uploads/           # File uploads
├── package.json           # Root package.json
└── README.md
```

## 🎯 Usage

1. **Browse Products**: Visit the homepage or products page to see available cosmetics
2. **Register/Login**: Create an account or sign in to place orders
3. **Add to Cart**: Click "Add to Cart" on any product
4. **Checkout**: Proceed to checkout with shipping and payment information
5. **View Orders**: Check your order history in the Orders section

## 🌟 Key Components

- **Home**: Hero section with featured products
- **ProductCatalog**: Searchable product grid with filters
- **ProductDetail**: Detailed product view with quantity selection
- **Cart**: Shopping cart with quantity management
- **Checkout**: Order placement with shipping/payment forms
- **Orders**: Order history and tracking

## 🎨 Design Features

- **Modern UI**: Clean, modern design with smooth animations
- **Gradient Themes**: Beautiful pink/purple gradient color scheme
- **Responsive Layout**: Adapts to all screen sizes
- **Smooth Transitions**: Hover effects and page transitions
- **Loading States**: Proper loading indicators throughout

## 🔧 Configuration

### Environment Variables (Optional)
Create a `.env` file in the root directory:

```env
PORT=5000
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

### Database Integration
To use a real database instead of JSON files:

1. Install database driver (e.g., `mongoose` for MongoDB)
2. Replace file operations in `server/index.js` with database queries
3. Update data models accordingly

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Deploy to Heroku
```bash
# Install Heroku CLI and login
heroku create your-app-name
git push heroku main
```

### Deploy to Vercel/Netlify
- Build command: `npm run build`
- Output directory: `client/build`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Created by Khatereh Najafi
- Icons by React Icons (Feather Icons)
- Styling with Styled Components
- Built with React and Node.js

## 📞 Contact

Khatereh Najafi - [@Khaterehnajafi](https://github.com/Khaterehnajafi)

Project Link: [https://github.com/Khaterehnajafi/cosmetics-sales-app](https://github.com/Khaterehnajafi/cosmetics-sales-app)
