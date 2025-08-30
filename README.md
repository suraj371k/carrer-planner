# Career Planner - AI-Powered Career Development Platform

## 🚀 Overview

Career Planner is a comprehensive career development platform that leverages AI to help users improve their resumes, find relevant jobs, practice interviews, and create personalized career roadmaps. Built with modern technologies including React, Node.js, and AI integration.

## ✨ Features

### 🔍 **Job Scraping & Matching**
- **LinkedIn Job Scraping**: Automatically fetches relevant jobs from LinkedIn based on user profile
- **Smart Job Matching**: AI-powered job recommendations based on skills, experience, and career goals
- **Job Search Filters**: Filter by location, experience level, company size, and more
- **Job Tracking**: Save and track interesting job opportunities

### 📄 **AI Resume Analyzer**
- **Multi-Format Support**: Upload PDF, DOC, DOCX, TXT, and RTF files
- **Comprehensive Analysis**: 
  - Overall score assessment (0-100)
  - Section-wise analysis (Contact, Summary, Experience, Education, Skills, Formatting)
  - Strengths and weaknesses identification
  - Keyword analysis (present vs. missing keywords)
  - Specific improvement recommendations
- **Analytics Dashboard**: Track improvement trends and performance metrics
- **Cloud Storage**: Secure file storage with Cloudinary integration

### 🗺️ **AI Career Roadmap Generator**
- **Personalized Roadmaps**: Generate custom career paths based on user profile
- **Skill Gap Analysis**: Identify skills needed for target positions
- **Timeline Planning**: Create step-by-step career progression plans
- **Goal Setting**: Set and track career milestones

### 🎯 **AI-Powered MCQ Practice**
- **Topic-Based Practice**: Practice questions by specific topics and skills
- **Adaptive Learning**: Questions adjust based on performance
- **Progress Tracking**: Monitor improvement over time
- **Detailed Explanations**: Get explanations for correct and incorrect answers

### �� **Authentication & User Management**
- **Secure Authentication**: JWT-based authentication system
- **User Profiles**: Comprehensive user profile management
- **Session Management**: Secure session handling with cookies
- **Protected Routes**: Role-based access control

### 📊 **Analytics & Insights**
- **Resume Analytics**: Detailed performance metrics and trends
- **Practice Statistics**: Track MCQ performance and improvement
- **Career Progress**: Monitor career development milestones
- **Visual Dashboards**: Interactive charts and progress indicators

## 🛠️ Technology Stack

### **Frontend**
- **React 18** with TypeScript
- **Next.js 14** for server-side rendering and routing
- **Tailwind CSS** for styling
- **React Query (TanStack Query)** for state management
- **Axios** for API communication
- **Shadcn/ui** for UI components

### **Backend**
- **Node.js** with TypeScript
- **Express.js** framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Multer** for file uploads
- **Cloudinary** for cloud storage

### **AI & External Services**
- **Google Gemini AI** for resume analysis and career guidance
- **LinkedIn Job Scraping** API
- **Cloudinary** for file storage

### **Development Tools**
- **TypeScript** for type safety
- **ESLint** and **Prettier** for code formatting
- **Git** for version control

## 📁 Project Structure

```
Career-Planner/
├── frontend/                 # React/Next.js frontend
│   ├── src/
│   │   ├── app/             # Next.js app router pages
│   │   ├── components/      # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   └── services/       # API service functions
│   └── public/             # Static assets
├── backend/                 # Node.js/Express backend
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   └── utils/          # Utility functions
│   └── dist/               # Compiled TypeScript
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/career-planner.git
   cd career-planner
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**

   **Backend (.env)**
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   GEMINI_API_KEY=your_gemini_api_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   CLIENT_URL=http://localhost:3000
   ```

   **Frontend (.env.local)**
   ```env
   NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
   ```

5. **Start the development servers**

   **Backend**
   ```bash
   cd backend
   npm run dev
   ```

   **Frontend**
   ```bash
   cd frontend
   npm run dev
   ```

6. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `POST /api/users/logout` - User logout
- `GET /api/users/profile` - Get user profile

### Resume Analysis Endpoints
- `POST /api/resume/upload` - Upload and analyze resume
- `GET /api/resume` - Get user's resume history
- `GET /api/resume/:id` - Get specific resume analysis
- `DELETE /api/resume/:id` - Delete resume analysis
- `GET /api/resume/analytics/stats` - Get resume analytics

### Job Scraping Endpoints
- `GET /api/jobs` - Get scraped jobs
- `POST /api/jobs/scrape` - Trigger job scraping
- `GET /api/jobs/search` - Search jobs with filters

### Career Roadmap Endpoints
- `POST /api/career/roadmap` - Generate career roadmap
- `GET /api/career/roadmap` - Get user's roadmap

### MCQ Practice Endpoints
- `GET /api/practice/topics` - Get practice topics
- `GET /api/practice/questions` - Get practice questions
- `POST /api/practice/submit` - Submit practice answers

## 🔧 Key Features Implementation

### AI Resume Analysis
- Uses Google Gemini AI for comprehensive resume evaluation
- Extracts text from multiple file formats
- Provides detailed scoring and recommendations
- Tracks improvement over time

### Job Scraping
- Automated LinkedIn job scraping based on user profile
- Smart filtering and matching algorithms
- Real-time job updates

### Career Roadmap Generation
- AI-powered career path planning
- Skill gap analysis and recommendations
- Personalized learning paths

### MCQ Practice System
- Topic-based question organization
- Adaptive difficulty adjustment
- Performance tracking and analytics

## 🎨 UI/UX Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern Interface**: Clean, intuitive design with smooth animations
- **Dark/Light Mode**: User preference support
- **Accessibility**: WCAG compliant design
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt password encryption
- **CORS Protection**: Cross-origin request security
- **Input Validation**: Comprehensive input sanitization
- **Rate Limiting**: API request throttling
- **File Upload Security**: Secure file handling and validation

## 📊 Performance Optimization

- **React Query**: Efficient data fetching and caching
- **Code Splitting**: Lazy loading for better performance
- **Image Optimization**: Next.js image optimization
- **Database Indexing**: Optimized MongoDB queries
- **CDN Integration**: Cloudinary for fast file delivery

## 🧪 Testing

- **Unit Tests**: Component and utility testing
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Full user flow testing

## 🚀 Deployment

### Backend Deployment
```bash
cd backend
npm run build
npm start
```

### Frontend Deployment
```bash
cd frontend
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## �� Acknowledgments

- Google Gemini AI for intelligent analysis capabilities
- LinkedIn for job data access
- Cloudinary for file storage solutions
- The open-source community for amazing tools and libraries

## 📞 Support

For support, email support@careerplanner.com or create an issue in the repository.

---

**Built with ❤️ for career development and growth**
