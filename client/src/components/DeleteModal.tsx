export const DeleteModal = ({ onDelete }: { onDelete: (id: number) => void }) => {
  return (
    <div className="delete">
      <div className="delete__info">
        <h1 className="title">You are about to delete a cell</h1>
        <p className="warning">
          This will delete the cell from the table
          <br />
          Are you sure?
        </p>
      </div>

      <div className="delete__buttons">
        <button>Cancel</button>
        <button>Delete</button>
      </div>
    </div>
  );
};
