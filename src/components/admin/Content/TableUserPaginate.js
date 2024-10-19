import ReactPaginate from "react-paginate";

const TableUserPaginate = (props) => {
  const { ListUsers, pageCount } = props;

  const handlePageClick = (event) => {
    props.fetchUserWithPaginate(+event.selected + 1);
    props.setCurrentPage(+event.selected + 1);
    console.log(`User requested page number ${event.selected}`);
  };

  return (
    <>
      <table className="table table-hover table-bordered my-3">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">UserName</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {ListUsers &&
            ListUsers.length > 0 &&
            ListUsers.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td> {item.id} </td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <button
                      onClick={() => props.HandleBtnViewUser(item)}
                      className="btn btn-info"
                    >
                      View
                    </button>
                    <button
                      onClick={() => props.HandleBtnUpdateUser(item)}
                      className="btn btn-warning mx-3"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => props.HandleBtnDeleteUser(item)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          {ListUsers && ListUsers.length === 0 && (
            <tr>
              <td colSpan={"4"}>Not Found User</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="d-flex justify-content-center">
        <ReactPaginate
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< Prev"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={props.currentPage - 1}
        />
      </div>
    </>
  );
};

export default TableUserPaginate;
