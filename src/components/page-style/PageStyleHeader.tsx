'use client';

interface PageStyleHeaderProps {
  title: string;
  description: string;
}

export default function PageStyleHeader({ title, description }: PageStyleHeaderProps) {
  return (
    <div>
      <h3 className="text-3xl font-bold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </div>
  );
}