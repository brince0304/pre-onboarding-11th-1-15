import React from 'react';
import { NavLink } from 'react-router-dom';
import Router from 'routers/Router';
import * as S from './header.style';

interface IRouterProps {
  [key: string]: string;
}
const Header = () => {
  const RootRoutes = JSON.parse(JSON.stringify(Router.routes[0].children));
  return (
    <S.Header>
      <S.Ul>
        {RootRoutes.map((r: IRouterProps) => {
          return (
            <>
              <li>
                <NavLink to={r.path} key={r.name}>
                  {r.name}
                </NavLink>
              </li>
            </>
          );
        })}
      </S.Ul>
    </S.Header>
  );
};

export default Header;
