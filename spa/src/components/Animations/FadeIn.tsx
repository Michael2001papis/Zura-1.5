import React, { useState, useEffect } from 'react';
import { useIntersectionObserver } from '../../hooks/usePerformance';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  distance?: number;
  once?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 600,
  direction = 'up',
  distance = 20,
  once = true,
  className = '',
  style = {}
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  });

  useEffect(() => {
    if (isIntersecting) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);

      return () => clearTimeout(timer);
    } else if (!once) {
      setIsVisible(false);
    }
  }, [isIntersecting, delay, once]);

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up':
          return `translateY(${distance}px)`;
        case 'down':
          return `translateY(-${distance}px)`;
        case 'left':
          return `translateX(${distance}px)`;
        case 'right':
          return `translateX(-${distance}px)`;
        case 'fade':
        default:
          return 'translateY(0)';
      }
    }
    return 'translateY(0)';
  };

  const animationStyle: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: getTransform(),
    transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
    ...style
  };

  return (
    <div
      ref={ref}
      className={`fade-in fade-in--${direction} ${className}`}
      style={animationStyle}
    >
      {children}
    </div>
  );
};

// Slide In Animation
interface SlideInProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const SlideIn: React.FC<SlideInProps> = ({
  children,
  direction = 'left',
  delay = 0,
  duration = 600,
  distance = 100,
  once = true,
  className = '',
  style = {}
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  });

  useEffect(() => {
    if (isIntersecting) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);

      return () => clearTimeout(timer);
    } else if (!once) {
      setIsVisible(false);
    }
  }, [isIntersecting, delay, once]);

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'left':
          return `translateX(-${distance}px)`;
        case 'right':
          return `translateX(${distance}px)`;
        case 'up':
          return `translateY(-${distance}px)`;
        case 'down':
          return `translateY(${distance}px)`;
        default:
          return 'translateX(0)';
      }
    }
    return 'translateX(0) translateY(0)';
  };

  const animationStyle: React.CSSProperties = {
    transform: getTransform(),
    transition: `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
    ...style
  };

  return (
    <div
      ref={ref}
      className={`slide-in slide-in--${direction} ${className}`}
      style={animationStyle}
    >
      {children}
    </div>
  );
};

// Scale In Animation
interface ScaleInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  scale?: number;
  once?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const ScaleIn: React.FC<ScaleInProps> = ({
  children,
  delay = 0,
  duration = 600,
  scale = 0.8,
  once = true,
  className = '',
  style = {}
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  });

  useEffect(() => {
    if (isIntersecting) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);

      return () => clearTimeout(timer);
    } else if (!once) {
      setIsVisible(false);
    }
  }, [isIntersecting, delay, once]);

  const animationStyle: React.CSSProperties = {
    transform: isVisible ? 'scale(1)' : `scale(${scale})`,
    opacity: isVisible ? 1 : 0,
    transition: `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${duration}ms ease-out`,
    ...style
  };

  return (
    <div
      ref={ref}
      className={`scale-in ${className}`}
      style={animationStyle}
    >
      {children}
    </div>
  );
};

// Stagger Animation for lists
interface StaggerProps {
  children: React.ReactNode[];
  delay?: number;
  staggerDelay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  distance?: number;
  once?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Stagger: React.FC<StaggerProps> = ({
  children,
  delay = 0,
  staggerDelay = 100,
  duration = 600,
  direction = 'up',
  distance = 20,
  once = true,
  className = '',
  style = {}
}) => {
  const [visibleItems, setVisibleItems] = useState<boolean[]>([]);
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  });

  useEffect(() => {
    if (isIntersecting) {
      const timer = setTimeout(() => {
        const newVisibleItems = children.map((_, index) => {
          setTimeout(() => {
            setVisibleItems(prev => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
          }, index * staggerDelay);
          return false;
        });
        setVisibleItems(newVisibleItems);
      }, delay);

      return () => clearTimeout(timer);
    } else if (!once) {
      setVisibleItems([]);
    }
  }, [isIntersecting, delay, staggerDelay, children.length, once]);

  const getTransform = (index: number) => {
    if (!visibleItems[index]) {
      switch (direction) {
        case 'up':
          return `translateY(${distance}px)`;
        case 'down':
          return `translateY(-${distance}px)`;
        case 'left':
          return `translateX(${distance}px)`;
        case 'right':
          return `translateX(-${distance}px)`;
        case 'fade':
        default:
          return 'translateY(0)';
      }
    }
    return 'translateY(0)';
  };

  return (
    <div ref={ref} className={`stagger ${className}`} style={style}>
      {children.map((child, index) => (
        <div
          key={index}
          className={`stagger-item stagger-item--${direction}`}
          style={{
            opacity: visibleItems[index] ? 1 : 0,
            transform: getTransform(index),
            transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

// Bounce Animation
interface BounceProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  intensity?: number;
  once?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Bounce: React.FC<BounceProps> = ({
  children,
  delay = 0,
  duration = 600,
  intensity = 0.3,
  once = true,
  className = '',
  style = {}
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  });

  useEffect(() => {
    if (isIntersecting) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);

      return () => clearTimeout(timer);
    } else if (!once) {
      setIsVisible(false);
    }
  }, [isIntersecting, delay, once]);

  const animationStyle: React.CSSProperties = {
    transform: isVisible ? 'scale(1)' : `scale(${1 - intensity})`,
    opacity: isVisible ? 1 : 0,
    transition: `transform ${duration}ms cubic-bezier(0.68, -0.55, 0.265, 1.55), opacity ${duration}ms ease-out`,
    ...style
  };

  return (
    <div
      ref={ref}
      className={`bounce-in ${className}`}
      style={animationStyle}
    >
      {children}
    </div>
  );
};

// Rotate In Animation
interface RotateInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  angle?: number;
  once?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const RotateIn: React.FC<RotateInProps> = ({
  children,
  delay = 0,
  duration = 600,
  angle = 180,
  once = true,
  className = '',
  style = {}
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  });

  useEffect(() => {
    if (isIntersecting) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);

      return () => clearTimeout(timer);
    } else if (!once) {
      setIsVisible(false);
    }
  }, [isIntersecting, delay, once]);

  const animationStyle: React.CSSProperties = {
    transform: isVisible ? 'rotate(0deg)' : `rotate(${angle}deg)`,
    opacity: isVisible ? 1 : 0,
    transition: `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${duration}ms ease-out`,
    ...style
  };

  return (
    <div
      ref={ref}
      className={`rotate-in ${className}`}
      style={animationStyle}
    >
      {children}
    </div>
  );
};
