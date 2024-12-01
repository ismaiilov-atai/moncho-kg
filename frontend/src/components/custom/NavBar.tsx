import { Link } from '@tanstack/react-router';

const paths = [{ pathName: '' }, { pathName: 'about' }, { pathName: 'auth' }];

export const NavBar = () => {
  return (
    <>
      <div className='p-2 flex gap-2'>
        {paths.map(({ pathName }) => (
          <Link
            to={`/${pathName}`}
            className='[&.active]:font-bold'
            key={pathName}>
            {pathName
              ? pathName.slice(0, 1).toUpperCase() +
                pathName.slice(1, pathName.length)
              : 'Home'}
          </Link>
        ))}
      </div>
      <hr />
    </>
  );
};
