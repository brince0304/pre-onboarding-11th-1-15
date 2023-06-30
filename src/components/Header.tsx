import React from 'react';
import { NavLink } from 'react-router-dom';
import Router from 'routers/Router';
import * as S from './header.style';

interface IRouterProps {
  [key: string]: string;
}
const Header = () => {
  const RootRoutes = JSON.parse(JSON.stringify(Router.routes));

  return (
    <S.Header>
      <S.Ul>
        {RootRoutes.map((r: IRouterProps) => {
          return (
            <S.Li key={r.name}>
              <NavLink to={r.path}>
                {r.name}
              </NavLink>
            </S.Li>
          );
        })}
      </S.Ul>
    </S.Header>
  );
};

export default Header;
