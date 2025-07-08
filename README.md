# 🍔 Hamburger - Full-Stack Blog App

A modern, full-stack blog application built with Next.js, Hono, and PostgreSQL. Features include CRUD operations for posts, dark/light mode toggle, toast notifications, and responsive design with smooth animations.

## ✨ Features

- 📝 **CRUD Operations** - Create, Read, Update, Delete blog posts
- 🌙 **Dark/Light Mode** - Toggle between themes with persistent preferences
- 🔔 **Toast Notifications** - Real-time feedback for all API operations
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- ⚡ **Fast Performance** - Built with Next.js 15 and Hono for optimal speed
- 🔒 **Type Safety** - Full TypeScript support with Zod validation
- 🎭 **Smooth Animations** - Hover effects, transitions, and expand animations
- 🗄️ **Database** - PostgreSQL with Drizzle ORM for data persistence
- 🆔 **Alphanumeric IDs** - Random generated IDs for enhanced security

## 🛠️ Technologies Used

### Frontend
- **Next.js** - `^15.3.5` - React framework for production
- **React** - `18.2.0` - UI library
- **TypeScript** - `^5` - Type safety
- **Tailwind CSS** - `^4.1.11` - Utility-first CSS framework
- **Lucide React** - `^0.525.0` - Beautiful icons

### Backend
- **Hono** - `^4.8.4` - Fast web framework
- **Drizzle ORM** - `^0.44.2` - Type-safe database toolkit
- **Zod** - `^3.25.75` - Schema validation

### Database
- **PostgreSQL** - Primary database
- **Neon** - Serverless PostgreSQL (recommended)
- **Drizzle Kit** - `^0.31.4` - Database migrations

### Development Tools
- **Node.js** - `v22.16.0` (or higher)
- **npm** - Package manager
- **ESLint** - Code linting
- **PostCSS** - `^8.5.6` - CSS processing

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (Neon recommended)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/hamburger.git
   cd hamburger/hono-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the `hono-app` directory:
   ```env
   DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"
   ```

   **For Neon Database:**
   ```env
   DATABASE_URL="postgresql://username:password@ep-xxx-xxx-xxx.region.aws.neon.tech/database?sslmode=require"
   ```

4. **Set up the database**
   ```bash
   # Generate migration files
   npm run db:generate
   
   # Run migrations
   npm run db:migrate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
hono-app/
├── app/
│   ├── api/
│   │   └── posts/
│   │       └── [...route]/
│   │           └── route.ts          # API endpoints
│   ├── context/
│   │   ├── ThemeContext.tsx          # Dark/light mode context
│   │   └── ToastContext.tsx          # Toast notification context
│   ├── db/
│   │   ├── index.ts                  # Database connection
│   │   ├── schema.ts                 # Database schema
│   │   └── migrations/               # Database migrations
│   ├── lib/
│   │   └── validations.ts            # Zod validation schemas
│   ├── util/
│   │   └── postFunctions.ts          # API utility functions
│   ├── globals.css                   # Global styles
│   ├── layout.tsx                    # Root layout
│   └── page.tsx                      # Main page component
├── components/
│   ├── ui/
│   │   └── button.tsx                # Button component
│   └── ThemeToggle.tsx               # Theme toggle component
├── drizzle.config.ts                 # Drizzle configuration
├── tailwind.config.js                # Tailwind configuration
└── package.json                      # Dependencies and scripts
```

## 🗄️ Database Schema

```sql
CREATE TABLE "posts" (
    "id" varchar PRIMARY KEY NOT NULL,
    "title" varchar(255) NOT NULL,
    "content" text NOT NULL,
    "created_at" timestamp DEFAULT now(),
    "updated_at" timestamp DEFAULT now()
);
```

## 🎨 Features in Detail

### Dark/Light Mode
- Automatic system preference detection
- Persistent theme storage in localStorage
- Smooth transitions between themes
- Accessible toggle button with sun/moon icons
- Fixed position in top-right corner

### Toast Notifications
- **Position**: Bottom-right corner
- **Types**: Success, Error, Warning, Info
- **Auto-dismiss**: 3-second timeout
- **Manual dismiss**: Click X to close early
- **HTTP-specific messages**: 
  - ✨ POST request successful - Post created!
  - 🔄 PUT request successful - Post updated!
  - 🗑️ DELETE request successful - Post deleted!
  - ❌ Error messages for failed operations

### Post Management
- Create new posts with title and content
- Edit existing posts inline with form validation
- Delete posts with confirmation
- Real-time updates without page refresh
- Expandable metadata on hover (ID, creation date, update date)

### Animations & Interactions
- **Hover Float**: All buttons lift up on hover with shadow
- **Card Expansion**: Post metadata smoothly expands on hover
- **Theme Transitions**: Smooth color transitions between themes
- **Toast Animations**: Slide in from right with fade effects
- **Interactive Feedback**: Visual feedback on all user actions

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:generate  # Generate database migrations
npm run db:migrate   # Run database migrations
```

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts` | Get all posts |
| GET | `/api/posts/:id` | Get single post |
| POST | `/api/posts` | Create new post |
| PUT | `/api/posts/:id` | Update post |
| DELETE | `/api/posts/:id` | Delete post |

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `DATABASE_URL` environment variable
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Hono](https://hono.dev/) for the fast web framework
- [Drizzle](https://orm.drizzle.team/) for the excellent ORM
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [Lucide](https://lucide.dev/) for the beautiful icons

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

Made with ❤️ using Next.js, Hono, and PostgreSQL
