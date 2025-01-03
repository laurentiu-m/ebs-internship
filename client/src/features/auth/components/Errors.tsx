type ErrorProps = {
  allErrors: (string | undefined)[];
};

export const Errors: React.FC<ErrorProps> = ({ allErrors }) => {
  return <div className="errors">{allErrors?.map((error) => <p key={error}>{error}</p>)}</div>;
};
