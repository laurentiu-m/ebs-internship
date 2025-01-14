type ErrorProps = {
  allErrors: (string | undefined)[];
};

export const Errors = ({ allErrors }: ErrorProps) => {
  return <div className="errors">{allErrors?.map((error) => <p key={error}>{error}</p>)}</div>;
};
