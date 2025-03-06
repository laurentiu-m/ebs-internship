import { ErrorMessage, Loading } from '@src/components';
import { useAppContext } from '@src/hooks/useAppContext';

type RoleAccessProps = {
  element: JSX.Element;
  requiredRoles: string[];
};

export const RoleAccess = ({ element, requiredRoles }: RoleAccessProps) => {
  const { tokenData } = useAppContext();

  if (!tokenData) {
    return <Loading />;
  }

  const userRole = tokenData?.role;

  if (!userRole || !requiredRoles.includes(userRole)) {
    return <ErrorMessage status_code="403" />;
  }

  return element;
};
