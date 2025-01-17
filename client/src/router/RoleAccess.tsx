import { Error, Loading } from '@src/components';
import { useTokenContext } from '@src/hooks/useTokenContext';

type RoleAccessProps = {
  element: JSX.Element;
  requiredRoles: string[];
};

export const RoleAccess = ({ element, requiredRoles }: RoleAccessProps) => {
  const { tokenData } = useTokenContext();

  if (!tokenData) {
    return <Loading />;
  }

  const userRole = tokenData?.role;

  if (!userRole || !requiredRoles.includes(userRole)) {
    return <Error status_code="403" />;
  }

  return element;
};
