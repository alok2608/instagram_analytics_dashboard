# Instagram Influencer Profile Analyzer

A full-stack web application that delivers deep insights into Instagram influencer profiles. Analyze engagement, content performance, and demographics with an interactive dashboard powered by real-time scraping and AI-driven analytics.

## 🌟 Features

### Core Capabilities


 ** Profile Analysis  – Followers, following, posts count, and bio

** Smart Scraping – Public Instagram data with robust fallback mechanisms

** Analytics Dashboard – Interactive charts for engagement, content, and trends

** AI Content Analysis – Automated post classification, quality scoring, and sentiment detection

** Audience Insights – Simulated demographic splits (age, gender, geography)

** Responsive UI – Optimized for desktop, tablet, and mobile

## Technical Highlights

** MongoDB Integration – Indexed schema design with subdocuments for posts

** RESTful API – Clean, structured endpoints for all data operations

** Smart Caching – Reduces redundant scraping for faster responses

** Error Handling – Graceful fallbacks with demo data generation

** Real-time Refresh – Force updates for the latest profile stats

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Chart.js** with React Chart.js 2 for data visualization
- **Lucide React** for icons
- **Vite** for development and building

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose ODM
- **Axios** and Cheerio for web scraping
- **Sharp** for image processing
- **Helmet** for security
- **CORS** for API access

### AI & Processing
** Google Cloud Vision API (optional)

**Custom content classification + quality scoring algorithms

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/instagram-influencer-analyzer.git
cd instagram-influencer-analyzer
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/instagram_analyzer
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/instagram_analyzer

# Server Configuration
PORT=5000
NODE_ENV=development

# Optional: AI Services
GOOGLE_CLOUD_PROJECT_ID=your_project_id
GOOGLE_CLOUD_KEY_FILE=path_to_service_account_key.json
```

### 4. Start MongoDB
If using local MongoDB:
```bash
mongod
```

For MongoDB Atlas, ensure your cluster is running and connection string is correct.

### 5. Run the Application
```bash
npm run dev
```

This will start both the frontend (http://localhost:5173) and backend (http://localhost:5000) servers.

## 🏗️ Architecture

### Database Schema
- **Influencer Collection**: Profile data, analytics, demographics
- **Posts Subdocuments**: Media content with AI analysis results
- **Proper Indexing**: Indexed for fast lookups by username & timestamps

### API Endpoints
- `GET /api/influencers/:username` - Get complete influencer profile
- `GET /api/influencers/:username/analytics` - Get detailed analytics
- `GET /api/influencers/:username/posts` - Get posts with filtering options
- `POST /api/influencers/:username/refresh` - Force refresh profile data

### Frontend Architecture
**Modular React components

**TypeScript types for data safety

**Mobile-first Tailwind styling

## 🔧 Key Features Explained

### Instagram Scraping
The application uses multiple strategies to gather Instagram data:
1. **Public Profile Scraping**: Extracts data from publicly available Instagram pages
2. **Metadata Parsing**: Processes Open Graph and JSON-LD data
3. **Demo Data Fallback**: Generates realistic demo data when scraping is restricted
4. **Smart Caching**: Reduces API calls by caching recent data

### AI Content Analysis
Each post is analyzed for:
- **Keywords Extraction**: Identifies relevant hashtags and topics
- **Vibe Classification**: Categorizes content mood (casual, aesthetic, luxury, etc.)
- **Quality Scoring**: Evaluates lighting, composition, and visual appeal
- **Object Detection**: Identifies objects and scenes in images
- **Color Analysis**: Extracts dominant color palettes

### Analytics Dashboard
Interactive visualizations include:
- **Engagement Trends**: Line charts showing likes/comments over time
- **Content Distribution**: Pie charts for content types and vibes
- **Quality Metrics**: Circular progress indicators for quality scores
- **Demographics**: Bar and doughnut charts for audience insights

## 🛠️ Development Guidelines

### Adding New Features
1. **Backend**: Add new routes in `/server/routes/`
2. **Frontend**: Create components in `/src/components/`
3. **Types**: Update TypeScript types in `/src/types/`
4. **Database**: Modify schemas in `/server/models/`

### Code Structure
```
├── server/
│   ├── config/         # Database configuration
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API endpoints
│   ├── services/       # Business logic
│   └── server.js       # Express server
├── src/
│   ├── components/     # React components
│   ├── services/       # API calls
│   ├── types/          # TypeScript definitions
│   └── App.tsx         # Main application
└── README.md
```

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Variables for Production
Update your `.env` file with production values:
- Set `NODE_ENV=production`
- Use production MongoDB URI
- Configure proper CORS origins
- Add any required API keys


## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running locally or Atlas cluster is accessible
   - Check connection string format
   - Verify network access for Atlas

2. **CORS Issues**
   - Update CORS configuration in `server/server.js`
   - Check frontend URL in CORS origin

3. **Scraping Limitations**
   - Instagram may block requests; the app includes demo data fallback
   - Consider using proxies or rotating user agents for production

4. **Chart Rendering Issues**
   - Ensure Chart.js dependencies are properly installed
   - Check component imports for chart components


## 📝 Assumptions & Limitations

### Assumptions Made
- Instagram profiles are public for scraping
- Users have basic knowledge of Instagram metrics
- Demo data is acceptable when real data is unavailable
- Modern browsers with JavaScript enabled

### Current Limitations
- Instagram's anti-scraping measures may limit data access
- AI analysis uses simulated results (can be replaced with real APIs)
- Demographics data is inferred/simulated
- Limited to public Instagram profiles

### Future Enhancements
- Integration with Instagram Basic Display API
- Real-time AI processing with Google Vision API
- Advanced audience analysis with external data sources
- Export functionality for analytics reports
- User authentication and saved profiles

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Instagram for providing public profile data
- Chart.js community for excellent charting library
- Tailwind CSS for rapid UI development
- MongoDB team for robust database solutions