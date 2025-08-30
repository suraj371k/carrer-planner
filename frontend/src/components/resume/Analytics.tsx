import React from 'react';
import { useResume } from '@/hooks/useResume';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';

const Analytics = () => {
  const { analytics, isLoadingAnalytics, analyticsError } = useResume();

  if (isLoadingAnalytics) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (analyticsError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-red-600 font-medium">Failed to load analytics</p>
          <p className="text-gray-500 text-sm mt-2">{analyticsError.message}</p>
        </div>
      </div>
    );
  }

  if (!analytics || analytics.totalAnalyses === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-gray-400 mb-4">
            <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Analytics Available</h3>
          <p className="text-gray-500">Upload and analyze your first resume to see detailed analytics.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume Analytics</h1>
        <p className="text-gray-600">Detailed insights from your resume analyses</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Analyses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{analytics.totalAnalyses}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{analytics.averageScore.toFixed(1)}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Improvement Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              {analytics.improvementTrend.length > 1 
                ? analytics.improvementTrend[analytics.improvementTrend.length - 1].score > analytics.improvementTrend[0].score 
                  ? '↗️' 
                  : '↘️'
                : '—'
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Section Scores */}
      <Card>
        <CardHeader>
          <CardTitle>Section Performance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(analytics.sectionAverages).map(([section, score]) => (
            <div key={section} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium capitalize">
                  {section.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className="text-sm text-gray-600">{score.toFixed(1)}%</span>
              </div>
              <Progress value={score} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Strengths and Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">Top Strengths</CardTitle>
          </CardHeader>
          <CardContent>
            {analytics.topStrengths.length > 0 ? (
              <div className="space-y-3">
                {analytics.topStrengths.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium text-green-800">{item.strength}</span>
                    <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">
                      {item.count} {item.count === 1 ? 'time' : 'times'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No strengths identified yet.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Common Weaknesses</CardTitle>
          </CardHeader>
          <CardContent>
            {analytics.commonWeaknesses.length > 0 ? (
              <div className="space-y-3">
                {analytics.commonWeaknesses.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="text-sm font-medium text-red-800">{item.weakness}</span>
                    <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded-full">
                      {item.count} {item.count === 1 ? 'time' : 'times'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No weaknesses identified yet.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Improvement Trend */}
      {analytics.improvementTrend.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Score Improvement Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.improvementTrend.map((trend, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">
                    {new Date(trend.date).toLocaleDateString()}
                  </span>
                  <span className="text-sm font-medium text-gray-900">{trend.score.toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Best Performing Section</h4>
              <p className="text-blue-800">
                {Object.entries(analytics.sectionAverages)
                  .sort(([,a], [,b]) => b - a)[0][0]
                  .replace(/([A-Z])/g, ' $1')
                  .trim()} 
                ({Math.max(...Object.values(analytics.sectionAverages)).toFixed(1)}%)
              </p>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-medium text-yellow-900 mb-2">Area for Improvement</h4>
              <p className="text-yellow-800">
                {Object.entries(analytics.sectionAverages)
                  .sort(([,a], [,b]) => a - b)[0][0]
                  .replace(/([A-Z])/g, ' $1')
                  .trim()} 
                ({Math.min(...Object.values(analytics.sectionAverages)).toFixed(1)}%)
              </p>
            </div>

            {analytics.improvementTrend.length > 1 && (
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Progress</h4>
                <p className="text-green-800">
                  {analytics.improvementTrend[analytics.improvementTrend.length - 1].score > analytics.improvementTrend[0].score 
                    ? `Your scores have improved by ${(analytics.improvementTrend[analytics.improvementTrend.length - 1].score - analytics.improvementTrend[0].score).toFixed(1)}%`
                    : `Your scores have decreased by ${(analytics.improvementTrend[0].score - analytics.improvementTrend[analytics.improvementTrend.length - 1].score).toFixed(1)}%`
                  } since your first analysis.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;