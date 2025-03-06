import { Link } from 'react-router-dom';
import { NAVIGATION } from './Navbar';

export function NavigationMenu() {
  return (
    <nav>
      <ul>
        {NAVIGATION.map((item) => {
          if (item.kind === 'divider') {
            return <hr key={item.title} />;
          }
          if (item.kind === 'header') {
            return <h3 key={item.title}>{item.title}</h3>;
          }
          return (
            <li key={item.segment}>
              <Link to={item.path || '/'}>{item.icon} {item.title}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
