import Link from 'next/link';
import logoIcon from '../../assets/svgs/logo';

const HeaderLogo = () => {
  return (
    <div className="absolute flex lg:relative cursor-pointer">
      <Link href="/">
        <>
          <span className="sr-only">Workflow</span>
          <span
            className="flex h-8 w-8"
            dangerouslySetInnerHTML={{ __html: logoIcon }}
          />
        </>
      </Link>
    </div>
  );
};

export default HeaderLogo;
