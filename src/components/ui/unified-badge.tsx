'use client';

import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useGlobalState } from '@/hooks/useGlobalState';
import { cn } from '@/lib/utils';

interface UnifiedBadgeProps {
  type: 'free' | 'pro' | 'unlimited';
  size?: 'sm' | 'md';
  showSwitch?: boolean;
  className?: string;
}

export function UnifiedBadge({ 
  type, 
  size = 'md', 
  showSwitch = false,
  className
}: UnifiedBadgeProps) {
  const { 
    proActive, 
    unlimitedActive, 
    setProActive, 
    setUnlimitedActive 
  } = useGlobalState();
  
  const isActive = type === 'pro' ? proActive : unlimitedActive;
  const handleToggle = type === 'pro' ? setProActive : setUnlimitedActive;
  
  const getLabel = () => {
    switch (type) {
      case 'free':
        return 'Free';
      case 'pro':
        return 'Pro';
      case 'unlimited':
        return 'Unlimited';
      default:
        return '';
    }
  };

  const getVariant = () => {
    switch (type) {
      case 'free':
        return 'secondary';
      case 'pro':
        return 'outline';
      case 'unlimited':
        return 'default';
      default:
        return 'default';
    }
  };

  const getClassName = () => {
    const baseClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-2 py-1';
    
    switch (type) {
      case 'free':
        return cn(baseClasses, 'bg-gray-100 text-gray-700 hover:bg-gray-100');
      case 'pro':
        return cn(baseClasses, 'bg-yellow-400 text-black hover:bg-yellow-400 border-yellow-400');
      case 'unlimited':
        return cn(baseClasses, 'bg-purple-600 text-white hover:bg-purple-600');
      default:
        return baseClasses;
    }
  };

  const badgeContent = (
    <Badge 
      variant={getVariant()} 
      className={cn(getClassName(), className)}
    >
      {getLabel()}
    </Badge>
  );

  if (!showSwitch || type === 'free') {
    return badgeContent;
  }

  return (
    <div className="flex items-center space-x-2">
      <Badge 
        variant={getVariant()} 
        className={cn(getClassName(), className)}
      >
        {getLabel()}
      </Badge>
      <Switch 
        checked={isActive}
        onCheckedChange={handleToggle}
        className={cn(
          "data-[state=checked]:bg-[#FFE51F]",
          isActive && type === 'unlimited' && "data-[state=checked]:bg-green-600"
        )}
      />
    </div>
  );
}