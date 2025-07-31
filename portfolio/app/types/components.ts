export interface GlassMorphicCardProps {
  children: React.ReactNode;
  className?: string;
}

export interface ProjectButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export interface SocialLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
  color: 'blue' | 'green' | 'purple' | 'pink' | 'red' | 'black';
}