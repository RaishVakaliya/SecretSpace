<p align="center">
  <img src="/public/secretspace_app_logo.jpg" alt="SecretSpace Logo" cursor="none" width="100"/>
</p>

<h1 align="center">SecretSpace - Anonymous Confessions & Self-Destructing Messages</h1>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Convex-212830?style=for-the-badge&logo=cloud&logoColor=white" />
  <img src="https://img.shields.io/badge/Clerk-3D3DFF?style=for-the-badge&logo=clerk&logoColor=white" />
  <img src="https://img.shields.io/badge/CryptoJS-AES-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/UUID-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/CronJobs-FF9800?style=for-the-badge&logo=clockify&logoColor=white" />
  <img src="https://img.shields.io/badge/Resend-20234A?style=for-the-badge&logo=resend&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</p>

SecretSpace is a platform for sharing anonymous confessions and sending one-time-view secret messages. Users can post thoughts or images without revealing their identity, explore a real-time feed with filters for newest, trending, or most commented posts, and interact through likes and comments. Confessions update instantly and remain completely anonymous.

Secret messages are delivered via secure links that work only for the intended recipient and disappear after a single view, with custom expiration times and live countdowns when less than ten minutes remain. Users can manage profiles, track their activity, adjust privacy settings, and submit feedback or report issues—all within a responsive, modern interface designed for privacy and ease of use.

---

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Convex
- **Authentication:** Clerk
- **Database & Storage:** Convex Storage
- **Encryption:** AES (CryptoJS) for secure message encryption/decryption
- **Unique Link Generation:** UUID (uuidv4) for one-time secret message links
- **Automated Cleanup:** Cron jobs (Convex Server) to remove expired messages every minute
- **Email Service:** Resend
- **Deployment:** Vercel

## Getting Started

1. **Download or Clone the Repository**

   - **Option 1:** Download the ZIP file from GitHub and extract it.
   - **Option 2:** Clone the repository:
     ```bash
     git clone https://github.com/RaishVakaliya/SecretSpace.git
     cd SecretSpace
     ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run the Development Server**

   ```bash
   npm run dev
   ```

4. **Start Convex in a Separate Terminal**

   ```bash
   npx convex dev
   ```

   This will guide you to set up your Convex project.
   After setup, a .env.local file will be created in the project root.

5. **.env.local Example**

```env
# Convex configuration
CONVEX_DEPLOYMENT=your_convex_deployment_url
VITE_CONVEX_URL=your_vite_convex_url

# Clerk configuration
VITE_CLERK_FRONTEND_API_URL=your_vite_clerk_frontend_api_url
VITE_CLERK_PUBLISHABLE_KEY=your_vite_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret

# Resend configuration
RESEND_API_KEY=your_resend_api_key
RESEND_WEBHOOK_SECRET=your_resend_webhook_secret
```

6. **Open the URL shown in your terminal (usually http://localhost:5173).**

## Main Features

- **Anonymous Confessions** – Post and view confessions without logging in, and interact with likes and comments.
- **Confession Filters** – Browse confessions by Newest, Most Liked, or Most Commented.
- **Secure Message Links** – Secret message links only work for the intended recipient.
- **Real-Time Countdown Timer** – For messages expiring within 10 minutes, a live countdown is shown to create urgency.
- **One-Time Viewing** – Secret messages are automatically deleted after being read once.
- **Privacy Settings** – Control profile searchability and email notification preferences.
- **Email Notifications** – Users receive an email alert when they get a new secret message.

## Upcoming Features

- **Enhanced Privacy Controls** – Fine-tune permissions for who can send or view secret messages.

SecretSpace continues to evolve with a focus on privacy, security, and a seamless user experience — your trusted space for authentic expression.
