# MoneyTrack

**Know your money. Reach your goals.**

A production-ready personal money and savings management web application built with Next.js 14, TypeScript, Tailwind CSS, and Firebase.

## Features

- 🔐 **Google Authentication** - Secure sign-in with Firebase Auth
- 💰 **Money Lent Tracking** - Track money you've lent to others with repayment recording
- 💸 **Money Borrowed Tracking** - Track money you owe with payment recording
- 🎯 **Savings Goals** - Create targets and track progress with visual indicators
- 📊 **Analytics Dashboard** - Charts for lent vs borrowed, savings progress, monthly activity, and outstanding money
- 🔍 **Search & Filter** - Filter transactions by status, search by name/description, sort by multiple criteria
- ⏰ **Overdue Detection** - Automatic overdue status calculation
- 📱 **Mobile Responsive** - Works perfectly on desktop, tablet, and mobile
- 🌙 **Dark Mode** - Full dark mode support with system preference detection
- 📤 **Data Export** - Export all your data as JSON
- 🛡️ **Secure** - Firestore security rules ensure users only access their own data

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Authentication**: Firebase Authentication (Google)
- **Database**: Cloud Firestore
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Notifications**: Sonner

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase account

### 1. Clone and Install

```bash
cd moneytrack
npm install
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing)
3. Enable **Google Authentication**:
   - Go to Authentication > Sign-in method
   - Enable Google provider
   - Add authorized domain (localhost for development)
4. Create **Firestore Database**:
   - Go to Firestore Database > Create database
   - Start in **production mode**
   - Choose a location close to your users
5. Add a **Web App**:
   - Go to Project Settings > General > Your apps
   - Click </> (Web app)
   - Register app and copy the config values

### 3. Environment Variables

Copy the example file and fill in your Firebase config:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Firebase config values:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### 4. Deploy Firestore Security Rules

```bash
# Install Firebase CLI if not already installed
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firestore in your project (if not done)
firebase init firestore

# Deploy rules
firebase deploy --only firestore:rules
```

Or manually copy the contents of `firestore.rules` to Firebase Console > Firestore > Rules.

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
moneytrack/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── login/              # Login page
│   │   ├── dashboard/          # Dashboard (protected)
│   │   ├── lent/               # Money Lent module
│   │   ├── borrowed/           # Money Borrowed module
│   │   ├── savings/            # Savings Goals module
│   │   ├── analytics/          # Analytics page
│   │   ├── profile/            # Profile page
│   │   └── settings/           # Settings page
│   ├── components/
│   │   ├── layout/             # Layout components (Sidebar, Header, MobileNav)
│   │   ├── dashboard/          # Dashboard components
│   │   ├── money/              # Money tracking components
│   │   ├── savings/            # Savings components
│   │   ├── charts/             # Chart components
│   │   └── ui/                 # Reusable UI components (shadcn/ui)
│   ├── contexts/               # React Context providers (Auth, Theme)
│   ├── lib/
│   │   ├── firebase/           # Firebase config and auth
│   │   ├── services/           # Firestore service layer
│   │   ├── utils/              # Utility functions (money formatting, etc.)
│   │   └── validations/        # Zod schemas
│   ├── types/                  # TypeScript type definitions
│   └── hooks/                  # Custom React hooks
├── firestore.rules             # Firestore security rules
├── .env.local.example          # Environment variables template
└── package.json
```

## Firestore Data Structure

```
users/{uid}
├── profile (document)
├── lentMoney/{transactionId}
│   ├── userId, personName, amount, paidAmount, remainingAmount
│   ├── date, dueDate, category, description, status
│   └── createdAt, updatedAt
├── borrowedMoney/{transactionId}
│   ├── userId, personName, amount, repaidAmount, remainingAmount
│   ├── date, dueDate, category, description, status
│   └── createdAt, updatedAt
├── repayments/{repaymentId}
│   ├── userId, transactionId, transactionType, amount
│   ├── date, note, createdAt
└── savingsGoals/{goalId}
    ├── userId, name, targetAmount, savedAmount
    ├── targetDate, description
    └── createdAt, updatedAt
```

## Security

All Firestore operations are protected by security rules that ensure:

- Users can only read/write their own data
- All operations require authentication (`request.auth != null`)
- Document ownership is verified (`request.auth.uid == userId`)
- No frontend-trusted authorization

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Firebase Hosting

```bash
npm run build
firebase deploy
```

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## License

MIT License - feel free to use this for personal or commercial projects.

## Contributing

Contributions are welcome! Please read the contributing guidelines first.

---

Built with ❤️ for better financial management.