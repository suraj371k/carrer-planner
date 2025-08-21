"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobs = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
const user_model_1 = require("../models/user.model");
// Helper function to normalize LinkedIn URLs
function normalizeLinkedInUrl(url) {
    if (!url)
        return "#";
    // Remove duplicate prefixes if they exist
    let cleanUrl = url.replace(/^https:\/\/linkedin\.comhttps?:\/\//, 'https://');
    // Ensure proper URL format
    if (cleanUrl.startsWith('/')) {
        cleanUrl = `https://www.linkedin.com${cleanUrl}`;
    }
    else if (!cleanUrl.startsWith('http')) {
        cleanUrl = `https://www.linkedin.com/${cleanUrl.replace(/^\//, '')}`;
    }
    // Ensure we're using the www subdomain
    cleanUrl = cleanUrl.replace('https://linkedin.com', 'https://www.linkedin.com');
    return cleanUrl;
}
// Enhanced matching algorithm
function calculateMatchScore(title, company, user) {
    if (!title || !user)
        return 0;
    let score = 0;
    const titleLower = title.toLowerCase();
    const companyLower = company.toLowerCase();
    const userSkills = user.skills?.split(",") || [];
    const userExperience = user.experience?.split(",") || [];
    const careerTerms = {
        "Frontend Developer": ["frontend", "front-end", "react", "angular", "vue", "javascript", "js", "typescript", "ts", "html", "css"],
        "Full Stack Developer": ["full stack", "fullstack", "full-stack", "mern", "mean", "node", "react", "javascript"],
        "Backend Developer": ["backend", "back-end", "server-side", "api", "node", "python", "java", "server"],
        "Data Scientist": ["data science", "data scientist", "machine learning", "ml", "data analysis", "analytics"],
        "AI Engineer": ["ai", "artificial intelligence", "ml", "machine learning", "neural networks", "deep learning"],
        "Cybersecurity Engineer": ["cyber security", "cybersecurity", "security", "infosec", "penetration", "ethical hacking"],
        "DevOps Engineer": ["devops", "dev ops", "cloud", "infrastructure", "aws", "azure", "docker", "kubernetes"],
        "UI/UX Designer": ["ui", "ux", "user experience", "user interface", "design", "designer", "product design"],
    };
    try {
        // Career-specific terms matching
        const careerGoal = user.careerGoal || "";
        const terms = careerTerms[careerGoal] || [];
        terms.forEach((term) => {
            if (titleLower.includes(term.toLowerCase())) {
                score += 12;
            }
        });
        // Skills matching
        userSkills.forEach((skill) => {
            const skillTrimmed = skill.trim().toLowerCase();
            if (skillTrimmed && (titleLower.includes(skillTrimmed) || companyLower.includes(skillTrimmed))) {
                score += 8;
            }
        });
        // Experience matching
        userExperience.forEach((exp) => {
            const expTrimmed = exp.trim().toLowerCase();
            if (expTrimmed && (titleLower.includes(expTrimmed) || companyLower.includes(expTrimmed))) {
                score += 6;
            }
        });
        // Direct career goal match
        if (careerGoal && titleLower.includes(careerGoal.toLowerCase())) {
            score += 15;
        }
        // Common tech keywords bonus
        const techKeywords = ["developer", "engineer", "programmer", "software", "tech", "it"];
        techKeywords.forEach(keyword => {
            if (titleLower.includes(keyword)) {
                score += 5;
            }
        });
    }
    catch (error) {
        console.error("Score calculation error:", error);
    }
    return score;
}
// Alternative scraping approach with multiple selectors
function extractJobsFromHtml($, user) {
    const jobs = [];
    // Try multiple selector combinations for different LinkedIn layouts
    const jobSelectors = [
        'div.base-card',
        'div.job-search-card',
        'li.result-card',
        'div[data-entity-urn]',
        '.jobs-search__results-list li'
    ];
    jobSelectors.forEach(selector => {
        $(selector).each((i, elem) => {
            try {
                const jobElement = $(elem);
                // Try multiple title selectors
                const titleSelectors = [
                    'h3.base-search-card__title',
                    'h3.job-search-card__title',
                    '.result-card__title',
                    'a[data-tracking-control-name="public_jobs_jserp-result_search-card"]',
                    '.job-search-card__title a'
                ];
                let title = '';
                for (const titleSel of titleSelectors) {
                    title = jobElement.find(titleSel).text().trim();
                    if (title)
                        break;
                }
                // Try multiple company selectors
                const companySelectors = [
                    'h4.base-search-card__subtitle a',
                    '.job-search-card__subtitle-primary-grouping .job-search-card__subtitle',
                    '.result-card__subtitle',
                    'h4.job-search-card__subtitle',
                    '.job-search-card__subtitle a'
                ];
                let company = '';
                for (const companySel of companySelectors) {
                    company = jobElement.find(companySel).text().trim();
                    if (company)
                        break;
                }
                // Try multiple location selectors
                const locationSelectors = [
                    'span.job-search-card__location',
                    '.result-card__location',
                    '.job-search-card__location',
                    '[data-tracking-control-name="public_jobs_jserp-result_job-search-card-location"]'
                ];
                let location = '';
                for (const locSel of locationSelectors) {
                    location = jobElement.find(locSel).text().trim();
                    if (location)
                        break;
                }
                // Try multiple link selectors
                const linkSelectors = [
                    'a.base-card__full-link',
                    '.result-card__full-card-link',
                    'h3 a',
                    '.job-search-card__title a'
                ];
                let rawLink = '';
                for (const linkSel of linkSelectors) {
                    rawLink = jobElement.find(linkSel).attr('href') || '';
                    if (rawLink)
                        break;
                }
                // Try multiple date selectors
                const dateSelectors = [
                    'time.job-search-card__listdate',
                    'time.job-search-card__listdate--new',
                    '.result-card__listdate',
                    'time'
                ];
                let postedWhen = '';
                for (const dateSel of dateSelectors) {
                    postedWhen = jobElement.find(dateSel).text().trim();
                    if (postedWhen)
                        break;
                }
                // Only add job if we have minimum required data
                if (title && company) {
                    const jobData = {
                        title,
                        company,
                        location: location || "Remote",
                        link: normalizeLinkedInUrl(rawLink),
                        postedWhen: postedWhen || "Recently",
                        matchScore: calculateMatchScore(title, company, user)
                    };
                    // Check if this job already exists
                    const exists = jobs.some(existingJob => existingJob.title === jobData.title &&
                        existingJob.company === jobData.company);
                    if (!exists) {
                        jobs.push(jobData);
                    }
                }
            }
            catch (error) {
                console.error(`Error parsing job ${i}:`, error);
            }
        });
    });
    return jobs;
}
const jobs = async (req, res) => {
    try {
        // 1. Get user data
        const user = await user_model_1.User.findById(req.user?.id).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        // 2. Prepare keywords - make them more targeted
        const skills = user.skills?.split(",").map(skill => skill.trim()).filter(Boolean) || [];
        const careerGoal = user.careerGoal || "";
        const keywords = [...skills.slice(0, 5), careerGoal].filter(Boolean).join(" ");
        // 3. Try different LinkedIn endpoints
        const searchUrls = [
            `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(keywords)}&location=Worldwide&geoId=92000000`,
            `https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=${encodeURIComponent(keywords)}&location=Worldwide&start=0`,
            `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(careerGoal)}`
        ];
        let jobs = [];
        let successfulUrl = '';
        // 4. Enhanced request configuration with better headers
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br',
            'Referer': 'https://www.google.com/',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'cross-site',
            'Cache-Control': 'max-age=0',
        };
        // Try different URLs until one works
        for (const searchUrl of searchUrls) {
            try {
                console.log(`Trying URL: ${searchUrl}`);
                const response = await axios_1.default.get(searchUrl, {
                    headers,
                    timeout: 20000,
                    maxRedirects: 5,
                    validateStatus: (status) => status < 500, // Accept 4xx errors
                });
                console.log(`Response status: ${response.status}`);
                console.log(`Response length: ${response.data.length}`);
                // Check for anti-bot measures
                if (response.data.includes('security challenge') ||
                    response.data.includes('unusual activity') ||
                    response.data.includes('CAPTCHA') ||
                    response.data.includes('blocked') ||
                    response.status === 429) {
                    console.log('Anti-bot detection triggered, trying next URL...');
                    continue;
                }
                const $ = cheerio.load(response.data);
                jobs = extractJobsFromHtml($, user);
                if (jobs.length > 0) {
                    successfulUrl = searchUrl;
                    console.log(`Successfully scraped ${jobs.length} jobs from: ${searchUrl}`);
                    break;
                }
            }
            catch (error) {
                console.error(`Error with URL ${searchUrl}:`, error instanceof Error ? error.message : error);
                continue;
            }
        }
        // 5. If no jobs found through scraping, provide fallback
        if (jobs.length === 0) {
            // Create some mock jobs based on user profile for demonstration
            const mockJobs = [
                {
                    title: `${careerGoal} Position`,
                    company: "Tech Company",
                    location: "Remote",
                    link: "https://www.linkedin.com/jobs/search/",
                    postedWhen: "Recently",
                    matchScore: 25,
                    note: "Scraping currently limited - please visit LinkedIn directly"
                }
            ];
            return res.json({
                success: true,
                jobs: mockJobs,
                meta: {
                    keywordUsed: keywords,
                    totalFound: 0,
                    relevantCount: 0,
                    searchUrl: successfulUrl || searchUrls[0],
                    note: "LinkedIn scraping is currently limited. Please visit the search URL directly."
                }
            });
        }
        // 6. Process and filter jobs
        const uniqueJobs = jobs.filter((job, index, self) => index === self.findIndex((j) => (j.title.toLowerCase() === job.title.toLowerCase() &&
            j.company.toLowerCase() === job.company.toLowerCase())));
        // Lower the threshold to get more results
        const relevantJobs = uniqueJobs
            .filter(job => job.matchScore >= 5) // Lowered from 20 to 5
            .sort((a, b) => b.matchScore - a.matchScore);
        // 7. Enhanced response
        res.json({
            success: true,
            jobs: relevantJobs,
            meta: {
                keywordUsed: keywords,
                totalFound: jobs.length,
                relevantCount: relevantJobs.length,
                searchUrl: successfulUrl || searchUrls[0],
                scrapingStatus: jobs.length > 0 ? "successful" : "limited",
                advice: "For best results, visit LinkedIn directly using the provided search URL"
            }
        });
    }
    catch (error) {
        console.error('Main scraping error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch jobs from LinkedIn',
            error: error instanceof Error ? error.message : 'Unknown error',
            solution: [
                'LinkedIn has strong anti-scraping measures',
                'Try using LinkedIn\'s official API or job boards like Indeed',
                'Visit LinkedIn directly for best results',
                'Consider using headless browsers like Puppeteer for more complex scraping'
            ]
        });
    }
};
exports.jobs = jobs;
//# sourceMappingURL=jobs.controller.js.map