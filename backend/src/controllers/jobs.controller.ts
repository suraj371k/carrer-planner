import { Request, Response } from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import { User } from "../models/user.model";

// Helper function to normalize LinkedIn URLs
function normalizeLinkedInUrl(url: string | undefined): string {
  if (!url) return "#";
  
  // Remove duplicate prefixes if they exist
  let cleanUrl = url.replace(/^https:\/\/linkedin\.comhttps?:\/\//, 'https://');
  
  // Ensure proper URL format
  if (cleanUrl.startsWith('/')) {
    cleanUrl = `https://www.linkedin.com${cleanUrl}`;
  } else if (!cleanUrl.startsWith('http')) {
    cleanUrl = `https://www.linkedin.com/${cleanUrl.replace(/^\//, '')}`;
  }
  
  // Ensure we're using the www subdomain
  cleanUrl = cleanUrl.replace('https://linkedin.com', 'https://www.linkedin.com');
  
  return cleanUrl;
}

// Enhanced function to check if job is within 3 days
function isRecentJob(postedWhen: string): boolean {
  if (!postedWhen) return false;
  
  const postedText = postedWhen.toLowerCase().trim();
  
  // Immediate matches for very recent jobs
  if (postedText.includes('just now') || 
      postedText.includes('minutes ago') || 
      postedText.includes('an hour ago') ||
      postedText.includes('hours ago') ||
      postedText.includes('today') ||
      postedText.includes('yesterday')) {
    return true;
  }
  
  // Check for specific day patterns
  if (postedText.includes('day') || postedText.includes('days')) {
    const dayMatch = postedText.match(/(\d+)\s*days?\s*ago/);
    if (dayMatch) {
      const daysAgo = parseInt(dayMatch[1]);
      return daysAgo <= 3;
    }
    
    // Handle "1 day ago", "2 days ago" etc.
    const singleDayMatch = postedText.match(/(\d+)\s*day/);
    if (singleDayMatch) {
      const daysAgo = parseInt(singleDayMatch[1]);
      return daysAgo <= 3;
    }
  }
  
  // If we can't determine the date, assume it might be recent
  return false;
}

// Enhanced matching algorithm
function calculateMatchScore(title: string, company: string, user: any): number {
  if (!title || !user) return 0;

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
    const terms = careerTerms[careerGoal as keyof typeof careerTerms] || [];
    
    terms.forEach((term) => {
      if (titleLower.includes(term.toLowerCase())) {
        score += 12;
      }
    });

    // Skills matching
    userSkills.forEach((skill: string) => {
      const skillTrimmed = skill.trim().toLowerCase();
      if (skillTrimmed && (titleLower.includes(skillTrimmed) || companyLower.includes(skillTrimmed))) {
        score += 8;
      }
    });

    // Experience matching
    userExperience.forEach((exp: string) => {
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

  } catch (error) {
    console.error("Score calculation error:", error);
  }

  return score;
}

function extractJobsFromHtml($: cheerio.CheerioAPI, user: any): any[] {
  const jobs: any[] = [];
  
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
          if (title) break;
        }

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
          if (company) break;
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
          if (location) break;
        }

        const linkSelectors = [
          'a.base-card__full-link',
          '.result-card__full-card-link',
          'h3 a',
          '.job-search-card__title a'
        ];
        
        let rawLink = '';
        for (const linkSel of linkSelectors) {
          rawLink = jobElement.find(linkSel).attr('href') || '';
          if (rawLink) break;
        }

        // Enhanced date selectors
        const dateSelectors = [
          'time.job-search-card__listdate',
          'time.job-search-card__listdate--new',
          '.result-card__listdate',
          'time[datetime]',
          '.job-result-card__listdate',
          '[data-tracking-control-name="public_jobs_jserp-result_job-search-card-date"]',
          'time'
        ];
        
        let postedWhen = '';
        for (const dateSel of dateSelectors) {
          const dateElement = jobElement.find(dateSel);
          postedWhen = dateElement.text().trim() || dateElement.attr('datetime') || '';
          if (postedWhen) break;
        }

        if (title && company) {
          const jobData = {
            title,
            company,
            location: location || "Remote",
            link: normalizeLinkedInUrl(rawLink),
            postedWhen: postedWhen || "Recently",
            matchScore: calculateMatchScore(title, company, user),
            isRecent: isRecentJob(postedWhen)
          };

          const exists = jobs.some(existingJob => 
            existingJob.title === jobData.title && 
            existingJob.company === jobData.company
          );

          if (!exists) {
            jobs.push(jobData);
          }
        }
      } catch (error) {
        console.error(`Error parsing job ${i}:`, error);
      }
    });
  });

  return jobs;
}

export const jobs = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const skills = user.skills?.split(",").map(skill => skill.trim()).filter(Boolean) || [];
    const careerGoal = user.careerGoal || "";
    const keywords = [...skills.slice(0, 5), careerGoal].filter(Boolean).join(" ");

    // Enhanced search URLs with date filtering parameters
    const searchUrls = [
      // Recent jobs filter - f_TPR=r86400 means last 24 hours, r259200 means last 3 days
      `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(keywords)}&location=Worldwide&geoId=92000000&f_TPR=r259200&sortBy=DD`,
      `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(keywords)}&location=Worldwide&f_TPR=r259200`,
      `https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=${encodeURIComponent(keywords)}&location=Worldwide&start=0&f_TPR=r259200`,
      `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(careerGoal)}&f_TPR=r259200&sortBy=DD`,
      // Fallback without date filter
      `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(keywords)}&location=Worldwide&geoId=92000000`,
    ];

    let jobs: any[] = [];
    let successfulUrl = '';

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

    for (const searchUrl of searchUrls) {
      try {
        console.log(`Trying URL: ${searchUrl}`);
        
        const response = await axios.get(searchUrl, {
          headers,
          timeout: 25000,
          maxRedirects: 5,
          validateStatus: (status) => status < 500, 
        });

        console.log(`Response status: ${response.status}`);
        console.log(`Response length: ${response.data.length}`);

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

      } catch (error) {
        console.error(`Error with URL ${searchUrl}:`, error instanceof Error ? error.message : error);
        continue;
      }
    }

    if (jobs.length === 0) {
      const mockJobs = [
        {
          title: `${careerGoal} Position`,
          company: "Tech Company",
          location: "Remote",
          link: "https://www.linkedin.com/jobs/search/",
          postedWhen: "Recently",
          matchScore: 25,
          isRecent: true,
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
          recentCount: 0,
          searchUrl: successfulUrl || searchUrls[0],
          note: "LinkedIn scraping is currently limited. Please visit the search URL directly."
        }
      });
    }

    // Process and filter jobs
    const uniqueJobs = jobs.filter((job, index, self) =>
      index === self.findIndex((j) => (
        j.title.toLowerCase() === job.title.toLowerCase() && 
        j.company.toLowerCase() === job.company.toLowerCase()
      ))
    );

    // Filter for recent jobs (less than 3 days) AND relevant jobs
    const recentRelevantJobs = uniqueJobs
      .filter(job => job.isRecent && job.matchScore >= 5)
      .sort((a, b) => b.matchScore - a.matchScore);

    // If no recent jobs found, get all recent jobs regardless of match score
    const fallbackRecentJobs = uniqueJobs
      .filter(job => job.isRecent)
      .sort((a, b) => b.matchScore - a.matchScore);

    const finalJobs = recentRelevantJobs.length > 0 ? recentRelevantJobs : fallbackRecentJobs;

    res.json({
      success: true,
      jobs: finalJobs,
      meta: {
        keywordUsed: keywords,
        totalFound: jobs.length,
        relevantCount: uniqueJobs.filter(job => job.matchScore >= 5).length,
        recentCount: uniqueJobs.filter(job => job.isRecent).length,
        finalCount: finalJobs.length,
        searchUrl: successfulUrl || searchUrls[0],
        scrapingStatus: jobs.length > 0 ? "successful" : "limited",
        filterApplied: "Recent jobs (≤ 3 days)",
      }
    });

  } catch (error) {
    console.error('Main scraping error:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to fetch recent jobs from LinkedIn',
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