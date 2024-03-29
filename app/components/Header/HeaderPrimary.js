import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import HeaderMega from './HeaderMega';

const HeaderPrimary = ({ content }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const router = useRouter();

  const handleSetActiveIndex = (value) => {
    if (activeIndex === value) setActiveIndex(null);
    else setActiveIndex(value);
  };

  const handleBodyClick = () => {
    setActiveIndex(null);
  };

  useEffect(() => {
    document.body.addEventListener('click', handleBodyClick);
    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, []);

  useEffect(() => {
    setActiveIndex(null);
  }, [router.asPath]);

  return content && (
    <div
      className="hidden lg:ml-8 lg:block lg:self-stretch"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="h-full flex space-x-8">
        {content.navigation.map((navigationItem, index) => (
          <div className="flex" key={index}>
            {navigationItem.type === 'partNavigationMega' && (
              <button
                type="button"
                className="
                  border-transparent
                  text-gray-700
                  hover:text-gray-800
                  relative
                  z-10
                  flex
                  items-center
                  transition-colors
                  ease-out
                  duration-200
                  text-sm
                  font-medium
                  border-b-2
                  -mb-px
                  pt-px
                "
                aria-expanded="false"
                onClick={() => handleSetActiveIndex(index)}
              >
                {navigationItem.fields.text}
              </button>
            )}
            {navigationItem.type === 'partNavigationLink' && (
              (<Link
                href={navigationItem.fields.url}
                className="
                  border-transparent
                text-gray-700
                hover:text-gray-800
                  relative
                  z-10
                  flex
                  items-center
                  transition-colors
                  ease-out
                  duration-200
                  text-sm
                  font-medium
                  border-b-2
                  -mb-px
                  pt-px
                ">

                {navigationItem.fields.text}

              </Link>)
            )}
            {navigationItem.type === 'partNavigationMega' && (
              <HeaderMega
                content={navigationItem}
                active={activeIndex === index}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeaderPrimary;
