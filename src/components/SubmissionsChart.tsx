'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import submissionsData from '@/data/submissions-data.json';
import SubmissionsChartModal from '@/components/ui/submissions-chart-modal';

interface SubmissionsChartProps {
  className?: string;
  showExpandButton?: boolean;
  isFullScreen?: boolean;
}

export default function SubmissionsChart({ 
  className = "", 
  showExpandButton = true,
  isFullScreen = false 
}: SubmissionsChartProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const data = submissionsData.submissions;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className={`font-medium text-gray-900 ${isFullScreen ? 'text-base' : 'text-sm'}`}>
            {`Time: ${label}`}
          </p>
          <p className={`text-blue-600 ${isFullScreen ? 'text-base' : 'text-sm'}`}>
            {`Submissions: ${payload[0].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  const chartHeight = isFullScreen ? 400 : 264;
  const fontSize = isFullScreen ? 14 : 12;

  return (
    <>
      <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className={`font-semibold text-gray-900 ${isFullScreen ? 'text-2xl' : 'text-lg'}`}>
              Submissions Over Time
            </h3>
            <p className={`text-gray-600 ${isFullScreen ? 'text-base' : 'text-sm'}`}>
              Real-time submission activity during the event
            </p>
          </div>
          
          {showExpandButton && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-2"
            >
              <Maximize2 className="w-4 h-4" />
              <span>Expand</span>
            </Button>
          )}
        </div>
        
        <div style={{ height: chartHeight }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="hour" 
                stroke="#6b7280"
                fontSize={fontSize}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={fontSize}
                tickLine={false}
                axisLine={false}
                label={{ 
                  value: 'Submissions', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle', fontSize: fontSize }
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="#3b82f6" 
                strokeWidth={isFullScreen ? 4 : 3}
                dot={{ 
                  fill: '#3b82f6', 
                  strokeWidth: 2, 
                  r: isFullScreen ? 5 : 4 
                }}
                activeDot={{ 
                  r: isFullScreen ? 7 : 6, 
                  stroke: '#3b82f6', 
                  strokeWidth: 2, 
                  fill: '#ffffff' 
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className={`mt-4 flex items-center justify-between text-gray-500 ${isFullScreen ? 'text-base' : 'text-sm'}`}>
          <span>Event started at 20:00</span>
          <span>Total: {data[data.length - 1]?.count || 0} submissions</span>
          <span>Event ended at 02:00</span>
        </div>
      </div>

      {/* Full Screen Modal */}
      <SubmissionsChartModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
      >
        <SubmissionsChart 
          showExpandButton={false} 
          isFullScreen={true}
          className="border-0 shadow-none"
        />
      </SubmissionsChartModal>
    </>
  );
}